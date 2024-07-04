import assert from "node:assert/strict";
import { beforeEach, describe, it, mock } from "node:test";

import type { Request, Response } from "express";

import { ExchangeRateClient } from "../src/exchange-rate-client.js";
import { Handler } from "../src/handler.js";
import { ValidationClient } from "../src/input-validation.js";
import { RateConversionService } from "../src/rate-conversion-service.js";

describe("Handler.handleCrossExchangeRateRequest", () => {
	const validationClient = ValidationClient();
	const exchangeRateClient = ExchangeRateClient("mock-url");
	const rateConversionService = RateConversionService();
	const handler = Handler(
		validationClient,
		exchangeRateClient,
		rateConversionService,
	);

	const response = {
		status: mock.fn(),
		json: mock.fn(),
	};

	beforeEach(() => {
		mock.reset();
		response.status.mock.resetCalls();
		response.json.mock.resetCalls();
	});

	it("throws if the request misses a mandatory query parameter", async () => {
		// given
		const request = { query: {} } as Request;

		// then
		await assert.rejects(
			handler.handleCrossExchangeRateRequest(
				request,
				response as unknown as Response,
			),
		);

		assert.equal(response.status.mock.callCount(), 1);
		assert.deepEqual(response.status.mock.calls[0].arguments, [400]);
	});

	it("throws if the external API fails", async () => {
		// given
		const request = {
			query: { base: "USD", quota: "NONE" },
		} as unknown as Request;
		mock.method(exchangeRateClient, "getExchangeRates", () => {
			throw new Error("ECONNRESET");
		});

		// then
		await assert.rejects(
			handler.handleCrossExchangeRateRequest(
				request,
				response as unknown as Response,
			),
		);

		assert.equal(response.status.mock.callCount(), 1);
		assert.deepEqual(response.status.mock.calls[0].arguments, [500]);
	});

	it("throws if the requested currencies are not supported", async () => {
		// given
		const request = {
			query: { base: "USD", quota: "EUR" },
		} as unknown as Request;
		mock.method(exchangeRateClient, "getExchangeRates", () => ({
			USD: 1,
			CHF: 0.9,
		}));

		// then
		await assert.rejects(
			handler.handleCrossExchangeRateRequest(
				request,
				response as unknown as Response,
			),
		);

		assert.equal(response.status.mock.callCount(), 1);
		assert.deepEqual(response.status.mock.calls[0].arguments, [500]);
	});

	it("returns a successfully calculated cross exchange rate", async () => {
		// given
		const request = {
			query: { base: "EUR", quota: "CHF" },
		} as unknown as Request;
		mock.method(exchangeRateClient, "getExchangeRates", () => ({
			USD: 1,
			CHF: 1.8,
			EUR: 0.9,
		}));

		// when
		await handler.handleCrossExchangeRateRequest(
			request,
			response as unknown as Response,
		);

		// then
		assert.equal(response.status.mock.callCount(), 0);
		assert.equal(response.json.mock.callCount(), 1);

		assert.deepEqual(response.json.mock.calls[0].arguments, [
			{
				base: "EUR",
				quota: "CHF",
				crossExchangeRate: 2,
			},
		]);
	});
});

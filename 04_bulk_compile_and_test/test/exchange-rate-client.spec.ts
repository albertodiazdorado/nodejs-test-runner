import assert from "node:assert/strict";
import { after, beforeEach, describe, it } from "node:test";

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { ExchangeRateClient } from "../src/exchange-rate-client.js";

describe("ExchangeRateClient.getExchangeRates", () => {
	const mockUrl = "https://mock-url.com";
	const server = setupServer();

	beforeEach(() => {
		server.resetHandlers();
		server.listen();
	});

	after(() => {
		server.close();
	});

	it("throws on error response", async () => {
		// given
		server.use(
			http.get(mockUrl, () =>
				HttpResponse.json({ error: "Internal Server Error" }, { status: 500 }),
			),
		);
		const client = ExchangeRateClient(mockUrl);

		// when -> then
		await assert.rejects(client.getExchangeRates());
	});

	it("throws on success response with no body", async () => {
		// given
		server.use(
			http.get(mockUrl, () => HttpResponse.text("Plain text", { status: 200 })),
		);
		const client = ExchangeRateClient(mockUrl);

		// when -> then
		await assert.rejects(client.getExchangeRates());
	});

	it("throws on success response with unexpected body", async () => {
		// given
		server.use(
			http.get(mockUrl, () =>
				HttpResponse.json({ base: "EUR" }, { status: 200 }),
			),
		);
		const client = ExchangeRateClient(mockUrl);

		// when -> then
		await assert.rejects(client.getExchangeRates());
	});

	it("returns validated response object", async () => {
		// given
		const response = {
			base: "USD",
			source: "ecb",
			rates: {
				USD: Math.random(),
				JPY: Math.random(),
				BGN: Math.random(),
				CZK: Math.random(),
				DKK: Math.random(),
				GBP: Math.random(),
				HUF: Math.random(),
				PLN: Math.random(),
				RON: Math.random(),
				SEK: Math.random(),
				CHF: Math.random(),
				ISK: Math.random(),
				NOK: Math.random(),
				TRY: Math.random(),
				AUD: Math.random(),
				BRL: Math.random(),
				CAD: Math.random(),
				CNY: Math.random(),
				HKD: Math.random(),
				IDR: Math.random(),
				ILS: Math.random(),
				INR: Math.random(),
				KRW: Math.random(),
				MXN: Math.random(),
				MYR: Math.random(),
				NZD: Math.random(),
				PHP: Math.random(),
				SGD: Math.random(),
				THB: Math.random(),
				ZAR: Math.random(),
				EUR: Math.random(),
			},
		};
		server.use(
			http.get(mockUrl, () => HttpResponse.json(response, { status: 200 })),
		);
		const client = ExchangeRateClient(mockUrl);

		// when
		const result = await client.getExchangeRates();

		// then
		assert.deepEqual(result, response.rates);
	});
});

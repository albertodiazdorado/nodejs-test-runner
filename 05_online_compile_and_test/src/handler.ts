import type { Request, Response } from "express";
import type { ExchangeRateClient } from "./exchange-rate-client.js";
import type { ValidationClient } from "./input-validation.js";
import type { RateConversionService } from "./rate-conversion-service.js";

export const Handler = (
	validationClient: ValidationClient,
	exchangeRateClient: ExchangeRateClient,
	rateConversionService: RateConversionService,
) => ({
	handleCrossExchangeRateRequest: async (
		request: Request,
		response: Response,
	) => {
		console.log("Invoked /cross-exchange-rate");
		let base: string;
		let quota: string;

		try {
			({ base, quota } = validationClient.parseQuery(request.query));
		} catch (error) {
			return response.status(400).json({ error: "Invalid input" });
		}

		try {
			const rates = await exchangeRateClient.getExchangeRates();

			const crossExchangeRate = rateConversionService.obtainCrossExchangeRate({
				rates,
				baseCurrency: base,
				quoteCurrency: quota,
			});

			return response.json({
				base,
				quota,
				crossExchangeRate,
			});
		} catch (error) {
			return response.status(500).json({
				error: "Internal Server Error",
				details: error instanceof Error ? error.message : String(error),
			});
		}
	},
});

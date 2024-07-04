import { z } from "zod";

const responseSchema = z.object({
	base: z.literal("USD"),
	rates: z.record(z.number().positive()),
	source: z.literal("ecb"),
});

export const ExchangeRateClient = (serverUrl: string) => ({
	getExchangeRates: async () => {
		const response = await fetch(serverUrl);

		if (!response.ok) {
			console.warn("Error response from exchange rates API.", { response });
			throw Error("Error response from exchange rates API.");
		}

		const body = await response.json();
		const exchangeRates = responseSchema.parse(body);

		return exchangeRates.rates;
	},
});
export type ExchangeRateClient = ReturnType<typeof ExchangeRateClient>;

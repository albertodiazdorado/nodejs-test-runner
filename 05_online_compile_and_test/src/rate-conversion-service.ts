type ConversionInput = {
	rates: Record<string, number>;
	baseCurrency: string;
	quoteCurrency: string;
};

export const RateConversionService = () => ({
	obtainCrossExchangeRate: ({
		rates,
		baseCurrency,
		quoteCurrency,
	}: ConversionInput) => {
		if (rates[baseCurrency] === undefined) {
			throw new Error(`Unknonwn base currency ${baseCurrency}.`);
		}

		if (rates[quoteCurrency] === undefined) {
			throw new Error(`Unknonwn quote currency ${baseCurrency}.`);
		}

		return rates[quoteCurrency] / rates[baseCurrency];
	},
});
export type RateConversionService = ReturnType<typeof RateConversionService>;

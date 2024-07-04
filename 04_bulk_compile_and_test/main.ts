import express from "express";
import { ExchangeRateClient } from "./src/exchange-rate-client.js";
import { Handler } from "./src/handler.js";
import { ValidationClient } from "./src/input-validation.js";
import { RateConversionService } from "./src/rate-conversion-service.js";

const app = express();
const port = Number(process.env.PORT);
const host = "0.0.0.0";
const exchangeUrl = "https://cdn.wahrungsrechner.info/api/ecb.json";

const validationClient = ValidationClient();
const exchangeRateClient = ExchangeRateClient(exchangeUrl);
const rateConversionService = RateConversionService();
const handler = Handler(
	validationClient,
	exchangeRateClient,
	rateConversionService,
);

app.get("/status", (_, res) => res.json({ status: "healthy" }));

app.get("/cross-exchange-rate", handler.handleCrossExchangeRateRequest);

app.listen(port, host, () => {
	console.log(`Server is running at http://${host}:${port}`);
});

process.on("SIGINT", () => {
	console.log("Interrupted");
	process.exit(0);
});

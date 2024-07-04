import type { Request } from "express";
import { z } from "zod";

const querySchema = z.object({
	base: z.string().min(1),
	quota: z.string().min(1),
});

export const ValidationClient = () => ({
	parseQuery: (query: Request["query"]) => querySchema.parse(query),
});
export type ValidationClient = ReturnType<typeof ValidationClient>;

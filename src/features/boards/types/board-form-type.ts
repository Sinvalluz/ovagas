import type z from "zod";
import type { BoardFormSchema } from "./board-form-schema";

export type BoardFormType = z.infer<typeof BoardFormSchema>;

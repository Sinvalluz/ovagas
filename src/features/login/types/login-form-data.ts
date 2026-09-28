import type z from "zod";
import type { LoginFormSchema } from "./login-form-schema";

export type LoginFormData = z.infer<typeof LoginFormSchema>;

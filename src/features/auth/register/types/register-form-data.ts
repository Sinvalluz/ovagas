import type z from "zod";
import type RegisterFormSchema from "./register-form-schema";

type RegisterFormData = z.infer<typeof RegisterFormSchema>;

export default RegisterFormData;

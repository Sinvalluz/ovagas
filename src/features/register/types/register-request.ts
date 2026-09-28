import type RegisterFormData from "./register-form-data";

export type RegisterRequest = Omit<RegisterFormData, "confirmPassword">;

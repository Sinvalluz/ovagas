"use client";

import { Eye, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

type AuthInputGroupProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	maxLength: number;
	label: string;
	placeholder: string;
	type: React.HTMLInputTypeAttribute;
};

export default function AuthInputGroup<T extends FieldValues>(props: AuthInputGroupProps<T>) {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const isPassword = props.type === "password";
	const inputType = isPassword && showPassword ? "text" : props.type;
	const IconPassword = showPassword ? Eye : EyeOffIcon;

	return (
		<Controller
			name={props.name}
			control={props.control}
			render={({ field, fieldState }) => (
				<Field
					className="w-full transition-all"
					data-invalid={fieldState.invalid}
				>
					<FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
					<InputGroup>
						<InputGroupInput
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							type={inputType}
							autoComplete="on"
							placeholder={props.placeholder}
						/>
						{isPassword && (
							<InputGroupAddon align="inline-end">
								<IconPassword
									className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-muted-foreground"
									width={18}
									onClick={() => setShowPassword(!showPassword)}
									onMouseDown={(e) => e.preventDefault()}
								/>
							</InputGroupAddon>
						)}
					</InputGroup>
					{fieldState.invalid && (
						<FieldError
							errors={[fieldState.error]}
							className="transition-all"
						/>
					)}
				</Field>
			)}
		/>
	);
}

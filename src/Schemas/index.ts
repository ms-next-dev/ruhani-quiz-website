import * as z from "zod";
export const RegistrationSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  role: z.string(),
  first_name: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string(),
  role: z.string(),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  confirmPassword: z
    .string()
    .min(6)
    .refine(
      (data: any) => {
        return data.reTypedPassword === data.password;
      },
      {
        message: "Passwords do not match",
      }
    ),
});

export const NameSchema = z.object({
  first_name: z.string().min(3, {
    message: "First name must be at least 3 characters",
  }),
});

export const BioSchema = z.object({
  bio: z.string().min(3, {
    message: "First name must be at least 3 characters",
  }),
});

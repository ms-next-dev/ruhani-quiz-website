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
  name: z.string().min(3, {
    message: "First name must be at least 3 characters",
  }),
});

export const BioSchema = z.object({
  bio: z
    .string()
    .min(3, {
      message: "Bio must be at least 3 characters",
    })
    .max(220, {
      message: "Bio must be under 220 characters",
    }),
});

export const PhoneSchema = z.object({
  phone: z
    .string()
    .min(11, {
      message: "Phone number must be at least 11 characters",
    })
    .max(11, {
      message: "Phone number must be at least 11 characters",
    }),
});

export const CoverPhotoSchema = z.object({
  coverPhoto: z.string().min(10, {
    message: "Cover photo must be at least 10 characters",
  }),
});

export const EducationSchema = z.object({
  educational_qualification: z.string().min(1, {
    message: "Education is required!",
  }),
});
export const DesignationSchema = z.object({
  designation: z.string().min(1, {
    message: "Designation is required!",
  }),
});

export const DistrictSchema = z.object({
  district: z.string().min(1, {
    message: "District is required!",
  }),
});

export const ConnectSchema = z.object({
  connect: z.string().min(1, {
    message: "Connect is required!",
  }),
});

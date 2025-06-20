import {z} from "zod"

export  const checkoutSchema=z.object({
    name: z
    .string({ required_error: "Name is required" })
    .trim()
    .nonempty({ message: "Name cannot be empty" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name must only contain letters" }),
    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .nonempty({ message: "Email cannot be empty" })
    .email("Invalid email address"),
    address: z
    .string()
    .trim()
    .min(10, { message: "Address must be at least 10 characters long" })
    .max(100, { message: "Address cannot exceed 100 characters" })
    .regex(/^[a-zA-Z0-9\s,.-]+$/, { message: "Invalid address format" }),
    city: z
    .string()
    .trim()
    
    .regex(/^[a-zA-Z0-9\s,.-]+$/, { message: "Invalid address format" }),
    phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .nonempty({ message: "Phone number cannot be empty" })
    .regex(/^03[0-9]{9}$/, {
      message:
        "Invalid Pakistani phone number (should be 11 digits starting with 03)",
    }),
})

export const signUpSchema = z.object({
  username: z
  .string({ required_error: "Name is required" })
  .trim()
  .nonempty({ message: "Name cannot be empty" })
  .min(3, { message: "Name must be at least 3 characters long" })
  .regex(/^[a-zA-Z\s]+$/, { message: "Name must only contain letters" }),
  email: z
  .string({ required_error: "Email is required" })
  .trim()
  .nonempty({ message: "Email cannot be empty" })
  .email("Invalid email address"),
  password: z
  .string({ required_error: "Password is required" })
  .trim()
  .nonempty({ message: "Password cannot be empty" })
  .min(8, { message: "Password must be at least 8 characters long" })

})
export const loginSchema = z.object({
  email: z
  .string({ required_error: "Email is required" })
  .trim()
  .nonempty({ message: "Email cannot be empty" })
  .email("Invalid email address"),
  password: z
  .string({ required_error: "Password is required" })
  .trim()
  .nonempty({ message: "Password cannot be empty" })
  .min(8, { message: "Password must be at least 8 characters long" })
})

//used on step1 Page
export const nameSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .nonempty({ message: "Name cannot be empty" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name must only contain letters" }),
});

//Used on step2 Page
export const descriptionSchema = z.object({
  tagline: z
    .string({ required_error: "Tagline is required" })
    .trim()
    .nonempty({ message: "Tagline cannot be empty" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Tagline must only contain letters" }),
  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .nonempty({ message: "Description cannot be empty" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Description must only contain letters",
    }),
});

//Used on Step3 Page


export const customerReachSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .nonempty({ message: "Email cannot be empty" })
    .email("Invalid email address"),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .nonempty({ message: "Phone number cannot be empty" })
    .regex(/^03[0-9]{9}$/, {
      message:
        "Invalid Pakistani phone number (should be 11 digits starting with 03)",
    }),

  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .nonempty({ message: "Address cannot be empty" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),
});

//Used on Step4 Page
export const locationSchema = z.object({
  address: z
    .string()
    .trim()

    .min(10, { message: "Address must be at least 10 characters long" })
    .max(100, { message: "Address cannot exceed 100 characters" })
    .regex(/^[a-zA-Z0-9\s,.-]+$/, { message: "Invalid address format" }),

  country: z.string().trim().min(2, { message: "Invalid country name" }),

  postalCode: z
    .string()
    .min(4, { message: "Postal code must be at least 4 characters long" })
    .trim()
    .max(10, { message: "Postal code cannot exceed 10 characters" })
    .regex(/^[a-zA-Z0-9\s-]+$/, { message: "Invalid postal code format" }),
});

//Used on Step5 Page
export const brandNameSchema = z.object({
  name: z
    .string({ required_error: "Tagline is required" })
    .trim()
    .nonempty({ message: "Name cannot be empty" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Tagline must only contain letters" }),
  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .nonempty({ message: "Description cannot be empty" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Description must only contain letters",
    }),
});

//Sales Represntative's Schema Used on Step6 And Step7
export const SalesPersonSchema=z.object({
  name: z
    .string({ required_error: "Tagline is required" })
    .trim()
    .nonempty({ message: "Name cannot be empty" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Tagline must only contain letters" }),
    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .nonempty({ message: "Email cannot be empty" })
    .email("Invalid email address"),
})

//Used on Step8 Page Account Validation
 export const accountDetailsSchema = z.object({
  clientKey: z.string().min(1, "PayPal client key is required."),
  secretKey: z.string().min(1, "PayPal secret key is required."),
});


import z from "zod";

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError =
  "Password must contain at least one uppercase letter, one lowercase letter, and one number.";

// Schema di registrazione completo
export const RegisterSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(3),
  password: z.string().min(8).regex(passwordRegex, passwordError),
});

// Schema per il solo login
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(passwordRegex, passwordError),
});

export const FormSchema = RegisterSchema;
export const ConfirmSchema = RegisterSchema.refine((data) => data);

export function getFieldError(property, value, schema = FormSchema) {
  const field = schema.shape?.[property];
  if (!field) return;
  const { error } = field.safeParse(value);
  return error
    ? error.issues.map((issue) => issue.message).join(", ")
    : undefined;
}

export const getErrors = (error) =>
  error.issues.reduce((all, issue) => {
    const path = issue.path.join("");
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
  }, {});

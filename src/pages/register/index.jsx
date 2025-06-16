import { useState } from "react";
import {
  RegisterSchema as ConfirmSchema,
  getErrors,
  getFieldError,
} from "../../lib/validationForm";
import supabase from "../../supabase/supabase-client";
import { useNavigate } from "react-router";
import AlertBanner from "../../components/AlertBanner";
import bgLogin from "../../assets/login.jpg";

export default function RegisterPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ message: "", type: "success" });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      return;
    }

    let { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          username: data.username,
        },
      },
    });

    if (signUpError) {
      setAlert({
        message: "Errore durante la registrazione!",
        type: "error",
      });
    } else {
      setAlert({
        message: "Registrazione completata con successo!",
        type: "success",
      });
      setTimeout(() => navigate("/"), 1500);
    }
  };

  const onBlur = (property) => () => {
    const message = getFieldError(property, formState[property], ConfirmSchema);
    setFormErrors((prev) => ({ ...prev, [property]: message }));
    setTouchedFields((prev) => ({ ...prev, [property]: true }));
  };

  const isInvalid = (property) => {
    if (formSubmitted || touchedFields[property]) {
      return !!formErrors[property];
    }
    return undefined;
  };

  const setField = (property, valueSelector) => (e) => {
    setFormState((prev) => ({
      ...prev,
      [property]: valueSelector ? valueSelector(e) : e.target.value,
    }));
  };

  return (
    <div className="min-h-screen">
      <img
        src={bgLogin}
        alt="hero background"
        className="absolute inset-0 w-full h-full object-cover lg:object-center object-right z-0"
      />
      {/* Overlay sfumato: nero con leggera tinta accent color */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-middle/80 to-primary backdrop-blur-sm"></div>
      <div className="max-w-md mx-auto  text-text p-8 rounded-lg mt-10 relative">
        {alert.message && (
          <AlertBanner
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ message: "", type: "success" })}
          />
        )}

        <form onSubmit={onSubmit} noValidate className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={setField("email")}
              onBlur={onBlur("email")}
              aria-invalid={isInvalid("email")}
              required
              className="w-full px-4 py-2 bg-tertiary border border-tertiary focus:border-accent focus:ring-accent focus:outline-none rounded-md"
            />
            {formErrors.email && (
              <small className="text-error-hover">{formErrors.email}</small>
            )}
          </div>

          <div>
            <label
              htmlFor="firstName"
              className="block mb-1 text-sm font-medium"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formState.firstName}
              onChange={setField("firstName")}
              onBlur={onBlur("firstName")}
              aria-invalid={isInvalid("firstName")}
              required
              className="w-full px-4 py-2 bg-tertiary border border-tertiary focus:border-accent focus:ring-accent focus:outline-none rounded-md"
            />
            {formErrors.firstName && (
              <small className="text-error-hover">{formErrors.firstName}</small>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block mb-1 text-sm font-medium"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formState.lastName}
              onChange={setField("lastName")}
              onBlur={onBlur("lastName")}
              aria-invalid={isInvalid("lastName")}
              required
              className="w-full px-4 py-2 bg-tertiary border border-tertiary focus:border-accent focus:ring-accent focus:outline-none rounded-md"
            />
            {formErrors.lastName && (
              <small className="text-error-hover">{formErrors.lastName}</small>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formState.username}
              onChange={setField("username")}
              onBlur={onBlur("username")}
              aria-invalid={isInvalid("username")}
              required
              className="w-full px-4 py-2 bg-tertiary border border-tertiary focus:border-accent focus:ring-accent focus:outline-none rounded-md"
            />
            {formErrors.username && (
              <small className="text-error-hover">{formErrors.username}</small>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={setField("password")}
              onBlur={onBlur("password")}
              aria-invalid={isInvalid("password")}
              required
              className="w-full px-4 py-2 bg-tertiary border border-tertiary focus:border-accent focus:ring-accent focus:outline-none rounded-md"
            />
            <p className="text-sm text-gray-400 mt-1 italic text-muted">
              La password deve contenere almeno una maiuscola, una minuscola e
              un numero
            </p>
            {formErrors.password && (
              <small className="text-error-hover">{formErrors.password}</small>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-hover text-primary font-semibold py-2 px-4 rounded-md transition duration-300 cursor-pointer"
          >
            Registrati
          </button>
        </form>
      </div>
    </div>
  );
}

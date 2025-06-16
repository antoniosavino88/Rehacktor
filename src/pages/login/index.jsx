import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import {
  FormSchema as FormSchemaLogin,
  LoginSchema as ConfirmSchemaLogin,
  getErrors,
  getFieldError,
} from "../../lib/validationForm";
import AlertBanner from "../../components/AlertBanner";
import bgLogin from "../../assets/login.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({ message: "", type: "success" });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchemaLogin.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
    } else {
      let { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        setAlert({
          message: "Errore durante l’accesso! Credenziali errate.",
          type: "error",
        });
      } else {
        setAlert({
          message: "Accesso riuscito!",
          type: "success",
        });
        setTimeout(() => navigate("/"), 1500);
      }
    }
  };

  const onBlur = (property) => () => {
    const message = getFieldError(
      FormSchemaLogin,
      property,
      formState[property]
    );
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
        className="absolute inset-0 w-full h-full object-cover md:object-center object-right z-0"
      />
      {/* Overlay sfumato: nero con leggera tinta accent color */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-middle/80 to-primary backdrop-blur-sm"></div>
      <div className="max-w-md mx-auto mt-10  p-6 rounded-2xl text-text relative">
        {alert.message && (
          <AlertBanner
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ message: "", type: "success" })}
          />
        )}

        <form onSubmit={onSubmit} noValidate className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text mb-1"
            >
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
              placeholder="you@example.com"
            />
            {formErrors.email && (
              <small className="text-accent mt-1 block text-sm">
                {formErrors.email}
              </small>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text mb-1"
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
              placeholder="••••••••"
            />
            {formErrors.password && (
              <small className="text-accent mt-1 block text-sm">
                {formErrors.password}
              </small>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-hover text-primary font-semibold py-2 px-4 rounded-xl transition cursor-pointer"
            >
              Accedi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

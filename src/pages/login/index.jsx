import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import {
  FormSchema as FormSchemaLogin,
  LoginSchema as ConfirmSchemaLogin,
  getErrors,
  getFieldError,
} from "../../lib/validationForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchemaLogin.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
    } else {
      console.log(data);
      let { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        alert("Signing in error 👎!");
      } else {
        alert("Signed In 👍!");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
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
    <div className="max-w-md mx-auto mt-10 bg-primary p-6 rounded-2xl shadow-lg text-text">
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
  );
}

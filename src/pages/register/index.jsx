import { useState } from "react";
import {
  RegisterSchema as ConfirmSchema,
  getErrors,
  getFieldError,
} from "../../lib/validationForm";
import supabase from "../../supabase/supabase-client";
import { useNavigate } from "react-router";

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

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      let { error } = await supabase.auth.signUp({
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
      if (error) {
        alert("Signing up error 👎🏻!");
      } else {
        alert("Signed up 👍🏻!");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
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
    <div className="max-w-md mx-auto bg-slate-800 text-white p-8 rounded-lg shadow-lg">
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
            className="w-full px-4 py-2 bg-slate-700 border border-slate-700 focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none rounded-md"
          />
          {formErrors.email && (
            <small className="text-red-400">{formErrors.email}</small>
          )}
        </div>

        <div>
          <label htmlFor="firstName" className="block mb-1 text-sm font-medium">
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
            className="w-full px-4 py-2 bg-slate-700 border border-slate-700 focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none rounded-md"
          />
          {formErrors.firstName && (
            <small className="text-red-400">{formErrors.firstName}</small>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block mb-1 text-sm font-medium">
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
            className="w-full px-4 py-2 bg-slate-700 border border-slate-700 focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none rounded-md"
          />
          {formErrors.lastName && (
            <small className="text-red-400">{formErrors.lastName}</small>
          )}
        </div>

        <div>
          <label htmlFor="username" className="block mb-1 text-sm font-medium">
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
            className="w-full px-4 py-2 bg-slate-700 border border-slate-700 focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none rounded-md"
          />
          {formErrors.username && (
            <small className="text-red-400">{formErrors.username}</small>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
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
            className="w-full px-4 py-2 bg-slate-700 border border-slate-700 focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none rounded-md"
          />
          <p className="text-sm text-gray-400 mt-1 italic text-muted">
            La password deve contere almeno una maiuscola, una minuscola e un
            numero
          </p>
          {formErrors.password && (
            <small className="text-red-400">{formErrors.password}</small>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-800 font-semibold py-2 px-4 rounded-md transition duration-300 cursor-pointer"
        >
          Registrati
        </button>
      </form>
    </div>
  );
}

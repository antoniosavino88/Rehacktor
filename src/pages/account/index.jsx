import { useState, useEffect, useContext } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext.js";
import Avatar from "../../components/Avatar.jsx";
import AlertBanner from "../../components/AlertBanner.jsx";

export default function AccountPage() {
  const { session } = useContext(SessionContext);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const getProfile = async () => {
      if (!session || !session.user) return;
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, first_name, last_name, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    };

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => setSuccessMessage(""), 10000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => setErrorMessage(""), 10000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  const updateProfile = async (event, avatarUrl) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name: firstName,
      last_name: lastName,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      setErrorMessage(
        "Errore durante l'aggiornamento del profilo: " + error.message
      );
    } else {
      setAvatarUrl(avatarUrl);
      setSuccessMessage("Profilo aggiornato con successo!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-5 bg-primary text-text p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-accent">
        Impostazioni profilo
      </h2>

      {successMessage && (
        <AlertBanner
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
      {errorMessage && (
        <AlertBanner
          type="error"
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      <form onSubmit={updateProfile} className="space-y-4">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4 my-12">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden border-2 border-gray-700 shadow-lg">
            <Avatar
              url={avatar_url}
              size={150}
              onUpload={(event, url) => {
                updateProfile(event, url);
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => document.querySelector('input[type="file"]').click()}
            className="px-4 py-2 text-sm font-medium text-primary bg-accent hover:bg-accent-hover rounded-lg transition cursor-pointer"
          >
            Cambia Avatar
          </button>

          <p className="text-sm text-gray-400 text-center max-w-xs">
            Carica un'immagine di profilo
          </p>
        </div>

        {/* Email (non modificabile) */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text mb-1"
          >
            Email
          </label>
          <p className="bg-tertiary text-text px-4 py-2 rounded-md">
            {session?.user.email}
          </p>
        </div>

        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-text mb-1"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-tertiary border border-quaternary rounded-md focus:outline-none focus:ring-2 focus:ring-focus"
          />
        </div>

        {/* First Name */}
        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-text mb-1"
          >
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            value={firstName || ""}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 bg-tertiary border border-quaternary rounded-md focus:outline-none focus:ring-2 focus:ring-focus"
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-text mb-1"
          >
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            value={lastName || ""}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 bg-tertiary border border-quaternary rounded-md focus:outline-none focus:ring-2 focus:ring-focus"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-accent hover:bg-accent-hover text-secondary font-semibold rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Caricamento ..." : "Aggiorna profilo"}
          </button>
        </div>
      </form>
    </div>
  );
}

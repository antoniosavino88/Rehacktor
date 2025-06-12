import { useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import RealimeChat from "./RealtimeChat";

export default function Chatbox({ data }) {
  const { session } = useContext(SessionContext);

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));

    if (typeof message === "string" && message.trim().length !== 0) {
      const { error } = await supabase
        .from("messages")
        .insert([
          {
            profile_id: session?.user.id,
            profile_username: session?.user.user_metadata.username,
            game_id: data.id,
            content: message,
          },
        ])
        .select();
      if (!error) inputMessage.reset();
    }
  };

  return (
    <div className=" rounded-2xl p-6 w-full ">
      <h4 className="text-xl font-bold text-accent mb-4">Gamers Chat</h4>

      <RealimeChat data={data} />

      {session ? (
        <form onSubmit={handleMessageSubmit} className="flex gap-2 mt-4">
          <input
            type="text"
            name="message"
            placeholder="Scrivi un messaggio..."
            className="flex-1 px-4 py-2 rounded-lg bg-tertiary text-text placeholder:text-quaternary focus:outline-none focus:ring-2 focus:ring-focus"
          />
          <button
            type="submit"
            className="bg-accent hover:bg-accent-hover text-primary font-bold px-5 py-2 rounded-lg transition"
          >
            Invia
          </button>
        </form>
      ) : (
        <p className="text-sm text-quaternary italic mt-2">
          Effettua il login per partecipare alla chat.
        </p>
      )}
    </div>
  );
}

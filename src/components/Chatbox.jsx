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
      if (error) {
        console.log(error);
      } else {
        inputMessage.reset();
      }
    }
  };

  return (
    <>
      <h4>Gamers chat</h4>
      <div>
        <RealimeChat data={data && data} />
      </div>

      <form onSubmit={handleMessageSubmit}>
        <fieldset role="group">
          <input type="text" name="message" placeholder="Chat..." />
          <button type="submit">Invia</button>
        </fieldset>
      </form>
    </>
  );
}

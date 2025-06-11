import { useEffect, useState, useRef, useCallback } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import supabase from "../supabase/supabase-client";

const chatContainer = {
  marginTop: "5px",
  padding: "0px 3px",
  width: "100%",
  height: "50vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  backgroundColor: "#1b121b",
  overflowY: "scroll",
};

dayjs.extend(relativeTime);

export default function RealtimeChat({ data }) {
  const [messages, setMessages] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState("");
  const messageRef = useRef(null);

  const scrollSmoothToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  const getInitialMessages = useCallback(async () => {
    setLoadingInitial(true);
    const { data: messages, error } = await supabase
      .from("messages")
      .select()
      .eq("game_id", data?.id);
    if (error) {
      setError(error.message);
      return;
    }
    setLoadingInitial(false);
    setMessages(messages);
  }, [data?.id]);

  useEffect(() => {
    if (data) {
      getInitialMessages();
    }

    const channel = supabase
      .channel(`realtime-messages-${data?.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `game_id=eq.${data?.id}`,
        },
        () => getInitialMessages()
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [data, getInitialMessages]);

  useEffect(() => {
    scrollSmoothToBottom();
  }, [messages]);

  return (
    <div style={chatContainer} ref={messageRef}>
      {loadingInitial && <progress></progress>}
      {error && <article>{error}</article>}
      {messages &&
        messages.map((message) => (
          <article key={message.id}>
            <p className=" text-accent">{message.profile_username}</p>
            <small>{message.content}</small>
            <p className="text-xs text-gray-400 italic">
              {dayjs().to(dayjs(message.created_at))}
            </p>
          </article>
        ))}
    </div>
  );
}

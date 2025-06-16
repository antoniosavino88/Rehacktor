import { useEffect, useState, useRef, useCallback } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import supabase from "../supabase/supabase-client";

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
      .eq("game_id", data?.id)
      .order("updated_at", { ascending: true });

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
    <div
      ref={messageRef}
      className="flex flex-col gap-3 max-h-64 overflow-y-auto  p-4 rounded-lg"
    >
      {loadingInitial && <p className="text-quaternary">Caricamento...</p>}
      {error && <p className="text-error">{error}</p>}
      {messages.length === 0 && !loadingInitial && (
        <p className="text-quaternary italic">Nessun messaggio ancora...</p>
      )}
      {messages.map((message) => (
        <article key={message.id} className="bg-tertiary p-3 rounded-md">
          <header className="flex justify-between items-center mb-1">
            <span className="text-accent font-semibold">
              @{message.profile_username}
            </span>
            <time className="text-xs text-quaternary italic hidden md:block">
              {dayjs().to(dayjs(message.updated_at))}
            </time>
          </header>
          <p className="text-sm text-text">{message.content}</p>
        </article>
      ))}
    </div>
  );
}

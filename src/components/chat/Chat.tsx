import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { CONFIG } from "@/CONFIG";
import { messagetype } from "@/validators/Messages";
import { useGetAuthStatus } from "@/hooks/useGetAuthStatus";

export default function Chat() {
  const { houseId } = useParams();
  const [messages, setMessages] = useState<messagetype[]>([]);
  const [loading, setLoading] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const { userId } = useGetAuthStatus();

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cursor, setCursor] = useState<number | null>(null);
  const fetchMessages = async () => {
    try {
      if (!hasMore && !loading) return;
      setLoading(true);
      const response = await axios.get(`${CONFIG.BACKEND_URL}/message/page`, {
        params: {
          houseId,
          cursor: cursor ? cursor : undefined,
        },
      });
      const msgs: messagetype[] = response.data.messages;
      if (msgs.length === 0) setHasMore(false);
      setMessages((prev) => [...msgs, ...prev]);
      setCursor(msgs[0].id || null);
    } catch (error) {}
  };

  const enterFunction = (e: KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.176:8080");
    ws.onopen = () => {
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      };
      socketRef.current = ws;
      const message = { type: "join", houseId };
      ws.send(JSON.stringify(message));
      toast.success("Connected");
    };
    ws.onclose = (event) => {
      console.log(event.code);
      toast.error("Disconnected" + JSON.stringify(event));
    };

    window.addEventListener("keydown", enterFunction);

    return () => window.removeEventListener("keydown", enterFunction);
  }, []);

  const sendMessage = () => {
    if (inputRef.current === null || inputRef.current.value === "") return;
    const text = inputRef.current.value;
    inputRef.current.value = "";
    inputRef.current.focus();
    const message = {
      text,
      houseId,
      type: "message",
      timestamp: new Date().toISOString(),
    };

    socketRef.current?.send(JSON.stringify(message));
    setMessages((prev) => [...prev, message]);
    setTimeout(() => {
      document.querySelector("#bottom")?.scrollIntoView();
    }, 300);
  };

  const handleObserver = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      if (!containerRef.current) return;
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        const container = containerRef.current;
        const scrollHeightBeforeFetch = container.scrollHeight;

        await fetchMessages();
        setTimeout(() => {
          container.scrollTop =
            container.scrollHeight - scrollHeightBeforeFetch;
          setLoading(false);
        }, 200);
      }
    },
    [hasMore, loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: containerRef.current,
      rootMargin: "100px",
      threshold: 0,
    });

    if (topRef.current) {
      observer.observe(topRef.current);
    }

    return () => {
      if (topRef.current) {
        observer.unobserve(topRef.current);
      }
    };
  }, [handleObserver]);

  return (
    <>
      <div className="flex justify-center items-center fixed top-2 right-2 w-1/2">
        <Input className="border-2 border-gray-800 m-2" ref={inputRef} />
        <Button className="w-48 m-2" onClick={sendMessage}>
          Send
        </Button>
      </div>

      <div
        ref={containerRef}
        className="bg-gradient-to-r from-purple-600 to-blue-500 h-screen overflow-y-auto"
      >
        <div ref={topRef}></div>
        {messages.map((msg, i, messages) => (
          <div
            key={msg.id}
            id={messages.length - 1 === i ? "bottom" : ""}
            className={`flex ${
              !msg.sender?.id || msg.sender?.id === userId
                ? "justify-start items-start"
                : "justify-end items-end"
            } m-4`}
          >
            <li
              className={`${
                !msg.sender?.id || msg.sender?.id === userId
                  ? "bg-black text-white"
                  : "bg-white"
              } rounded-md max-w-4/6 inline-block p-2 text-left min-w-36`}
            >
              <span className="font-bold">
                {msg.sender?.id !== userId && msg.sender?.id
                  ? `${msg.sender?.firstname} ${msg.sender?.lastname}`
                  : "me"}
              </span>{" "}
              <br />
              <span>{msg.text}</span>
            </li>
          </div>
        ))}
      </div>
    </>
  );
}

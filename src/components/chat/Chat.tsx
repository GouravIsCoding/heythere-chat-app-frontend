import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

export default function Chat() {
  const { houseId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const enterFunction = (e: KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
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
      toast.error("Disconnected");
    };

    window.addEventListener("keydown", enterFunction);

    return () => window.removeEventListener("keydown", enterFunction);
  }, []);

  const sendMessage = () => {
    if (inputRef.current === null || inputRef.current.value === "") return;
    const text = inputRef.current.value;
    inputRef.current.value = "";
    inputRef.current.focus();
    const message = { text, houseId, type: "message" };

    socketRef.current?.send(JSON.stringify(message));
    setMessages((prev) => [...prev, message]);
  };

  return (
    <>
      <Input ref={inputRef} />
      <Button onClick={sendMessage}>Send</Button>
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 min-h-screen overflow-y-scroll">
        {messages.map((msg) => (
          <div
            className={`flex ${
              msg.by !== "other"
                ? "justify-start items-start"
                : "justify-end items-end"
            } m-4`}
          >
            <li
              className={`${
                msg.by !== "other" ? "bg-black text-white" : "bg-white"
              } rounded-md max-w-4/6 inline-block p-2 text-left min-w-36`}
            >
              <span className="font-bold">
                {msg.by === "other"
                  ? `${msg.sender.firstname} ${msg.sender.lastname}`
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

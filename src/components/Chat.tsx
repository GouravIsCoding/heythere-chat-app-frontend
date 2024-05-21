import { useEffect } from "react";

export default function Chat() {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
  }, []);

  return <>Chat</>;
}

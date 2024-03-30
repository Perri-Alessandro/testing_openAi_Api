import { useEffect, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const Gpt = () => {
  const [response, setResponse] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function fetchCompletion(question: string) {
    setIsLoading(true);
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const updatedMessages = [...response, { role: "user", content: question }];

    const requestBody = {
      model: "gpt-3.5-turbo-1106",
      messages: updatedMessages,
    };

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.choices && data.choices.length > 0) {
          const content =
            data.choices[0].message.content ??
            "Non sono riuscito a trovare una risposta.";
          const updatedResponses = [
            ...updatedMessages,
            { role: "assistant", content },
          ];
          setResponse(updatedResponses);
        } else {
          setResponse([
            ...updatedMessages,
            {
              role: "assistant",
              content: "La risposta non contiene dati validi.",
            },
          ]);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Errore durante il fetching della completion: ", error);
        setResponse([
          ...updatedMessages,
          {
            role: "assistant",
            content: "Si è verificato un errore nel recupero della risposta.",
          },
        ]);
      });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCompletion(input);
    setInput("");
  };

  return (
    <div>
      {isLoading ? (
        <Spinner animation="grow" className="bg-success" />
      ) : (
        response.map((msg, index) => (
          <div
            key={index}
            className={`bg-white rounded-4 mt-3 mb-4 ${
              msg.role === "user" ? "text-primary" : "text-secondary"
            }`}
          >
            {msg.content}
          </div>
        ))
      )}
      <p className="text-success text-with-white-border fs-2">
        Hi! Enter your request here:
      </p>
      <form onSubmit={handleSubmit} className="mb-5">
        <input
          ref={inputRef}
          className="rounded-4 border-warning"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="ms-3 rounded-4 btn btn-success border-warning"
        >
          Ask me
        </button>
      </form>
    </div>
  );
};

export default Gpt;

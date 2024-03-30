import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const Gpt: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function fetchCompletion(question: string) {
    setIsLoading(true);
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
    };

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
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
          setResponse(content);
        } else {
          setResponse("La risposta non contiene dati validi.");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Errore durante il fetching della completion: ", error);
        setResponse("Si è verificato un errore nel recupero della risposta.");
      });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCompletion(input);
  };

  return (
    <div>
      <p className="text-success text-with-white-border fs-2">
        Hi! Enter your request here:
      </p>
      <form onSubmit={handleSubmit}>
        <input
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
      {isLoading ? (
        <Spinner animation="grow" className="bg-success" />
      ) : (
        <div className="bg-white rounded-4 mt-3 mb-5">{response}</div>
      )}
    </div>
  );
};

export default Gpt;

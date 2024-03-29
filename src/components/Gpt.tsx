import { useState } from "react";

const Gpt: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [input, setInput] = useState<string>("");

  function fetchCompletion(question: string) {
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
        const content =
          data.choices[0].message.content ??
          "Non sono riuscito a trovare una risposta.";
        setResponse(content);
      })
      .catch((error) => {
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
      <p>GPT Component</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Invia</button>
      </form>
      <p>Response: {response}</p>
    </div>
  );
};

export default Gpt;

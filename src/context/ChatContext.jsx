import { createContext, useState, useContext, ReactNode } from "react";

const ChatContext = createContext(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const customModelUrl = "http://127.0.0.1:5000";

  const typeResponse = async (text) => {
    setResultData("");
    const words = text.split(" ");
    for (const word of words) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setResultData(prev => prev + word + " ");
    }
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setInput("");
  };

  const onSent = async (prompt) => {
    const userPrompt = prompt ?? input;
    setShowResult(true);
    setLoading(true);
    setRecentPrompt(userPrompt);
    setPrevPrompts(prev => [...prev, userPrompt]);
    
    const greetings = ["hi", "hello", "hey", "hola"];
    if (greetings.includes(userPrompt.toLowerCase().trim())) {
      await typeResponse("Hello! I am Floatchat, a tool for analyzing ARGO data. You can ask me general questions about the ARGO program or provide me with data points to predict temperature.");
      setLoading(false);
      setInput("");
      return;
    }

    try {
      const latMatch = userPrompt.match(/lat:\s*([-\d.]+)/);
      const longMatch = userPrompt.match(/long:\s*([-\d.]+)/);
      const presMatch = userPrompt.match(/pres:\s*([-\d.]+)/);
      const psalMatch = userPrompt.match(/psal:\s*([-\d.]+)/);

      const payload = {
        LATITUDE: latMatch ? parseFloat(latMatch[1]) : undefined,
        LONGITUDE: longMatch ? parseFloat(longMatch[1]) : undefined,
        PRES: presMatch ? parseFloat(presMatch[1]) : undefined,
        PSAL: psalMatch ? parseFloat(psalMatch[1]) : undefined,
      };

      if (
        payload.LATITUDE !== undefined &&
        payload.LONGITUDE !== undefined &&
        payload.PRES !== undefined &&
        payload.PSAL !== undefined
      ) {
        const response = await fetch(`${customModelUrl}/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Server request failed with status: ${response.status}. Please check your custom model server.`);
        }

        const data = await response.json();
        const reply = `Predicted TEMP: <b>${data.predicted_TEMP.toFixed(2)} °C</b>`;
        await typeResponse(reply);

      } else {
        await typeResponse("Sorry, I only have access to data provided by ARGO floats. Please provide all four required values (LATITUDE, LONGITUDE, PRES, and PSAL) for a prediction.");
      }
    } catch (error) {
      console.error("Error in onSent:", error);
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        setResultData("⚠️ Unable to connect to your custom model server. Please make sure it's running.");
      } else {
        setResultData(`⚠️ Sorry, there was an error processing your request. ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
        newChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
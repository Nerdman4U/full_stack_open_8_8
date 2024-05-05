import Navigation from "./components/Navigation";
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("library-user-token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  if (!token) {
    return (
      <LoginForm
        setToken={setToken}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
    );
  }

  return (
    <div className="m-10">
      {message && <p className={messageType}>{message}</p>}
      <Navigation />
    </div>
  );
};

export default App;

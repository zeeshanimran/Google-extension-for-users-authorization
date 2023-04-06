import React, {useState, useEffect} from "react";
import {Welcome} from "./screens/Welcome";
import {Login} from "./screens/Login";
import {Home} from "./screens/Home";

import {AppContext} from "./api/context";
import {generateSecret, decryptValue} from "./helper";
import {
  MemoryRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import {Signup} from "./screens/Signup";

function App() {
  const [secret, setSecret] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get(["secret", "password", "isLoggedIn"], (data) => {
      if (data.secret && data.password) {
        // Extension has already been initialized
        const decryptSecret = decryptValue(data.secret);
        setSecret(decryptSecret);
        setInitialized(true);
        setIsLoggedIn(data.isLoggedIn);
      } else {
        // Extension is not yet initialized
        const newSecret = generateSecret();
        setSecret(newSecret);
        setInitialized(false);
      }
    });
  }, []);

  return (
    <Router>
      <AppContext.Provider
        value={{
          secret,
          setSecret,
          initialized,
          setInitialized,
          isLoggedIn,
          setIsLoggedIn,
        }}
      >
        <Routes>
          <Route
            exact
            path="/"
            element={
              !initialized ? (
                <Welcome />
              ) : initialized && !isLoggedIn ? (
                <Navigate to="/login" />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Home />} />
        </Routes>
      </AppContext.Provider>
    </Router>
  );
}

export default App;

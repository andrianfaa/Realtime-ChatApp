/* eslint-disable react/jsx-no-constructed-context-values */
import { Router as AppRouter } from "components";
import { UserContext } from "context";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    const [username, setUsername] = useState<string>("");

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            <Router>
                <AppRouter />
            </Router>
        </UserContext.Provider>
    );
}

export default App;

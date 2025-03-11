import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./src/pages/Frontpage";
import AuthenticationForm from "./auth/AuthenticationForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/auth" element={<AuthenticationForm />} />
      </Routes>
    </Router>
  );
}

export default App;

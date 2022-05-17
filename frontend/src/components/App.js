import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "../styles/App.css";

import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Home />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

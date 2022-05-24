import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../styles/App.css";

import Home from "./Home";
import Edit from "./Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="Edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

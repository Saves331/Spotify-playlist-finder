import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Callback from "./routes/Callback";

function App() {

   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App



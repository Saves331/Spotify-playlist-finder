import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Callback from "./routes/Callback";
import Search from "./routes/Search";

function App() {

   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App



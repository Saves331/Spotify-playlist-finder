import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Callback from "./routes/Callback";
import Search from "./routes/Search";
import Dummy from "./routes/Dummy";


function App() {

   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dummy" element={<Dummy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App



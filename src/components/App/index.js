import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "../../pages/users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Store from "./pages/Store";

function App() {
  return (
    <Routes>
      <Route path="/:slug" element={<Store />} />
    </Routes>
  );
}

export default App;
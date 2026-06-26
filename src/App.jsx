import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from "@/pages/Projects";
import KanbanBoard from "@/pages/KanbanBoard";

export default function App() {
  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/board" element={<KanbanBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
        <h1 className="text-4xl font-bold">Krono Platform</h1>
      </div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

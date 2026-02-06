import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import InputPage from "./pages/InputForm";


export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/input" element={<InputPage />} />

          {/* Add other routes here later */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventsPage from "./pages/EventsPage";

function App() {
  const isAuth = Boolean(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/login" element={isAuth ? <Navigate to="/events" replace /> : <LoginPage />} />
        <Route path="/register" element={isAuth ? <Navigate to="/events" replace /> : <RegisterPage />} />

        {/* Защищённые маршруты */}
        <Route element={<PrivateRoute />}>
          <Route path="/events" element={<EventsPage />} />
          {/* Добавьте другие защищённые маршруты здесь */}
        </Route>

        {/* Редирект по умолчанию */}
        <Route path="/" element={
          isAuth ? <Navigate to="/events" replace /> : <Navigate to="/login" replace />
        } />

        {/* Если маршрут не существует */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
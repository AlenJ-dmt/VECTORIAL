import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Routes/Login";
import { Dashboard } from "./Routes/Dashboard";
import { PrivateRoutes } from "./Routes/PrivateRoutes";
import { AddUser } from "./Routes/AddUser";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="crear-usuario" element={<AddUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

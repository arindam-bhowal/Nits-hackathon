import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Todo from './pages/todo/Todo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/todo" element={<Todo/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
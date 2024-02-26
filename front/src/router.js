import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginSupervisor from './pages/supervisor/LoginSupervisor'
import SearchProblem from './pages/supervisor/SearchProblem'
import Problem from './pages/supervisor/Problem'
import RegisterProblem from "./pages/administrador/RegisterProblem";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchProblem/>,
  },
  {
    path: "login_supervisor",
    element: <LoginSupervisor/>
  },
  {
    path: "problem",
    element: <Problem/>
  },
  {
    path: "register_problem",
    element: <RegisterProblem/>
  }
]);

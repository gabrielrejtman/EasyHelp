import {createBrowserRouter} from "react-router-dom";
import { DashboardLayout } from "./layout/sidebar";

import {Login} from "./pages/Login/Login"



import Home from "./pages/administrador/Home/Home.tsx"
import Orders from "./pages/administrador/Orders/Orders.tsx";

import {Problems} from "./pages/administrador/Problems/ShowProblems/index.tsx"
import {RegisterProblems} from "./pages/administrador/Problems/RegisterProblem/index.tsx";

import {Users} from './pages/administrador/Users/ShowUsers/index.tsx'
import {AddUsers} from './pages/administrador/Users/AddUsers/index.tsx'
import {RegisterSupervisor} from "./pages/administrador/Users/AddSupervisor/index.tsx";
import {RegisterSpecialist} from "./pages/administrador/Users/AddSpecialist/index.tsx";


import {SearchProblem} from "./pages/supervisor/SearchProblems/SearchProblem.tsx";
import {SupervisorHistoric} from "./pages/supervisor/Orders/SupervisorHistoric.tsx";
import {ProblemNotFound} from "./pages/supervisor/ProblemNotFound/ProblemNotFound.tsx";
import { ProblemDetails } from "./pages/supervisor/ProblemDetails/ProblemDetails.tsx";


import {SpecialistDemands} from "./pages/specialist/Home/SpecialistDemands.tsx"
import { CreateOrder } from "./services/useCases/Orders/CreateOrder.ts";
import { CreateOrderFromProblem } from "./pages/supervisor/CreateOrderFromProblem/CreateOrder.tsx";

import {ReportReview} from "./pages/administrador/Reports/ReportLayout/ReportReview.tsx";
import { UpdateProblem } from "./pages/administrador/Problems/UpdateProblem/index.tsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/report-review",
    element: <ReportReview/>
  },
  {
    path: "/adm",
    element: <DashboardLayout/>,
    children: [

      {
        path: "home",
        element: <Home/>
      },
      {
        path: "orders",
        element: <Orders/>
      },

      {
        path: "users",
        element: <Users/>,
      },
      {
        path: "users-register",
        element: <AddUsers/>
      },
      {
        path: "supervisor-register",
        element: <RegisterSupervisor/>
      },
      {
        path: "specialist-register",
        element: <RegisterSpecialist/>
      },


      {
        path: "problems",
        element: <Problems/>,
      },
      {
        path: "problems-register",
        element: <RegisterProblems/>
      },
      {
        path: "problems-update",
        element: <UpdateProblem/>
      }
    ]

  },
  {
    path: "/supervisor",
    element: <DashboardLayout/>,
    children:[
      {
        path: "home",
        element: <SearchProblem/>
      },
      {
        path: "supervisor-historic",
        element: <SupervisorHistoric/>
      },
      {
        path: "problem-not-found",
        element: <ProblemNotFound/>
      },
      {
        path: "problem-details",
        element: <ProblemDetails/>
      },
      {
        path: "create-order",
        element: <CreateOrderFromProblem/>
      }
    ]
  },
  {
    path: '/specialist',
    element: <DashboardLayout/>,
    children:[
      {
        path: "home",
        element: <SpecialistDemands/>
      }]
  }
])


// index.tsx 集中管理整个项目的路由配置
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Todo from "../pages/Todo";  
import FormPage from "../pages/FormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/todo",
    element: <Todo />
  },
  {
    path: "/form",
    element: <FormPage />
  }
]);

export default router;
import { createBrowserRouter } from "react-router";
import { WeddingBuilder } from "./pages/WeddingBuilder";
import Registration from './pages/Registration';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: WeddingBuilder,
  },
  {
    path: '/registration', // 브라우저 주소창에 들어갈 주소
    Component: Registration,
  },
]);

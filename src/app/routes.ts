import { createBrowserRouter } from "react-router";
import HomepageMain from "./pages/HomepageMain";
import CreateAccount from "./pages/CreateAccount";
import { WeddingBuilder } from "./pages/WeddingBuilder";
import Registration from './pages/Registration';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomepageMain,        // 홈페이지 메인
  },
  {
    path: "/create-account",
    Component: CreateAccount,       // 회원가입 화면
  },
  {
    path: "/registration",
    Component: Registration,        // 회원가입 완료 후 화면
  },
  {
    path: "/wedding-builder",
    Component: WeddingBuilder,      // 모바일 청첩장 제작
  },
]);

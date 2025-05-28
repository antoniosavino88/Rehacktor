import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/homepage/index";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/error/index";

export function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          {/* catchallroutes */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/homepage/index";
import GenrePage from "../genrepage/index";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/error/index";
import GamePage from "../gamepage/index";

export function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/games/:genre" element={<GenrePage />} />
          <Route path="/games/:slug/:id" element={<GamePage />} />
          {/* catchallroutes */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

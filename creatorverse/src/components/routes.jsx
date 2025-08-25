import { Routes, Route } from "react-router-dom";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ShowCreators from "./pages/ShowCreators";
import ErrorPage from "./pages/ErrorPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ShowCreators />} />
      <Route path="/view/:name" element={<ViewCreator />} />
      <Route path="/add" element={<AddCreator />} />
      <Route path="/edit" element={<EditCreator />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
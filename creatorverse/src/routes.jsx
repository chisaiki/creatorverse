import { Routes, Route } from "react-router-dom";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ShowCreators from "./pages/ShowCreators";

export default function AppRoutes() {
  return (
    <Routes>
  <Route path="/" element={<ShowCreators />} />
      <Route path="/view" element={<ViewCreator />} />
      <Route path="/add" element={<AddCreator />} />
      <Route path="/edit" element={<EditCreator />} />
    </Routes>
  );
}
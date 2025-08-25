import { Link } from "react-router-dom";
import Cards from "../Cards";

export default function ShowCreators() {
  return (
    <div>
      <p>Welcome to Creatorverse, a platform to showcase and manage content creators.</p>
      <Cards hideAddForm={true} hideRemove={true} shortenUrl={true} />
    </div>
  );
}
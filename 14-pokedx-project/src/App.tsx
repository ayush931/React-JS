import CustomRoutes from "./routes/CustomRoutes";
import './App.css';
import {Link} from "react-router-dom";

function App() {
  return <div className={"outer-pokedex"}>
    <h1 id={"pokedex-heading"}>
      <Link to={"/"}>Pokedex</Link>
    </h1>
    <CustomRoutes />
  </div>;
}

export default App;

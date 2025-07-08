import PokemonList from "../PokemonList/PokemonList.tsx";
import Search from "../Search/Search.tsx";
import "./Pokedex.css";

export default function Pokedex() {
  return (
    <div className={"pokedex-wrapper"}>

      <Search />
      <PokemonList />
    </div>
  );
}

import { useParams } from "react-router-dom"
import "./PokemonDetails.css"

export default function PokemonDetails() {
  const { id } = useParams();

  return (
    <div className={"pokemon-details-wrapper"}>
      <div className={"pokemon-details-name"}><span>{pokemon.name}</span></div>
      <img src={pokemon.image} className={"pokemon-details-image"} />
      <div className={"pokemon-details-name"}>Height: {pokemon.height}</div>
      <div className={"pokemon-details-name"}>Width: {pokemon.width}</div>
      <div className={"pokemon-details-types"}>
        {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
      </div>
      {pokemon.types && <div>
        More {pokemon.types[0]} type pokemon
        <ul>
          {pokemonListState.pokemonList && pokemonListState.pokemonList.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
        </ul>
      </div>
      }
    </div>
  )
}

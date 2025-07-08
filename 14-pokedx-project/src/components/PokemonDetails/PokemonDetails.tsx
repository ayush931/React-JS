import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';
import "./PokemonDetails.css"

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      height: response.data.height,
      width: response.data.width,
      types: response.data.types.map((t) => t.type.name)
    })
  }

  useEffect(() => {
    downloadPokemon()
  }, [])

  return (
    <div className={"pokemon-details-wrapper"}>
      <div className={"pokemon-details-name"}><span>{pokemon.name}</span></div>
      <img src={pokemon.image} className={"pokemon-details-image"} />
      <div className={"pokemon-details-name"}>Height: {pokemon.height}</div>
      <div className={"pokemon-details-name"}>Width: {pokemon.width}</div>
      <div className={"pokemon-details-types"}>
        {pokemon.types && pokemon.types.map((t) =><div key={t}>{t}</div>)}
      </div>
    </div>
  )
}

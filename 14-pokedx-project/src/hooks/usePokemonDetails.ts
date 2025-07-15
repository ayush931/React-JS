import { useEffect, useState } from "react";
import usePokemonState from "./usePokemonList";

function usePokemonDetails(id) {
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

  usePokemonState(`https://pokeapi.co/api/v2/type/${pokemon.types ? pokemon.types[0] : "fire"}`, true);

  useEffect(() => {
    downloadPokemon()
  }, [])

  return [pokemon]
}

export default usePokemonDetails;
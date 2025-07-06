import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    
  }

  useEffect(() => {
    downloadPokemon()
  }, [])

  return (
    <div>Hello</div>
  )
}

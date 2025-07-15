import { useEffect, useState } from "react";
import axios from 'axios';

function usePokemonState(url, type) {
  // const [pokemonList, setPokemonList] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [pokedexUrl, setPokedexUrl] = useState(
  //   ''
  // );
  // const [prevUrl, setPrevUrl] = useState('');
  // const [nextUrl, setNextUrl] = useState('');

  // state management for multiple useState
  interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: unknown;
  }

  const [pokemonListState, setPokemonListState] = useState<{
    pokemonList: Pokemon[];
    loading: boolean;
    pokedexUrl: string;
    prevUrl: string | null;
    nextUrl: string | null;
  }>({
    pokemonList: [],
    loading: true,
    pokedexUrl: url,
    prevUrl: null,
    nextUrl: null,
  });

  async function downloadPokemon() {
    // setLoading(true);
    setPokemonListState({ ...pokemonListState, loading: true });

    const response = await axios.get(pokemonListState.pokedexUrl); // gives the name and url of pokemon where all the data exists, now have to fetch the details from the link || list of 20 pokemons
    const pokemonResult = response.data.results; // we get the array of pokemon results

    // setPrevUrl(response.data.previous);
    // setNextUrl(response.data.next);
    setPokemonListState((state) => ({ ...state, prevUrl: response.data.previous, nextUrl: response.data.next }))

    // iterating over the arrays of pokemon and using its url to create an array of promise
    if (type) {
      setPokemonListState((state) => ({
        ...state,
        pokemonList: response.data.pokemon.slice(0, 5)
      }))
    }
    else {
      const pokemonResultPromise = pokemonResult.map((pokemon: { url: string }) =>
        axios.get(pokemon.url)
      );

      const pokemonData = await axios.all(pokemonResultPromise); // getting all the data from all the given links, give the response when all the promise resolved

      console.log(pokemonData);

      // now mapping through all the data and getting the pokemon name, image and types
      const pokeListResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });
      console.log(pokeListResult);
      // setPokemonList(pokeListResult);
      // setLoading(false);
      setPokemonListState((state) => ({ ...state, pokemonList: pokeListResult, loading: false }))
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokedexUrl]);

  return [
    pokemonListState,
    setPokemonListState
  ]
}

export default usePokemonState;
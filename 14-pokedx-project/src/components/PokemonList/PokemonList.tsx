import axios from 'axios';
import { useEffect, useState } from 'react';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pokedexUrl, setPokedexUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon'
  );
  const [prevUrl, setPrevUrl] = useState('');
  const [nextUrl, setNextUrl] = useState('');

  async function downloadPokemon() {
    setLoading(true);

    const response = await axios.get(pokedexUrl); // gives the name and url of pokemon where all the data exists, now have to fetch the details from the link || list of 20 pokemons
    const pokemonResult = response.data.results; // we get the array of pokemon results

    setPrevUrl(response.data.previous);
    setNextUrl(response.data.next);

    // iterating over the arrays of pokemon and using its url to create an array of promise
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
    setPokemonList(pokeListResult);
    setLoading(false);
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div>List of Pokemon</div>
      <div className="pokemon-wrapper">
        {loading
          ? 'Loading...'
          : pokemonList.map(
              (p: { name: string; image: string; id: number }) => (
                <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
              )
            )}
      </div>
      <div className="controls">
        <button
          disabled={prevUrl === null}
          onClick={() => setPokedexUrl(prevUrl)}
        >
          Prev
        </button>
        <button
          disabled={nextUrl === null}
          onClick={() => setPokedexUrl(nextUrl)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

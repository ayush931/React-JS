import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';
import usePokemonState from '../../hooks/usePokemonList';

export default function PokemonList() {

  const [pokemonListState, setPokemonListState] = usePokemonState("https://pokeapi.co/api/v2/pokemon", false)

  return (
    <div className="pokemon-list-wrapper">
      <div>List of Pokemon</div>
      <div className="pokemon-wrapper">
        {pokemonListState.loading
          ? 'Loading...'
          : pokemonListState.pokemonList.map(
            (p: { name: string; image: string; id: number }) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            )
          )}
      </div>
      <div className="controls">
        <button
          disabled={pokemonListState.prevUrl === null}
          onClick={() => {
            const urlToSet = pokemonListState.prevUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet })
          }}
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.nextUrl === null}
          onClick={() => {
            const urlToSet = pokemonListState.nextUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet })
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

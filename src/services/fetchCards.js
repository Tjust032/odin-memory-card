// src/services/fetchCards.js

export async function fetchPokemon(limit = 10) {
  try {
    const maxPokemonId = 1010; // As of Gen 9, adjust if needed

    // Generate an array of unique random IDs
    const randomIds = new Set();
    while (randomIds.size < limit) {
      const id = Math.floor(Math.random() * maxPokemonId) + 1;
      randomIds.add(id);
    }

    // Fetch each Pokémon by ID
    const detailedData = await Promise.all(
      Array.from(randomIds).map(async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const details = await res.json();

        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
        };
      })
    );

    console.log("Fetched random Pokémon data:", detailedData);

    return detailedData;
  } catch (error) {
    console.error("Error fetching random Pokémon data:", error);
    throw error;
  }
}

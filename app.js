const urlApi = "https://pokeapi.co/api/v2";

// ******** Obtener detalles de un Pokémon por nombre ******** //
async function pokemonNombre(nombre) {
    const res = await fetch(`${urlApi}/pokemon/${nombre}`);
    if (!res.ok) throw new Error('Pokémon no encontrado.')
    const data = res.json();
    return await data;
}
pokemonNombre("pikachu")
    .then(data => console.log("Pokemon:", data))
    .catch(error => console.error(error.message));


// ******** Obtener habilidades de un Pokémon específico ******** //
async function pokemonHabilidades(nombre) {
    const pokemon = await pokemonNombre(nombre);
    return pokemon.abilities.map(habilidad => habilidad.ability.name);
}
pokemonHabilidades("pikachu")
    .then(tipo => console.log("Habilidades: ", tipo))
    .catch(error => console.error(error.message))


// ******** Obtener información por tipo específico ******** //
async function pokemonTipoInfo(tipo) {
    const res = await fetch(`${urlApi}/type/${tipo}`);
    if (!res.ok) throw new Error('Tipo no encontrado');
    return await res.json();
}
pokemonTipoInfo("water")
    .then(tipo => console.log("Tipo: ", tipo))
    .catch(error => console.error(error.message))


// ******** Obtener una lista de los primeros 50 Pokémon ******** //
async function primerosPokemon(cantidad) {
    const res = await fetch(`${urlApi}/pokemon?limit=${cantidad}`);
    const data = await res.json();
    return data.results;
}
primerosPokemon(50)
    .then(data => console.log("Listado de Pokémon: ", data))
    .catch(error => console.error(error.message));


// Interfaz básica para buscar y mostrar un Pokémon por su nombre
document.addEventListener('DOMContentLoaded', () => {
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" id="pokemonNombre" placeholder="Ingresa un pokémon" required>
        <button type="submit">Buscar</button>
        <div id="pokemonInfo"></div>
    `;
    document.body.appendChild(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('pokemonNombre').value.toLowerCase();
        const pokemonInfo = document.getElementById('pokemonInfo');
        try {
            const pokemon = await pokemonNombre(nombre);
            pokemonInfo.innerHTML = `
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
            `;
        } catch (err) {
            pokemonInfo.textContent = err.message;
        }
    });
});
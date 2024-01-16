console.log("Exercice 4 - The Star Wars API")
const BASE_URL = "https://swapi.dev/api/";

function fetchSWAPIResults (url) {
    return fetch(`${BASE_URL}${url}`)
        .then((response) => response.json())
        .then((json) => json.results);
}

function extractIdFromURL(url) {
    return Number(url.split("/").at(-2));
}

async function performExercise() {
    console.log("1 -");
    await fetchSWAPIResults("films").then((results) => {
        results.forEach(({title, episode_id, director}) => {
           console.log(`${title} - ${episode_id} - ${director}`)
        });
    });
    console.log('\n2 -');
    await fetchSWAPIResults("vehicles").then((results) => {
        results.forEach(({ name, vehicle_class, manufacturer}) => {
            console.log(`${name} - ${vehicle_class} - ${manufacturer}`);
        })
    })
    console.log('\n3 -');
    await Promise.all([
        fetchSWAPIResults("films"),
        fetchSWAPIResults("planets")
            .then(planets => planets.filter((planet) => planet.climate === "temperate"))
    ]).then(([films, planets]) => {
        console.log(
            `${films.map(f => f.title).join(', ')} - ${planets.map(p => p.name).join(', ')}`
        );
    })
}

performExercise();

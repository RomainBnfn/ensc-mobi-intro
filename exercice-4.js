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
    console.log('\n4 - ');
    await Promise.all([
        fetchSWAPIResults("people")
            .then(people => people.sort((p1, p2) => p1.name.localeCompare(p2.name))),
        fetchSWAPIResults("planets")
    ]).then(([people, planets]) => {
        console.log(people.map(p => ({name: p.name, homeworld: extractIdFromURL(p.homeworld)})));
        console.log(planets.map(p => ({ name: p.name, id: p.id })))
        people.forEach(({name, homeworld, eye_color}) => {
            const correspondingPlanet = planets.find(planet => planet.id === extractIdFromURL(homeworld));
            console.log(`${name} - ${correspondingPlanet?.name} - ${eye_color}`);
        })
    });
}

performExercise();

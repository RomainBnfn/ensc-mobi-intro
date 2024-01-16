console.log("Exercice 2 - Automate cellulaire");

function getInitializedWorld() {
    const world = Array(100).fill(0);
    world[33] = 1;
    world[66] = 1;
    return world;
}

function getCellNeighborhood(world, index) {
    return [
        world.at((index - 1) % world.length),
        world.at(index % world.length),
        world.at((index + 1) % world.length)
    ];
}

function getNextCellValue(currentNeighborhood, configuration) {
    const [a, b, c] = currentNeighborhood;
    return configuration[7 - 4 * a - 2 * b - c ];
}

function getWorldNextValue(world, configuration) {
    const nextWorld = [...world];
    world.forEach((_, index) => {
        nextWorld[index] = getNextCellValue(
            getCellNeighborhood(world, index),
            configuration
        );
    })
    return nextWorld;
}

function runConfigurationOnWorld(configuration) {
    let world = getInitializedWorld();
    for (let i = 1; i <= 50; i ++) {
        console.log("Step ", i, ", world: ", world);
        world = getWorldNextValue(world, configuration);
    }
}

console.log("Règle 30");
runConfigurationOnWorld( [0, 0, 0, 1, 1, 1, 1, 0]);

console.log("Règle 110");
runConfigurationOnWorld( [0, 1, 1, 0, 1, 1, 1, 0]);
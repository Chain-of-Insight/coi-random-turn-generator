'use strict'

const Random = require("random-js").Random;
const MersenneTwister19937 = require("random-js").MersenneTwister19937;

const affinityMapping = [
    'FIRE',
    'WATER',
    'WIND'
];

const generateRandomNumber = async function (min = 0, max = 2) {
    const RandomModel = new Random(MersenneTwister19937.autoSeed());
    // Generates a random number, within given range,
    // with a uniform distribution
    if (typeof min === "number" && typeof max === "number") {
        let number = await RandomModel.integer(min, max);
        // Return random index
        return number;
    } else {
        // Fallback, but should never happen
        return null;
    }
};

const generateTurnSet = async function () {
    const turnQuantity = 4;
    let turns = [];
    // Generate turns
    for (let i = 0; i < (turnQuantity + 1); i++) {
        let turn = await generateRandomNumber();
        turns.push(turn);
        if (i == turnQuantity) {
            for (let j = 0; j < turns.length; j++) {
                //console.log('Turn ' + (j+1) + ':', affinityMapping[turns[j]]);
                turns[j] = affinityMapping[turns[j]];
                if (j == (turns.length - 1)) {
                    return turns;
                }
            }
        }
    }
};

const getRandomGeneration = async function () {
    let turns = await generateTurnSet();
    return turns;
}


module.exports = {
    generateTurnSet: generateTurnSet,
    generateRandomNumber: generateRandomNumber,
    getRandomGeneration: getRandomGeneration
};
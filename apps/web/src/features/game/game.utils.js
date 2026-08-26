export const TOTAL_CHARACTERS = 20;
export const PENALTY_PER_WRONG_ATTEMPT = 0.5;

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function generateSequence() {
    return Array.from(
        { length: TOTAL_CHARACTERS },
        () =>
            ALPHABETS[
            Math.floor(Math.random() * ALPHABETS.length)
            ],
    ).join("");
}

export function calculatePenalty(wrongAttempts) {
    return wrongAttempts * PENALTY_PER_WRONG_ATTEMPT;
}

export function calculateFinalTime(
    completionTime,
    wrongAttempts,
) {
    return completionTime + calculatePenalty(wrongAttempts);
}
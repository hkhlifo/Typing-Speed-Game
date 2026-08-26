const BEST_SCORE_KEY = "typing_game_best_score";

export function getLocalBestScore() {
    const score = localStorage.getItem(BEST_SCORE_KEY);

    if (!score) {
        return null;
    }

    return Number(score);
}

export function saveLocalBestScore(score) {
    localStorage.setItem(
        BEST_SCORE_KEY,
        String(score),
    );
}
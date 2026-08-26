import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client/react";

import Navbar from "../components/Navbar";

import { SAVE_GAME_RESULT } from "../features/game/game.graphql";

import {
    calculateFinalTime,
    calculatePenalty,
    generateSequence,
    TOTAL_CHARACTERS,
} from "../features/game/game.utils";

import {
    getLocalBestScore,
    saveLocalBestScore,
} from "../features/game/game.storage";

function GamePage() {
    const inputRef = useRef(null);
    const startTimeRef = useRef(null);

    const [sequence, setSequence] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const [elapsedTime, setElapsedTime] = useState(0);
    const [wrongAttempts, setWrongAttempts] = useState(0);

    const [result, setResult] = useState(null);

    const [saveGameResult, { loading: saving }] =
        useMutation(SAVE_GAME_RESULT);

    useEffect(() => {
        if (!isPlaying || !startTimeRef.current) {
            return;
        }

        const interval = setInterval(() => {
            const elapsed =
                (performance.now() - startTimeRef.current) / 1000;

            setElapsedTime(elapsed);
        }, 50);

        return () => clearInterval(interval);
    }, [isPlaying]);

    useEffect(() => {
        if (isPlaying) {
            inputRef.current?.focus();
        }
    }, [isPlaying]);

    function startGame() {
        const newSequence = generateSequence();

        setSequence(newSequence);
        setCurrentIndex(0);

        setWrongAttempts(0);
        setElapsedTime(0);

        setResult(null);
        setIsCompleted(false);

        startTimeRef.current = performance.now();

        setIsPlaying(true);

        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    }

    async function completeGame(
        finalWrongAttempts,
    ) {
        const completionTime =
            (performance.now() - startTimeRef.current) / 1000;

        const finalTime = calculateFinalTime(
            completionTime,
            finalWrongAttempts,
        );

        const penaltyTime = calculatePenalty(
            finalWrongAttempts,
        );

        setElapsedTime(completionTime);
        setIsPlaying(false);
        setIsCompleted(true);

        const previousBest = getLocalBestScore();

        const isNewBest =
            previousBest === null ||
            finalTime < previousBest;

        if (isNewBest) {
            saveLocalBestScore(finalTime);
        }

        setResult({
            completionTime,
            wrongAttempts: finalWrongAttempts,
            penaltyTime,
            finalTime,
            previousBest,
            isNewBest,
        });

        try {
            await saveGameResult({
                variables: {
                    input: {
                        completionTime,
                        correctCharacters: TOTAL_CHARACTERS,
                        wrongAttempts: finalWrongAttempts,
                        sequence,
                    },
                },
            });
        } catch (error) {
            console.error(
                "Failed to save game result:",
                error,
            );
        }
    }

    function handleKeyDown(event) {
        if (!isPlaying || isCompleted) {
            return;
        }

        const key = event.key.toUpperCase();

        if (!/^[A-Z]$/.test(key)) {
            return;
        }

        const currentCharacter =
            sequence[currentIndex];

        if (key === currentCharacter) {
            const nextIndex = currentIndex + 1;

            if (nextIndex === TOTAL_CHARACTERS) {
                completeGame(wrongAttempts);
            } else {
                setCurrentIndex(nextIndex);
            }
        } else {
            setWrongAttempts((current) => current + 1);
        }
    }

    function handleBlur() {
        if (isPlaying) {
            requestAnimationFrame(() => {
                inputRef.current?.focus();
            });
        }
    }

    const currentCharacter =
        sequence[currentIndex];

    const penaltyTime =
        calculatePenalty(wrongAttempts);

    const liveFinalTime =
        elapsedTime + penaltyTime;

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="mx-auto flex max-w-5xl flex-col items-center px-6 py-12">

                <div className="mb-12 text-center">
                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
                        Typing Challenge
                    </p>

                    <h1 className="mt-3 text-4xl font-bold">
                        Beat the clock.
                    </h1>

                    <p className="mt-3 text-slate-400">
                        Complete all 20 characters with as few
                        mistakes as possible.
                    </p>
                </div>

                {!isPlaying && !isCompleted && (
                    <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 text-4xl">
                            ⌨️
                        </div>

                        <h2 className="mt-6 text-2xl font-semibold">
                            Ready when you are
                        </h2>

                        <p className="mt-3 text-slate-400">
                            You will receive 20 random characters.
                            Each incorrect key adds a 0.5 second penalty.
                        </p>

                        <button
                            onClick={startGame}
                            className="mt-8 rounded-xl bg-blue-500 px-8 py-4 font-semibold transition hover:bg-blue-400"
                        >
                            Start Game →
                        </button>
                    </div>
                )}

                {isPlaying && (
                    <div
                        className="w-full max-w-3xl"
                        onClick={() => inputRef.current?.focus()}
                    >

                        <div className="grid gap-4 sm:grid-cols-3">

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <p className="text-sm text-slate-400">
                                    Time
                                </p>

                                <p className="mt-2 text-2xl font-semibold">
                                    {elapsedTime.toFixed(2)}s
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <p className="text-sm text-slate-400">
                                    Penalty
                                </p>

                                <p className="mt-2 text-2xl font-semibold text-red-400">
                                    +{penaltyTime.toFixed(1)}s
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <p className="text-sm text-slate-400">
                                    Progress
                                </p>

                                <p className="mt-2 text-2xl font-semibold">
                                    {currentIndex} / {TOTAL_CHARACTERS}
                                </p>
                            </div>

                        </div>

                        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
                            <div
                                className="h-full rounded-full bg-blue-500 transition-all"
                                style={{
                                    width: `${(currentIndex / TOTAL_CHARACTERS) * 100
                                        }%`,
                                }}
                            />
                        </div>

                        <div className="mt-12 rounded-3xl border border-blue-400/20 bg-blue-400/5 px-6 py-14 text-center">

                            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                                Press the key
                            </p>

                            <div className="mt-6 text-8xl font-bold text-blue-400 sm:text-9xl">
                                {currentCharacter}
                            </div>

                            <p className="mt-8 text-sm text-slate-500">
                                Incorrect attempts: {wrongAttempts}
                            </p>

                        </div>

                        <input
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            className="absolute h-px w-px opacity-0"
                            aria-label="Typing game input"
                        />

                        <p className="mt-6 text-center text-sm text-slate-500">
                            Keep typing — the game will stay focused.
                        </p>

                    </div>
                )}

                {isCompleted && result && (
                    <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">

                        <div className="text-5xl">
                            {result.isNewBest ? "🏆" : "🎯"}
                        </div>

                        <h2 className="mt-5 text-3xl font-bold">
                            {result.isNewBest
                                ? "New Personal Best!"
                                : "Challenge Complete"}
                        </h2>

                        <p className="mt-3 text-slate-400">
                            {result.isNewBest
                                ? "You beat your previous best score."
                                : "Good attempt. Try again and beat your best!"}
                        </p>

                        <div className="mt-10 grid gap-4 sm:grid-cols-3">

                            <div className="rounded-2xl bg-slate-900 p-5">
                                <p className="text-sm text-slate-400">
                                    Completion
                                </p>

                                <p className="mt-2 text-xl font-semibold">
                                    {result.completionTime.toFixed(2)}s
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-900 p-5">
                                <p className="text-sm text-slate-400">
                                    Penalty
                                </p>

                                <p className="mt-2 text-xl font-semibold text-red-400">
                                    +{result.penaltyTime.toFixed(2)}s
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-900 p-5">
                                <p className="text-sm text-slate-400">
                                    Final Score
                                </p>

                                <p className="mt-2 text-xl font-semibold text-blue-400">
                                    {result.finalTime.toFixed(2)}s
                                </p>
                            </div>

                        </div>

                        {result.previousBest !== null && (
                            <p className="mt-6 text-sm text-slate-400">
                                Previous best:{" "}
                                <span className="font-medium text-white">
                                    {result.previousBest.toFixed(2)}s
                                </span>
                            </p>
                        )}

                        <button
                            onClick={startGame}
                            disabled={saving}
                            className="mt-10 rounded-xl bg-blue-500 px-8 py-4 font-semibold transition hover:bg-blue-400 disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Play Again →"}
                        </button>

                    </div>
                )}

            </main>
        </div>
    );
}

export default GamePage;
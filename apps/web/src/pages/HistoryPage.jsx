import { useQuery } from "@apollo/client/react";
import { Link } from "react-router-dom";

import PageContainer from "../components/PageContainer";
import Navbar from "../components/Navbar";

import {
    GET_GAME_HISTORY,
    GET_MY_BEST_SCORE,
} from "../features/game/gameHistory.graphql";

function formatTime(value) {
    return `${Number(value).toFixed(2)}s`;
}

function formatDate(timestamp) {
    return new Date(Number(timestamp)).toLocaleString();
}

function HistoryPage() {
    const {
        data: historyData,
        loading: historyLoading,
        error: historyError,
    } = useQuery(GET_GAME_HISTORY);

    const {
        data: bestScoreData,
        loading: bestScoreLoading,
        error: bestScoreError,
    } = useQuery(GET_MY_BEST_SCORE);

    const history = historyData?.gameHistory ?? [];
    const bestScore = bestScoreData?.bestScore;

    const loading =
        historyLoading || bestScoreLoading;

    const error =
        historyError || bestScoreError;

    if (loading) {
        return (
            <PageContainer className="flex items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />

                    <p className="text-slate-400">
                        Loading your performance...
                    </p>
                </div>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer className="flex items-center justify-center">
                <div className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
                    <p className="mb-2 text-lg font-semibold text-white">
                        Unable to load your game history
                    </p>

                    <p className="mb-6 text-sm text-slate-400">
                        Something went wrong while retrieving
                        your performance data.
                    </p>

                    <Link
                        to="/game"
                        className="inline-flex rounded-xl bg-blue-500 px-5 py-3 font-medium text-white transition hover:bg-blue-400"
                    >
                        Back to Game
                    </Link>
                </div>
            </PageContainer>
        );
    }

    const latestGame = history[0];

    return (
        <PageContainer>
            <Navbar />

            <section className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
                        Performance
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Your Game History
                    </h1>

                    <p className="mt-3 max-w-xl text-slate-400">
                        Track your progress, review previous
                        attempts, and beat your personal best.
                    </p>
                </div>

                <Link
                    to="/game"
                    className="inline-flex items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 px-5 py-3 font-medium text-blue-300 transition hover:bg-blue-500 hover:text-white"
                >
                    Play Again →
                </Link>
            </section>

            <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-sm text-slate-400">
                        Personal Best
                    </p>

                    <p className="mt-3 text-3xl font-bold text-blue-300">
                        {bestScore
                            ? formatTime(bestScore.finalTime)
                            : "--"}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                        Your fastest recorded time
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-sm text-slate-400">
                        Games Played
                    </p>

                    <p className="mt-3 text-3xl font-bold text-white">
                        {history.length}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                        Completed challenges
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:col-span-2 lg:col-span-1">
                    <p className="text-sm text-slate-400">
                        Latest Score
                    </p>

                    <p className="mt-3 text-3xl font-bold text-white">
                        {latestGame
                            ? formatTime(latestGame.finalTime)
                            : "--"}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                        Your most recent attempt
                    </p>
                </div>
            </section>

            <section>
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            Recent Games
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Your completed typing challenges.
                        </p>
                    </div>

                    {history.length > 0 && (
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-400">
                            {history.length} games
                        </span>
                    )}
                </div>

                {history.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
                        <p className="text-xl font-semibold text-white">
                            No games yet
                        </p>

                        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400">
                            Complete your first typing challenge
                            to start building your performance
                            history.
                        </p>

                        <Link
                            to="/game"
                            className="mt-6 inline-flex rounded-xl bg-blue-500 px-5 py-3 font-medium text-white transition hover:bg-blue-400"
                        >
                            Start Playing →
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px] text-left">
                                <thead className="border-b border-white/10 bg-white/[0.02]">
                                    <tr className="text-xs uppercase tracking-wider text-slate-500">
                                        <th className="px-5 py-4">
                                            #
                                        </th>

                                        <th className="px-5 py-4">
                                            Final Time
                                        </th>

                                        <th className="px-5 py-4">
                                            Completion
                                        </th>

                                        <th className="px-5 py-4">
                                            Wrong Keys
                                        </th>

                                        <th className="px-5 py-4">
                                            Penalty
                                        </th>

                                        <th className="px-5 py-4">
                                            Played
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {history.map((game, index) => (
                                        <tr
                                            key={game.id}
                                            className="border-b border-white/5 transition last:border-0 hover:bg-white/[0.03]"
                                        >
                                            <td className="px-5 py-5 text-slate-500">
                                                {index + 1}
                                            </td>

                                            <td className="px-5 py-5 font-semibold text-blue-300">
                                                {formatTime(
                                                    game.finalTime,
                                                )}
                                            </td>

                                            <td className="px-5 py-5 text-slate-300">
                                                {formatTime(
                                                    game.completionTime,
                                                )}
                                            </td>

                                            <td className="px-5 py-5 text-slate-300">
                                                {game.wrongAttempts}
                                            </td>

                                            <td className="px-5 py-5 text-slate-400">
                                                +
                                                {formatTime(
                                                    game.penaltyTime,
                                                )}
                                            </td>

                                            <td className="px-5 py-5 text-sm text-slate-400">
                                                {formatDate(
                                                    game.createdAt,
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </section>
        </PageContainer>
    );
}

export default HistoryPage;
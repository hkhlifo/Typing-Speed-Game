import { useQuery } from "@apollo/client/react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { GET_LEADERBOARD } from "../features/leaderboard/leaderboard.graphql";

function LeaderboardPage() {
  const { data, loading, error } = useQuery(
    GET_LEADERBOARD,
    {
      variables: {
        limit: 10,
      },
    },
  );

  const leaderboard = data?.leaderboard ?? [];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-14">

        {/* Page Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
            Global Rankings
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Leaderboard
          </h1>

          <p className="mt-4 text-slate-400">
            The fastest players earn the top spots.
            Lower time is better.
          </p>
        </div>

        {/* Leaderboard Content */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/5">

          {/* Loading State */}
          {loading && (
            <div className="p-12 text-center text-slate-400">
              Loading leaderboard...
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="p-12 text-center">
              <p className="text-red-400">
                Unable to load the leaderboard.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Please try again later.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading &&
            !error &&
            leaderboard.length === 0 && (
              <div className="p-12 text-center">
                <div className="text-4xl">
                  🏁
                </div>

                <h2 className="mt-4 text-xl font-semibold">
                  No scores yet
                </h2>

                <p className="mt-2 text-slate-400">
                  Be the first player to complete a challenge.
                </p>

                <Link
                  to="/game"
                  className="mt-6 inline-block rounded-xl bg-blue-500 px-6 py-3 font-semibold transition hover:bg-blue-400"
                >
                  Play Now →
                </Link>
              </div>
            )}

          {/* Leaderboard */}
          {!loading &&
            !error &&
            leaderboard.length > 0 && (
              <div>

                {/* Table Header */}
                <div className="grid grid-cols-[70px_1fr_120px] border-b border-white/10 px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                  <span>
                    Rank
                  </span>

                  <span>
                    Player
                  </span>

                  <span className="text-right">
                    Best Time
                  </span>
                </div>

                {/* Leaderboard Rows */}
                {leaderboard.map((entry, index) => {
                  const rank = index + 1;

                  return (
                    <div
                      key={entry.id}
                      className="grid grid-cols-[70px_1fr_120px] items-center border-b border-white/5 px-6 py-5 last:border-0 transition hover:bg-white/5"
                    >
                      <div className="font-semibold">
                        {rank === 1 && "🥇"}
                        {rank === 2 && "🥈"}
                        {rank === 3 && "🥉"}

                        {rank > 3 && `#${rank}`}
                      </div>

                      <div>
                        <p className="font-medium">
                          {entry.user.username}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Best recorded performance
                        </p>
                      </div>

                      <div className="text-right text-lg font-semibold text-blue-400">
                        {entry.finalTime.toFixed(2)}s
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/game"
            className="inline-flex rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Ready to compete? Play Now →
          </Link>
        </div>

      </main>
    </div>
  );
}

export default LeaderboardPage;
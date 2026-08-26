import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { isAuthenticated } from "../lib/auth";

function HomePage() {
    const loggedIn = isAuthenticated();

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
                    ⚡ Test your speed. Beat your best.
                </div>

                <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
                    How fast can your
                    <span className="block text-blue-400">
                        fingers think?
                    </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                    Complete 20 randomly generated characters,
                    avoid mistakes, and compete for the fastest time.
                    Every wrong key costs you 0.5 seconds.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        to={loggedIn ? "/game" : "/register"}
                        className="rounded-xl bg-blue-500 px-7 py-3 font-semibold text-white transition hover:bg-blue-400"
                    >
                        {loggedIn ? "Play Now →" : "Start Playing →"}
                    </Link>

                    <Link
                        to="/leaderboard"
                        className="rounded-xl border border-white/10 px-7 py-3 font-semibold text-slate-200 transition hover:bg-white/10"
                    >
                        View Leaderboard
                    </Link>
                </div>

                <section className="mt-24 grid w-full max-w-4xl gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
                        <div className="text-2xl">⌨️</div>
                        <h2 className="mt-4 font-semibold">
                            20 Characters
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            One character at a time. Stay focused and
                            complete the sequence.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
                        <div className="text-2xl">⚡</div>
                        <h2 className="mt-4 font-semibold">
                            Speed Matters
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Lower completion time means a better score.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
                        <div className="text-2xl">🎯</div>
                        <h2 className="mt-4 font-semibold">
                            Mistakes Cost Time
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Every incorrect key adds a 0.5 second penalty.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default HomePage;
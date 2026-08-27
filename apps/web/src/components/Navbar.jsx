import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, removeToken } from "../lib/auth";

function Navbar() {
    const navigate = useNavigate();

    const loggedIn = isAuthenticated();

    function handleLogout() {
        removeToken();
        navigate("/");
        window.location.reload();
    }

    return (
        <header className="border-b border-white/10">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                <Link
                    to="/"
                    className="text-lg font-bold tracking-tight"
                >
                    Type<span className="text-blue-400">Rush</span>
                </Link>

                <div className="flex items-center gap-6 text-sm">

                    <Link
                        to="/leaderboard"
                        className="text-slate-300 transition hover:text-white"
                    >
                        Leaderboard
                    </Link>

                    {loggedIn ? (
                        <>
                            <Link
                                to="/game"
                                className="text-slate-300 transition hover:text-white"
                            >
                                Play
                            </Link>

                            {/* ADD THIS */}
                            <Link
                                to="/history"
                                className="text-slate-300 transition hover:text-white"
                            >
                                History
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="rounded-lg border border-white/10 px-4 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="text-slate-300 transition hover:text-white"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-400"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
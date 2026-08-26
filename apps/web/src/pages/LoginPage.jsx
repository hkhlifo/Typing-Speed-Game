import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";

import { LOGIN } from "../features/auth/auth.graphql";
import { saveToken } from "../lib/auth";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [login, { loading, error }] = useMutation(LOGIN);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: {
          input: form,
        },
      });

      saveToken(data.login.token);

      navigate("/game");
    } catch {
      // Apollo exposes the error through `error`
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-10 block text-center text-xl font-bold"
        >
          Type<span className="text-blue-400">Rush</span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-bold">
            Welcome back
          </h1>

          <p className="mt-2 text-slate-400">
            Sign in and beat your best score.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-400"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">
                {error.message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-500 px-4 py-3 font-semibold transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            New here?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
import { Link } from "react-router-dom";
import { Clapperboard, Home, Film } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-[#0B0B0F] px-6 py-16 text-center text-white">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl bg-red-600/10 p-5">
            <Clapperboard size={48} className="text-red-500" />
          </div>
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
          Lost in the Movies?
        </p>

        <h1 className="text-8xl font-extrabold tracking-tight sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
          This Scene Doesn't Exist
        </h2>

        <p className="mx-auto mt-4 max-w-lg leading-7 text-gray-400">
          Looks like this page is missing from our collection.
          Let's get you back to discovering great movies and TV shows.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            to="/movies"
            className="flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-semibold transition hover:border-white/40 hover:bg-white/5"
          >
            <Film size={18} />
            Explore Movies
          </Link>
        </div>
      </div>
    </section>
  );
}

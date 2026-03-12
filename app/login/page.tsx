import { login } from "./actions";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-pink-50">
      <div className="z-10 max-w-md w-full items-center justify-center flex flex-col gap-8 bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-pink-600 mb-2">
          Restricted Area
        </h1>
        <p className="text-gray-500 mb-4 text-center">
          Please enter the password to view this site.
        </p>

        <form action={login} className="w-full flex flex-col gap-4">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-red-500 rounded-xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
}

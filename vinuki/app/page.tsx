import Link from "next/link";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-pink-50">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-8 animate-bounce">
          Hey Vinuki!
        </h1>
        
        <Link 
          href="/valentine"
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-red-500 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-red-600 hover:scale-110 shadow-lg"
        >
          <Heart className="mr-2 animate-pulse" />
          Click Me
          <div className="absolute -inset-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-200" />
        </Link>
        
        <p className="text-gray-500 mt-4">
          I have a question for you...
        </p>
      </div>
    </main>
  );
}

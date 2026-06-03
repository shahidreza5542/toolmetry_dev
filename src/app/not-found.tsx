import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
        <p className="text-lg text-[#999] mb-6">Page not found. The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0C2E76] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1a44a8] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

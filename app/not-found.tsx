import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-layora flex flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl italic sm:text-5xl">
        This page wandered off.
      </h1>
      <p className="mt-4 max-w-sm text-sm text-ink/60">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link href="/" className="btn-primary mt-9">
        Back to Home
      </Link>
    </div>
  );
}

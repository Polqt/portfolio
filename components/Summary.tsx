import { Skeleton } from './ui/skeleton';

export default function Summary() {
  const isLoading = false;

  return (
    <div className="text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
      <h3 className="text-black dark:text-white text-2xl font-semibold mb-2">
        {isLoading ? (
          <Skeleton className="w-48 h-6 rounded-md" />
        ) : (
          <p>Janpol Hidalgo</p>
        )}
      </h3>
      <p className="text-gray-900 dark:text-gray-400">
        {isLoading ? (
          <Skeleton className="w-64 h-4 rounded-md" />
        ) : (
          <p>A student software engineer from the Philippines.</p>
        )}
      </p>
      <p className="text-gray-900 dark:text-gray-400">
        {isLoading ? (
          <Skeleton className="w-48 h-6 rounded-md" />
        ) : (
          <p>Writes code, breaks code, then pretends it was a feature.</p>
        )}
      </p>
    </div>
  );
}

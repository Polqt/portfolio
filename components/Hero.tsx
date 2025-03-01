import { Skeleton } from './ui/skeleton';

export default function Hero() {
    const isLoading = false;

    return (
        <div className="text-gray-600 dark:text-neutral-400 max-w-full text-pretty">
            <h3 className="text-black dark:text-white text-xl">
                {isLoading ? (
                    <Skeleton className="w-48 h-6 rounded-md" />
                ) : (
                    <p>Janpol Hidalgo</p>
                )}
            </h3>
            <p>
                {isLoading ? (
                    <Skeleton className="w-64 h-4 rounded-md" />
                ) : (
                    <p>A student software engineer from the Philippines.</p>
                )}
            </p>
            <p>
                {isLoading ? (
                    <Skeleton className="w-48 h-6 rounded-md" />
                ) : (
                    <p></p>
                )}
            </p>
        </div>
    );
}

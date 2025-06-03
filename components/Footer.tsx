import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-neutral-700 pt-10 pb-6">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center max-w-2xl">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl text-black dark:text-white mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Want to collaborate or discuss a project? <br /> I&apos;m always
            open to new opportunities and interesting conversations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Link
              href="mailto:poyhidalgo@gmail.com"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>poyhidalgo@gmail.com</span>
            </Link>
          </div>
        </div>

        <div className="w-full h-px bg-gray-200 dark:bg-neutral-700"></div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>Janpol Hidalgo © {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}

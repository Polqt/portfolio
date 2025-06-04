'use client';

import Dock from '@/components/Dock';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';

export default function NotesContent() {
  const [activeIcon, setActiveIcon] = useState('list');

  const placeholders = [
    "Sorry, I don't have notes yet...",
    'Lost your thoughts? Found ‘em here!',
    'Don’t just think it—drop it here!',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-start">
        <div className="w-full flex flex-col max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start">
            <h1 className="font-bold text-4xl">Notes</h1>
            <p className="text-neutral-400 dark:text-gray-400 mt-4">
              All the important blogs or notes related to tech, design and other
              stuffs.
            </p>
            <div className="w-full mt-6 [&>form]:!max-w-full">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </div>
          </div>

          <hr className="border-gray-400/30 dark:border-gray-600/30 mt-8 mb-8" />

          <div className="w-full hidden sm:flex md:flex lg:flex gap-4 justify-end">
            <List
              className={`text-gray-500 dark:text-gray-400 px-1 py-1 w-8 h-8 cursor-pointer
                ${
                  activeIcon === 'list'
                    ? 'border border-gray-500 dark:border-gray-400 rounded-lg'
                    : ''
                }`}
              onClick={() => setActiveIcon('list')}
            />
            <LayoutGrid
              className={`text-gray-500 dark:border-gray-400 px-1 py-1 w-8 h-8 cursor-pointer
                ${
                  activeIcon === 'grid'
                    ? 'border border-gray-500 dark:border-gray-400 rounded-lg'
                    : ''
                }`}
              onClick={() => setActiveIcon('grid')}
            />
          </div>

          {/* Notes to be displayed here soon... */}
          <div></div>
        </div>
      </div>
      <div className="flex-shrink-0 pt-8 pb-6 sm:pt-12 sm:pb-8 lg:pt-16 lg:pb-10">
        <Dock />
      </div>
    </div>
  );
}

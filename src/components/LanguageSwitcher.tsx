'use client';

import Link from 'next/link';
import { GlobeIcon } from '@radix-ui/react-icons';

interface Props {
  currentLang: string;
}

export function LanguageSwitcher({ currentLang }: Props) {
  const targetLang = currentLang === 'ko' ? 'en' : 'ko';
  
  return (
    <Link
      href={`/${targetLang}`}
      className="px-3 py-1 text-yellow-200 text-sm hover:bg-yellow-200 hover:text-zinc-900 transition-colors flex items-center gap-1"
    >
      <GlobeIcon className="w-4 h-4" />
      {targetLang.toUpperCase()}
    </Link>
  );
} 
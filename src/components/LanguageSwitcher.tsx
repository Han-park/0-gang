'use client';

import Link from 'next/link';

interface Props {
  currentLang: string;
}

export function LanguageSwitcher({ currentLang }: Props) {
  const targetLang = currentLang === 'ko' ? 'en' : 'ko';
  
  return (
    <Link
      href={`/${targetLang}`}
      className="px-3 py-1 rounded-full border border-yellow-200 text-yellow-200 text-sm hover:bg-yellow-200 hover:text-zinc-900 transition-colors"
    >
      {targetLang.toUpperCase()}
    </Link>
  );
} 
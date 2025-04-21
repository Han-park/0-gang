import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface HeaderProps {
  currentLang: string;
}

export const Header = ({ currentLang }: HeaderProps) => {
  // Content for each language
  const content = {
    ko: {
      siteTitle: "대장간",
      about: "소개",
      posts: "게시물",
      members: "멤버",
      guestbook: "방명록",
    },
    en: {
      siteTitle: "Blacksmiths",
      about: "About",
      posts: "Posts",
      members: "Members",
      guestbook: "Guestbook",
    }
  } as const;

  const t = content[currentLang as keyof typeof content];

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50 border-b border-white/10">
      <div className="max-w-screen-lg mx-auto py-4 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={`/${currentLang}`} className="flex items-center gap-2">
            <Image 
              src="/image/logo-yellow-300-600-600.png"
              alt="Daejangang Logo"
              width={32}
              height={32}
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
            <span className="text-yellow-200 font-medium text-lg">{t.siteTitle}</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href={`/${currentLang}#about`} className="text-white/70 hover:text-yellow-200 transition-colors text-sm">
              {t.about}
            </Link>
            <Link href={`/${currentLang}#posts`} className="text-white/70 hover:text-yellow-200 transition-colors text-sm">
              {t.posts}
            </Link>
            <Link href={`/${currentLang}#members`} className="text-white/70 hover:text-yellow-200 transition-colors text-sm">
              {t.members}
            </Link>
            <Link href={`/${currentLang}#guestbook`} className="text-white/70 hover:text-yellow-200 transition-colors text-sm">
              {t.guestbook}
            </Link>
          </nav>
        </div>
        
        <LanguageSwitcher currentLang={currentLang} />
      </div>
    </header>
  );
}; 
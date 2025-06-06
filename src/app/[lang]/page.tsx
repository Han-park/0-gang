import Image from "next/image";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MemberShuffle } from "@/components/MemberShuffle";
import { SubstackFeed } from '@/components/SubstackFeed';
import { Header } from "@/components/Header";
import GuestbookEntries from "@/components/GuestbookEntries";
import { getGuestbookContent } from "@/data/guestbook";
import { createClient } from '@/lib/supabase/server';
import { UserInfo } from "@/components/MemberCard";

// Define type for language parameter
interface Props {
  params: {
    lang: string;
  };
}

// Content for each language (excluding members data)
const content = {
  ko: {
    title: "창업가들의 집 '대장간'",
    location: "서울시 광진구, 대한민국",
    description1: "대장간은 1조 이상의 기업 가치를 만들 청년 창업가들이 모여 사는 공간이자 커뮤니티 플랫폼입니다. 2021년 서울 홍대에 만들어진 5AM Club House의 멤버들이 2023년 2월 시작했으며, 주로 IT 분야의 창업자 혹은 공동 창업자가 모여 있습니다.",
    description2: "현재 6명이 거주하며 매주 인사이트 세미나를 열고, 한달에 한번 '담금질' 이라는 이름으로 액티비티를 진행하고 있습니다.",
    newsletter: "뉴스레터",
    instagram: "인스타그램",
    newsletterTitle: "최근 뉴스레터 글",
    residentialMembersTitle: "대장간의 형제들",
    townMembersTitle: "대장간 마을 멤버들",
    townMembershipRecruiting: "대장간 마을 멤버십 모집 예정",
  },
  en: {
    title: "Entrepreneurs' Hacker House, Blacksmiths",
    location: "Gwangjin-gu, Seoul, South Korea",
    description1: "Blacksmiths House is a living space and community platform for young entrepreneurs aiming to build companies valued at over $1 billion. Started in February 2023 by members of the 5AM Club House in Hongdae, Seoul, it primarily consists of founders and co-founders in the tech industry.",
    description2: "Currently home to 6 residents, we hold weekly insight seminars and monthly activities.",
    newsletter: "Newsletter",
    instagram: "Instagram",
    newsletterTitle: "Recent Posts",
    residentialMembersTitle: "House Residents",
    townMembersTitle: "Town Memberships",
    townMembershipRecruiting: "Town membership recruitment coming soon",
  }
} as const;

export default async function Home({ params: { lang } }: Props) {
  const t = content[lang as keyof typeof content];
  const guestbookTranslations = getGuestbookContent()[lang as 'ko' | 'en'];

  // Fetch members from Supabase
  const supabase = createClient();
  const { data: members, error } = await supabase
    .from('user_info')
    .select('*')
    .order('id'); // Fetch all columns, order by id or another relevant column

  if (error) {
    console.error('Error fetching members:', error);
    // Optionally, render an error message or fallback UI
  }

  // Ensure members is an array, default to empty if null/undefined or error
  const allMembers: UserInfo[] = members || [];

  // Filter members fetched from DB, excluding hidden ones and prepare lists
  const visibleMembers = allMembers.filter(member => !member.is_hidden);
  const currentMembers = visibleMembers; // Display all visible members in the first section
  const alumniMembers: UserInfo[] = []; // Keep the town members section empty

  return (
    <main className="flex min-h-screen flex-col bg-black">
      <Header currentLang={lang} />
      <div className="py-8 px-4 sm:px-8 max-w-screen-lg mx-auto pt-24">
        <div className="text-left text-yellow-200 flex flex-col gap-4 max-w-lg scroll-mt-32" id="about">
          <div>
            <h1 className="text-4xl font-normal">{t.title}</h1>
            <p className="text-sm opacity-80 mt-1">{t.location}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">{t.description1}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">{t.description2}</p>
          </div>

          {/* Social Links */}
          <div className="mt-4 text-white/50">
            <div className="flex gap-3">
              <Link 
                href="https://daejangang.substack.com/" 
                target="_blank"
                className="px-3 py-1 border border-white/50 text-sm hover:bg-white/90 hover:text-zinc-900 transition-colors flex items-center gap-1"
              >
                {t.newsletter}
                <ArrowTopRightIcon className="w-3 h-3" />
              </Link>
              <Link 
                href="https://www.instagram.com/daejangang_/" 
                target="_blank"
                className="px-3 py-1 border border-white/50 text-sm hover:bg-white/90 hover:text-zinc-900 transition-colors flex items-center gap-1"
              >
                {t.instagram}
                <ArrowTopRightIcon className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

         {/* Substack Feed Embed */}
         <div className="mt-16 scroll-mt-32" id="posts">
         <h2 className="text-2xl mb-4 text-yellow-200">{t.newsletterTitle}</h2>
            <SubstackFeed/>
          </div>

        {/* Residential Members Section */}
        <div className="mt-16 text-yellow-200 scroll-mt-32" id="members">
          <h2 className="text-2xl mb-4">{t.residentialMembersTitle}</h2>
          <MemberShuffle members={currentMembers} lang={lang} />
        </div>

        {/* Town Members Section - Combined Display Logic */}
        <div className="mt-16 text-yellow-200"> {/* Adjusted margin-top */}
          <h2 className="text-2xl mb-4">{t.townMembersTitle}</h2>
          {alumniMembers.length > 0 ? (
            <MemberShuffle members={alumniMembers} lang={lang} />
          ) : (
            <p className="text-white/70 text-center py-4">{t.townMembershipRecruiting}</p>
          )}
        </div>

        {/* Guestbook Section */}
        <div className="mt-24 scroll-mt-32" id="guestbook">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-white">{guestbookTranslations.title}</h2>
          </div>
          
          <GuestbookEntries 
            lang={lang as 'ko' | 'en'} 
            statusOptions={guestbookTranslations.statusOptions} 
            loadingText={guestbookTranslations.guestbookEntries.loading}
            errorText={guestbookTranslations.guestbookEntries.error}
          />
        </div>
      </div>

      {/* Footer with Logo */}
      <footer className="mt-auto py-8 flex flex-col gap-2 items-center justify-center">
        <Image 
          src="/image/logo-600-600.png"
          alt="Daejangang Logo"
          width={60}
          height={60}
          className="opacity-50"
        />
        <p className="text-sm opacity-30 text-center">
          This website is designed and published <br/>
          by Jong-Han of <Link href="https://cfp.han-park.info" target="_blank" className="underline">CFP & Co.</Link>
        </p>
      </footer>
    </main>
  );
}

export function generateStaticParams() {
  return [
    { lang: 'ko' },
    { lang: 'en' }
  ];
} 
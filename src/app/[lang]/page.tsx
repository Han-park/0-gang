import Image from "next/image";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MemberShuffle } from "@/components/MemberShuffle";
import { getMemberContent } from "@/data/members";

// Define type for language parameter
interface Props {
  params: {
    lang: string;
  };
}

// Content for each language
const content = {
  ko: {
    title: "창업가들의 집 '대장간'",
    location: "서울시 광진구, 대한민국",
    description1: "대장간은 1조 이상의 기업 가치를 만들 청년 창업가들이 모여 사는 공간이자 커뮤니티 플랫폼입니다. 2021년 서울 홍대에 만들어진 5AM Club House의 멤버들이 2023년 2월 시작했으며, 주로 IT 분야의 창업자 혹은 공동 창업자가 모여 있습니다.",
    description2: "현재 6명이 거주하며 매주 인사이트 세미나를 열고, 매달 액티비티를 진행하고 있습니다.",
    newsletter: "뉴스레터",
    instagram: "인스타그램",
    ...getMemberContent().ko,
  },
  en: {
    title: "Entrepreneurs' House, Daejang-gan",
    location: "Gwangjin-gu, Seoul, South Korea",
    description1: "Daejang-gan, which means a blacksmith house in korean, is a living space and community platform for young entrepreneurs aiming to build companies valued at over $1 billion. Started in February 2023 by members of the 5AM Club House in Hongdae, Seoul, it primarily consists of founders and co-founders in the tech industry.",
    description2: "Currently home to 6 residents, we hold weekly insight seminars and monthly activities.",
    newsletter: "Newsletter",
    instagram: "Instagram",
    ...getMemberContent().en,
  }
} as const;

export default function Home({ params: { lang } }: Props) {
  const t = content[lang as keyof typeof content];
  
  const currentMembers = t.members.filter(member => !member.isAlumni);
  const alumniMembers = t.members.filter(member => member.isAlumni);

  return (
    <main className="flex min-h-screen flex-col bg-black">
      <div className="py-8 px-8:sm px-4 max-w-screen-lg mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher currentLang={lang} />
        </div>
        <div className="text-left text-yellow-200 flex flex-col gap-4 max-w-lg">
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
          <div className="mt-4">
            <div className="flex gap-3">
              <Link 
                href="https://daejangang.substack.com/" 
                target="_blank"
                className="px-3 py-1 border text-opacity-80 border-yellow-200/80 text-sm hover:bg-yellow-200 hover:text-zinc-900 transition-colors flex items-center gap-1"
              >
                {t.newsletter}
                <ArrowTopRightIcon className="w-3 h-3" />
              </Link>
              <Link 
                href="https://www.instagram.com/daejangang_/" 
                target="_blank"
                className="px-3 py-1 border text-opacity-80 border-yellow-200/80 text-sm hover:bg-yellow-200 hover:text-zinc-900 transition-colors flex items-center gap-1"
              >
                {t.instagram}
                <ArrowTopRightIcon className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Current Members Section */}
        <div className="mt-28 text-yellow-200">
          <h2 className="text-2xl mb-4">{t.currentMembersTitle}</h2>
          <MemberShuffle members={currentMembers} lang={lang} />
        </div>

        {/* Alumni Members Section */}
        <div className="mt-24 text-yellow-200">
          <h2 className="text-2xl mb-4">{t.alumniMembersTitle}</h2>
          <MemberShuffle members={alumniMembers} lang={lang} />
        </div>
      </div>

      {/* Footer with Logo */}
      <footer className="mt-auto py-8 flex justify-center">
        <Image 
          src="/image/logo-600-600.png"
          alt="Daejangang Logo"
          width={60}
          height={60}
          className="opacity-50"
        />
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
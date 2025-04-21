import { Metadata } from 'next';
import { getGuestbookContent } from '@/data/guestbook';
import GuestbookForm from '@/components/GuestbookForm';

interface GuestbookSubmitPageProps {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: GuestbookSubmitPageProps): Promise<Metadata> {
  const lang = params.lang === 'ko' ? 'ko' : 'en';
  const content = getGuestbookContent();
  const translations = content[lang as keyof typeof content];
  
  return {
    title: `${translations.title} | Daejangang`,
    description: translations.subtitle,
  };
}

export default function GuestbookSubmitPage({ params }: GuestbookSubmitPageProps) {
  const lang = params.lang === 'ko' ? 'ko' : 'en';
  const content = getGuestbookContent();
  const translations = content[lang as keyof typeof content];
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <GuestbookForm translations={translations} defaultLang={lang as 'ko' | 'en'} />
    </div>
  );
} 
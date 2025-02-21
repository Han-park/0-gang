'use client';

import Image from "next/image";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface MemberProps {
  name: string;
  koreanName: string;
  role: string;
  company: string;
  imageUrl: string;
  linkedinUrl?: string;
  description: string;
  lang: string;
}

export function MemberCard({ name, koreanName, role, company, imageUrl, linkedinUrl, description, lang }: MemberProps) {
  const displayName = lang === 'ko' ? koreanName : name;

  return (
    <div className="border border-yellow-200/50 p-4 flex flex-col gap-4">
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${displayName}'s photo`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{displayName}</h3>
            <p className="text-sm text-yellow-200/60">{role} at {company}</p>
          </div>
        </div>
        <p className="text-sm text-yellow-200/80 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
} 
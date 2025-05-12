'use client';

import Image from "next/image";
import { useState } from "react";
import { MemberDialog } from "./MemberDialog";

// Define UserInfo type based on the database table
export interface UserInfo {
  id: number;
  name: string;
  korean_name: string;
  role: string;
  company: string; // Assuming this is English company name from context
  korean_company: string;
  image_url: string;
  sns_url?: string | null;
  description: string; // Assuming this is Korean description from context
  english_description: string;
  detail_content?: string | null;
  english_detail_content?: string | null;
  is_alumni: boolean;
  company_website_url?: string | null;
  is_hidden?: boolean | null; // Add the new column
}

interface MemberCardProps {
  member: UserInfo; // Use the new UserInfo type
  lang: string;
}

export function MemberCard({ member, lang }: MemberCardProps) { // Destructure member directly
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { name, korean_name, role, company, image_url, description, english_description } = member; // Use DB column names

  // Determine display name and description based on lang
  const displayName = lang === 'ko' ? korean_name : name;
  const displayDescription = lang === 'ko' ? description : english_description;
  const displayCompany = lang === 'ko' ? member.korean_company : company;

  return (
    <>
      <div
        className="border border-yellow-200/50 p-4 flex flex-col gap-4 cursor-pointer hover:border-yellow-200/80 transition-colors"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <Image
            src={image_url} // Use DB column name
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
              <p className="text-sm text-yellow-200/60">{role} at {displayCompany}</p>
            </div>
          </div>
          <p className="text-sm text-yellow-200/80 leading-relaxed">
            {displayDescription}
          </p>
        </div>
      </div>

      <MemberDialog
        member={member} // Pass the full member object
        lang={lang}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
} 
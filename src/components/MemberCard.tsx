'use client';

import Image from "next/image";
import { useState } from "react";
import { MemberDialog } from "./MemberDialog";
import { Member } from "@/data/members";  // Import Member type

interface MemberProps extends Member {  // Extend from Member type
  lang: string;
}

export function MemberCard(props: MemberProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { name, koreanName, role, company, imageUrl, description, lang } = props;
  const displayName = lang === 'ko' ? koreanName : name;

  return (
    <>
      <div 
        className="border border-yellow-200/50 p-4 flex flex-col gap-4 cursor-pointer hover:border-yellow-200/80 transition-colors"
        onClick={() => setIsDialogOpen(true)}
      >
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

      <MemberDialog
        member={props}
        lang={lang}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
} 
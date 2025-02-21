'use client';

import { Member } from "@/data/members";
import { MemberCard } from "./MemberCard";
import { useEffect, useState } from "react";

interface MemberShuffleProps {
  members: Member[];
  lang: string;
}

export function MemberShuffle({ members, lang }: MemberShuffleProps) {
  const [shuffledMembers, setShuffledMembers] = useState(members);

  useEffect(() => {
    // Shuffle members only on client side
    const shuffled = [...members].sort(() => Math.random() - 0.5);
    setShuffledMembers(shuffled);
  }, [members]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {shuffledMembers.map((member) => (
        <MemberCard
          key={member.imageUrl}
          {...member}
          lang={lang}
        />
      ))}
    </div>
  );
} 
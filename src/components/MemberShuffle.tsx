'use client';

// import { Member } from "@/data/members"; // Remove old import
import { MemberCard, UserInfo } from "./MemberCard"; // Import UserInfo
import { useEffect, useState } from "react";

interface MemberShuffleProps {
  members: UserInfo[]; // Use UserInfo type
  lang: string;
}

export function MemberShuffle({ members, lang }: MemberShuffleProps) {
  const [shuffledMembers, setShuffledMembers] = useState<UserInfo[]>(members); // Use UserInfo type for state

  useEffect(() => {
    // Shuffle members only on client side
    const shuffled = [...members].sort(() => Math.random() - 0.5);
    setShuffledMembers(shuffled);
  }, [members]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {shuffledMembers.map((member) => (
        <MemberCard
          key={member.id} // Use id from database as key
          member={member} // Pass the whole member object
          lang={lang}
        />
      ))}
    </div>
  );
} 
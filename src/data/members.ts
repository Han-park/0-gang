import fs from 'fs';
import path from 'path';

// Define member type
export interface Member {
  name: string;
  koreanName: string;
  role: string;
  company: string;
  imageUrl: string;
  linkedinUrl?: string;
  description: string;
  isAlumni: boolean;  // Add this field to distinguish current and alumni members
}

// Static member data
const memberData: Member[] = [
  {
    name: "Evan Gil",
    koreanName: "길상현",
    role: "CEO",
    company: "Company A",
    imageUrl: "/image/member/evan.jpg",
    description: "Description for member 1",
    isAlumni: false
  },
  {
    name: "Han Park",
    koreanName: "박종한",
    role: "CTO",
    company: "Company B",
    imageUrl: "/image/member/han.jpg",
    description: "Description for member 2",
    isAlumni: false
  },
  {
    name: "Seokbeom Hong",
    koreanName: "홍석범",
    role: "Founder",
    company: "Company C",
    imageUrl: "/image/member/seokbeom.jpg",
    description: "Description for member 3",
    isAlumni: false
  },
  {
    name: "Taehoon Kim",
    koreanName: "김태훈",
    role: "Founder",
    company: "Company C",
    imageUrl: "/image/member/taehoon.jpg",
    description: "Description for member 4",
    isAlumni: false
  },
  {
    name: "Tony Kim",
    koreanName: "김태영",
    role: "Founder",
    company: "Company C",
    imageUrl: "/image/member/tony.jpg",
    description: "Description for member 5",
    isAlumni: false
  },
  {
    name: "Hyun-mo Yu",
    koreanName: "유현모",
    role: "Founder",
    company: "Company C",
    imageUrl: "/image/member/tyron.jpg",
    description: "Description for member 6",
    isAlumni: false
  },
  {
    name: "Eubin Kim",
    koreanName: "김유빈",
    role: "Founder",
    company: "Company C",
    imageUrl: "/image/member/eubin.jpg",
    description: "Description for alumni 1",
    isAlumni: true
  },
  {
    name: "Gain Shin",
    koreanName: "신가인",
    role: "Founder",
    company: "Company C",
    imageUrl: "/image/member/gain.jpg",
    description: "Description for alumni 2",
    isAlumni: true
  },
  {
    name: "Hyeongang Jung",
    koreanName: "정현강",
    role: "Founder",
    company: "Company C",
    imageUrl: "/image/member/hyeongang.jpg",
    description: "Description for alumni 3",
    isAlumni: true
  },
  {
    name: "Ong",
    koreanName: "송홍기",
    role: "Founder",
    company: "Company C",
    imageUrl: "/image/member/ong.jpg",
    description: "Description for alumni 4",
    isAlumni: true
  },
  {
    name: "Yonguk Kwon",
    koreanName: "권용욱",
    role: "CEO",
    company: "Company D",
    imageUrl: "/image/member/yonguk.jpg",
    description: "Description for alumni 5",
    isAlumni: true
  }
];

// Korean translations for member descriptions
const koreanDescriptions: Record<string, string> = {
  "Evan Gil": "연쇄 창업가. 현재 AI 기반 B2B SaaS 스타트업 대표.",
  "Han Park": "소프트웨어 엔지니어. 현재 웹3 프로젝트 개발 중.",
  "Seokbeom Hong": "연쇄 창업가. 현재 AI 기반 B2B SaaS 스타트업 개발 중.",
  "Taehoon Kim": "연쇄 창업가. 현재 AI 기반 B2B SaaS 스타트업 개발 중.",
  "Tony Kim": "연쇄 창업가. 현재 AI 기반 B2B SaaS 스타트업 개발 중.",
  "Hyun-mo Yu": "연쇄 창업가. 현재 AI 기반 B2B SaaS 스타트업 개발 중.",
  "Eubin Kim": "연쇄 창업가. 현재 AI 기반 B2B SaaS 스타트업 개발 중.",
  "Gain Shin": "연쇄 창업가. 현재 AI 기반 B2B SaaS 스타트업 개발 중.",
  "Hyeongang Jung": "연쇄 창업가. 현재 AI 기반 B2B SaaS 스타트업 개발 중.",
  "Ong": "연쇄 창업가. 현재 AI 기반 B2B SaaS 스타트업 개발 중.",
  "Yonguk Kwon": "연쇄 창업가. 현재 AI 기반 B2B SaaS 스타트업 개발 중."
};

// Get member data with translations
export const getMemberContent = () => {
  return {
    ko: {
      currentMembersTitle: "멤버: 거주 중",
      alumniMembersTitle: "멤버: 알럼나이",
      members: memberData.map(member => ({
        ...member,
        description: koreanDescriptions[member.name] || member.description,
      })),
    },
    en: {
      currentMembersTitle: "Current House Members",
      alumniMembersTitle: "Alumni Members",
      members: memberData,
    },
  };
}; 
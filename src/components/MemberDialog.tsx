'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, ArrowTopRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { Member } from '@/data/members';

interface MemberDialogProps {
  member: Member;
  lang: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MemberDialog({ member, lang, isOpen, onClose }: MemberDialogProps) {
  const displayName = lang === 'ko' ? member.koreanName : member.name;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-[100]" />
        <Dialog.Content className="fixed border border-yellow-200/80 left-[50%] top-[50%] max-h-[85vh] w-[85vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] bg-black p-6 shadow-xl focus:outline-none overflow-y-auto z-[100]">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative aspect-[4/5] w-[200px] md:w-auto md:h-[200px] flex-shrink-0 overflow-hidden">
              <Image
                src={member.imageUrl}
                alt={`${displayName}'s photo`}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="space-y-4 flex-grow">
              <div>
                <h2 className="text-xl font-medium text-yellow-200">{displayName}</h2>
                <p className="text-sm text-yellow-200/60">{member.role} at {member.company}</p>
              </div>
              
              {member.detailContent ? (
                <div className="text-sm text-yellow-200/80 leading-relaxed whitespace-pre-wrap">
                  {member.detailContent}
                </div>
              ) : (
                <p className="text-sm text-yellow-200/80 leading-relaxed">
                  {member.description}
                </p>
              )}
              <div className="flex gap-2 pt-2">
              {member.snsUrl && (
                <div>
                  <Link
                    href={member.snsUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-sm text-yellow-200/60 hover:text-yellow-200 transition-colors"
                  >
                    SNS
                    <ArrowTopRightIcon className="w-3 h-3" />
                  </Link>
                </div>
              )}
              {member.companyWebsiteUrl && (
                <div>
                  <Link
                    href={member.companyWebsiteUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-sm text-yellow-200/60 hover:text-yellow-200 transition-colors"
                  >
                    Company Website
                    <ArrowTopRightIcon className="w-3 h-3" />
                  </Link>
                </div>
              )}
              </div>
            </div>
          </div>

          <Dialog.Close className="absolute right-4 top-4 text-yellow-200/80 hover:text-yellow-200">
            <Cross2Icon className="w-6 h-6" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 
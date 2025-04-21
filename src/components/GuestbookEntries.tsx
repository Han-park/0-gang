'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface GuestbookEntry {
  id: number;
  created_at: string;
  name_ko: string;
  name_en: string;
  'role-org_ko': string;
  'role-org_en': string;
  message_ko: string;
  message_en: string;
  selfie_url: string;
  status: string[];
  phone?: string;
  email?: string;
}

interface StatusOption {
  value: string;
  label: string;
  color: string;
}

interface GuestbookEntriesProps {
  lang: 'ko' | 'en';
  statusOptions: StatusOption[];
  loadingText: string;
  errorText: string;
}

export default function GuestbookEntries({ lang, statusOptions, loadingText, errorText }: GuestbookEntriesProps) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('guestbook')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setEntries(data || []);
      } catch (err) {
        console.error('Error fetching guestbook entries:', err);
        setError(errorText);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [errorText]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse font-medium text-gray-400">{loadingText}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400">No entries yet</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {entries.map(entry => {
        const name = lang === 'ko' ? entry.name_ko : entry.name_en;
        const roleOrg = lang === 'ko' ? entry['role-org_ko'] : entry['role-org_en'];
        const message = lang === 'ko' ? entry.message_ko : entry.message_en;
        
        return (
          <div key={entry.id} className="overflow-hidden text-white border border-gray-200/80">
            <div className="flex p-4">
              {entry.selfie_url && (
                <div className="flex-shrink-0 w-[160px]">
                  <img
                    src={entry.selfie_url}
                    alt={name}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}
              
              <div className='flex flex-col justify-between flex-grow px-6'>
                <div>
                  <div className="flex flex-wrap items-center mb-2">
                    <h3 className="text-base font-medium mr-3">{name}</h3>
                    {roleOrg && (
                      <span className="text-gray-400 text-sm">{roleOrg}</span>
                    )}
                  </div>
                  
                  {entry.status && entry.status.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {entry.status.map(statusValue => {
                        const option = statusOptions.find(opt => opt.value === statusValue);
                        return option ? (
                          <div 
                            key={statusValue}
                            className="px-1 py-0.5 rounded-sm text-xs inline-flex items-center border opacity-80"
                            style={{ color: option.color || '#f3f4f6', borderColor: option.color || '#f3f4f6' }}
                          >
                            {option.label}
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                  
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{message}</p>
                </div>
                
                <div className="mt-3 text-sm text-gray-500">
                  {new Date(entry.created_at).toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import CameraCapture from './CameraCapture';
import { translateText } from '@/lib/translation';

interface GuestbookFormProps {
  translations: {
    title: string;
    subtitle: string;
    selfieLabel: string;
    nameLabel: string;
    messageLabel: string;
    languageSelector: string;
    roleOrgLabel: string;
    statusLabel: string;
    contactLabel: {
      phone: string;
      email: string;
    };
    placeholders: {
      name: string;
      roleOrg: string;
      message: string;
      phone: string;
      email: string;
    };
    translationInfo: string;
    reviewLabel: string;
    translateButtonText: string;
    buttonText: {
      takePicture: string;
      retake: string;
      upload: string;
      submit: string;
      back: string;
      next: string;
    };
    languages: {
      ko: string;
      en: string;
    };
    statusOptions: StatusOption[];
    thankYouMessage: string;
    errorMessage: string;
  };
  defaultLang: 'ko' | 'en';
}

type FormStep = 'input' | 'review' | 'done';

interface StatusOption {
  value: string;
  label: string;
  color: string;
}

export default function GuestbookForm({ translations, defaultLang = 'en' }: GuestbookFormProps) {
  const router = useRouter();
  
  // Form state
  const [selectedLang, setSelectedLang] = useState<'ko' | 'en'>(defaultLang);
  const [otherLang, setOtherLang] = useState<'ko' | 'en'>(defaultLang === 'ko' ? 'en' : 'ko');
  const [step, setStep] = useState<FormStep>('input');
  
  // Primary language fields (user input)
  const [nameMain, setNameMain] = useState('');
  const [roleOrgMain, setRoleOrgMain] = useState('');
  const [messageMain, setMessageMain] = useState('');
  
  // Secondary language fields (translated)
  const [nameTranslated, setNameTranslated] = useState('');
  const [roleOrgTranslated, setRoleOrgTranslated] = useState('');
  const [messageTranslated, setMessageTranslated] = useState('');
  
  // Contact information
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  // Status multi-select
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  
  // Image
  const [imageUrl, setImageUrl] = useState('');
  
  // Form status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Translation trigger
  const [translationPending, setTranslationPending] = useState(false);
  
  // Get status options from translations
  const statusOptions = translations.statusOptions || [];
  
  const toggleStatus = (status: string) => {
    setSelectedStatuses(prevSelected => 
      prevSelected.includes(status)
        ? prevSelected.filter(s => s !== status)
        : [...prevSelected, status]
    );
  };
  
  const handleLanguageSelection = (lang: 'ko' | 'en') => {
    if (lang !== selectedLang) {
      // Redirect to the appropriate language URL
      router.push(`/${lang}/guestbook-submit`);
    }
  };
  
  const handleTranslation = async () => {
    if (!nameMain) return;
    
    setTranslationPending(true);
    
    try {
      // Translate name (required)
      const translatedName = await translateText(nameMain, otherLang);
      setNameTranslated(translatedName);
      
      // Translate role/org if provided
      if (roleOrgMain) {
        const translatedRoleOrg = await translateText(roleOrgMain, otherLang);
        setRoleOrgTranslated(translatedRoleOrg);
      }
      
      // Translate message (required)
      if (messageMain) {
        const translatedMessage = await translateText(messageMain, otherLang);
        setMessageTranslated(translatedMessage);
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setTranslationPending(false);
    }
  };
  
  const handleNext = async () => {
    if (step === 'input') {
      setStep('review');
      // Trigger translation when moving to review step
      await handleTranslation();
    }
  };
  
  const handleBack = () => {
    if (step === 'review') {
      setStep('input');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nameMain || !messageMain || !imageUrl) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Prepare data based on selected language
      const data: Record<string, any> = {
        // Use selfie_url instead of image_url based on the error message
        selfie_url: imageUrl,
        phone,
        email,
        participated_at: new Date().toISOString(),
        status: selectedStatuses
      };
      
      // Set the correct language fields
      if (selectedLang === 'ko') {
        data.name_ko = nameMain;
        data.name_en = nameTranslated;
        data['role-org_ko'] = roleOrgMain;
        data['role-org_en'] = roleOrgTranslated;
        data.message_ko = messageMain;
        data.message_en = messageTranslated;
      } else {
        data.name_en = nameMain;
        data.name_ko = nameTranslated;
        data['role-org_en'] = roleOrgMain;
        data['role-org_ko'] = roleOrgTranslated;
        data.message_en = messageMain;
        data.message_ko = messageTranslated;
      }
      
      // Insert into Supabase table
      const { error } = await supabase
        .from('guestbook')
        .insert([data]);
      
      if (error) throw error;
      
      // Reset form
      setNameMain('');
      setRoleOrgMain('');
      setMessageMain('');
      setNameTranslated('');
      setRoleOrgTranslated('');
      setMessageTranslated('');
      setPhone('');
      setEmail('');
      setImageUrl('');
      setSelectedStatuses([]);
      setStep('done');
      setSubmitStatus('success');
    } catch (err) {
      console.error('Error submitting entry:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (step === 'done' || submitStatus === 'success') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">✅</h2>
          <p className="text-lg text-gray-700 mb-4">{translations.thankYouMessage}</p>
          <a 
            href="/#guestbook" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            View Submitted Guestbook
          </a>
        </div>
      </div>
    );
  }
  
  if (step === 'input') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-black">
        <h1 className="text-2xl font-bold mb-2">{translations.title}</h1>
        <p className="text-gray-600 mb-6">{translations.subtitle}</p>
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-3 bg-red-100 text-red-800 rounded-md">
            {translations.errorMessage}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.languageSelector}
          </label>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => handleLanguageSelection('ko')}
              className={`p-3 border rounded-md flex items-center justify-center ${
                selectedLang === 'ko' 
                  ? 'border-blue-500 bg-blue-50 cursor-default' 
                  : 'border-gray-300 hover:bg-blue-50 hover:border-blue-500'
              }`}
              disabled={selectedLang === 'ko'}
            >
              <span className="text-base">🇰🇷 {translations.languages.ko}</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleLanguageSelection('en')}
              className={`p-3 border rounded-md flex items-center justify-center ${
                selectedLang === 'en' 
                  ? 'border-blue-500 bg-blue-50 cursor-default' 
                  : 'border-gray-300 hover:bg-blue-50 hover:border-blue-500'
              }`}
              disabled={selectedLang === 'en'}
            >
              <span className="text-base">🇺🇸 {translations.languages.en}</span>
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.selfieLabel}
          </label>
          
          {imageUrl ? (
            <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
              <img 
                src={imageUrl} 
                alt="Your selfie" 
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ) : (
            <CameraCapture 
              onCaptureComplete={setImageUrl}
              buttonText={{
                takePicture: translations.buttonText.takePicture,
                retake: translations.buttonText.retake,
                upload: translations.buttonText.upload
              }}
            />
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {translations.nameLabel}
          </label>
          <input
            type="text"
            id="name"
            value={nameMain}
            onChange={(e) => setNameMain(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            placeholder={translations.placeholders.name}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="role-org" className="block text-sm font-medium text-gray-700 mb-1">
            {translations.roleOrgLabel}
          </label>
          <input
            type="text"
            id="role-org"
            value={roleOrgMain}
            onChange={(e) => setRoleOrgMain(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            placeholder={translations.placeholders.roleOrg}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {translations.messageLabel}
          </label>
          <textarea
            id="message"
            value={messageMain}
            onChange={(e) => setMessageMain(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            placeholder={translations.placeholders.message}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            {translations.statusLabel}
          </label>
          <div className="relative">
            <div 
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-gray-800 bg-white cursor-pointer min-h-[42px]"
              onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
            >
              {selectedStatuses.length === 0 ? (
                <div className="text-gray-400">Find an option</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedStatuses.map(statusValue => {
                    const option = statusOptions.find(opt => opt.value === statusValue);
                    return option ? (
                      <div 
                        key={statusValue}
                        className="px-2 py-1 rounded-md text-sm flex items-center justify-center"
                        style={{ backgroundColor: option.color || '#f3f4f6' }}
                      >
                        <span className="mr-1">✓</span> {option.label}
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
            
            {statusDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10">
                {statusOptions.map((option) => (
                  <div 
                    key={option.value}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
                      selectedStatuses.includes(option.value) ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => toggleStatus(option.value)}
                    style={{ backgroundColor: option.color }}
                  >
                    {selectedStatuses.includes(option.value) && (
                      <span className="mr-2">✓</span>
                    )}
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          아래 내용은 대장간 커뮤니티 연락망을 구축하기 위해 활용되며, 외부로 공개되지 않습니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {translations.contactLabel.phone}
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              placeholder={translations.placeholders.phone}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {translations.contactLabel.email}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              placeholder={translations.placeholders.email}
            />
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleNext}
          disabled={!nameMain || !messageMain || !imageUrl}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:bg-blue-300"
        >
          {translations.buttonText.next}
        </button>
      </div>
    );
  }
  
  if (step === 'review') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">{translations.reviewLabel}</h1>
        <p className="text-gray-600 mb-6">{translations.translationInfo}</p>
        
        {translationPending && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
            Translating...
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border border-gray-300 rounded-md">
            <div className="mb-2 flex items-center justify-between">
              <div className="font-medium text-gray-700">
                {selectedLang === 'ko' ? '🇰🇷 한국어' : '🇺🇸 English'}
              </div>
              <div className="text-sm text-gray-500">Original</div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">{translations.nameLabel}</div>
              <div className="font-medium text-gray-700">{nameMain}</div>
            </div>
            
            {roleOrgMain && (
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">{translations.roleOrgLabel}</div>
                <div className="font-medium text-gray-700">{roleOrgMain}</div>
              </div>
            )}
            
            {selectedStatuses.length > 0 && (
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">{translations.statusLabel}</div>
                <div className="font-medium text-gray-700 flex flex-wrap gap-2">
                  {selectedStatuses.map(statusValue => {
                    const option = statusOptions.find(opt => opt.value === statusValue);
                    return option ? (
                      <div 
                        key={statusValue}
                        className="px-2 py-1 rounded-md text-sm flex items-center justify-center"
                        style={{ backgroundColor: option.color || '#f3f4f6' }}
                      >
                        <span className="mr-1">✓</span> {option.label}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
            
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">{translations.messageLabel}</div>
              <div className="font-medium text-gray-700 whitespace-pre-wrap">{messageMain}</div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-300 rounded-md">
            <div className="mb-2 flex items-center justify-between">
              <div className="font-medium">
                {otherLang === 'ko' ? '🇰🇷 한국어' : '🇺🇸 English'}
              </div>
              <div className="text-sm text-gray-500">Translated</div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">{translations.nameLabel}</div>
              <input
                type="text"
                value={nameTranslated}
                onChange={(e) => setNameTranslated(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                placeholder={translations.placeholders.name}
              />
            </div>
            
            {roleOrgMain && (
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">{translations.roleOrgLabel}</div>
                <input
                  type="text"
                  value={roleOrgTranslated}
                  onChange={(e) => setRoleOrgTranslated(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  placeholder={translations.placeholders.roleOrg}
                />
              </div>
            )}
            
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">{translations.messageLabel}</div>
              <textarea
                value={messageTranslated}
                onChange={(e) => setMessageTranslated(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                placeholder={translations.placeholders.message}
              />
            </div>
            
            <button
              type="button"
              onClick={handleTranslation}
              className="w-full mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={translationPending}
            >
              {translations.translateButtonText}
            </button>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
          >
            {translations.buttonText.back}
          </button>
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !nameMain || !messageMain || !imageUrl}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:bg-blue-300"
          >
            {isSubmitting ? 'Submitting...' : translations.buttonText.submit}
          </button>
        </div>
      </div>
    );
  }
  
  return null;
} 
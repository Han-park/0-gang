'use client';

import { useEffect } from 'react';

export function SubstackFeed() {
  useEffect(() => {
    // Load the Supascribe script
    const script = document.createElement('script');
    script.src = "https://js.supascribe.com/v1/loader/IZ7fq8GNuyYVFtmC3DRvQEL4nb23.js";
    script.async = true;
    document.body.appendChild(script);

    // Add custom styles for Supascribe feed
    const style = document.createElement('style');
    style.setAttribute('data-supascribe-custom-styles', 'true');
    style.textContent = `
      .supascribe-feed-widget {
        background-color: transparent !important;
      }
      .supascribe-widget .bg-gray-200,
      .supascribe-widget .bg-gray-50,
      .supascribe-widget .bg-white,
      .supascribe-widget .rounded,
      .supascribe-widget .rounded-lg,
      .supascribe-widget div[class*="bg-"] {
        background-color: transparent !important;
        border-radius: 0 !important;
      }
      .supascribe-widget .sfw-title,
      .supascribe-widget .sfw-title span,
      .supascribe-widget .text-gray-500,
      .supascribe-widget .text-xs,
      .supascribe-widget a,
      .supascribe-widget div,
      .supascribe-widget * {
        color: rgb(254, 240, 138) !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        font-weight: 400 !important;
      }
      .supascribe-widget .w-20,
      .supascribe-widget .md\\:w-\\[130px\\],
      .supascribe-widget .lg\\:w-\\[164px\\] {
        border-radius: 0 !important;
      }
      .supascribe-widget > div > a {
        border-bottom: 1px solid rgba(254, 240, 138, 0.2) !important;
        padding-bottom: 1rem !important;
        margin-bottom: 1rem !important;
      }
      .supascribe-widget > div > a:last-child {
        border-bottom: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // Remove custom styles
      const styleElement = document.querySelector('style[data-supascribe-custom-styles]');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div
      data-supascribe-embed-id="660245007149"
      data-supascribe-feed
      className='max-w-xl'
    />
  );
} 
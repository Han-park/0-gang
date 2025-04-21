'use client';

import { useEffect, useCallback } from 'react';

export function SubstackFeed() {
  // Function to add custom styles to Substack feed
  const addCustomStyles = useCallback(() => {
    const style = document.createElement('style');
    style.textContent = `
      #substack-feed-embed .w-20 {
        border-radius: 0px !important;
      }
       #substack-feed-embed .sfw-title {
        font-size: 1rem !important; 
        line-height: 1.25rem !important;
        font-weight: 400 !important; 
      }
      #substack-feed-embed .text-ellipsis {
        font-size: 0.875rem !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    // Configure the widget
    (window as any).SubstackFeedWidget = {
      substackUrl: "daejangang.substack.com",
      posts: 4,
      layout: "right",
      hidden: ["author"],
      colors: {
        primary: "#CBC06E",
        secondary: "#A29A58",
        background: "#000000",
      }
    };

    // Load the Substack script
    const script = document.createElement('script');
    script.src = "https://substackapi.com/embeds/feed.js";
    script.async = true;
    document.body.appendChild(script);
    
    // Apply custom styles after a short delay to ensure the feed is loaded
    setTimeout(addCustomStyles, 1000);

    return () => {
      // Cleanup
      document.body.removeChild(script);
      // Remove the style element if needed
      const styleElement = document.querySelector('style[data-substack-custom-styles]');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, [addCustomStyles]);

  return <div id="substack-feed-embed" />;
} 
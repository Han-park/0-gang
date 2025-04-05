'use client';

import { useEffect } from 'react';

export function SubstackFeed() {
  useEffect(() => {
    // Configure the widget
    (window as any).SubstackFeedWidget = {
      substackUrl: "daejangang.substack.com",
      posts: 4,
      layout: "center",
      hidden: ["author"],
      colors: {
        primary: "#FFFFFF",
        secondary: "#B2B2B2",
        background: "#000000",
      }
    };

    // Load the Substack script
    const script = document.createElement('script');
    script.src = "https://substackapi.com/embeds/feed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return <div id="substack-feed-embed" />;
} 
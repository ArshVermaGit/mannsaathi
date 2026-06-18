"use client";

import React, { useEffect, useState } from 'react';

interface LiveRegionProps {
  message: string;
}

export default function LiveRegion({ message }: LiveRegionProps) {
  const [announcedMessage, setAnnouncedMessage] = useState(message);

  useEffect(() => {
    // A small delay ensures screen readers pick up the change
    const timeout = setTimeout(() => setAnnouncedMessage(message), 50);
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div 
      role="status" 
      aria-live="polite" 
      aria-atomic="true"
      className="sr-only"
    >
      {announcedMessage}
    </div>
  );
}

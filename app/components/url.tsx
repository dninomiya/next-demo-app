'use client';

import { Copy } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function URL({ petId }: { petId: string }) {
  const [url, setURL] = useState<string>();

  useEffect(() => {
    setURL(window.origin);
  }, []);

  if (!url) {
    return null;
  }

  return (
    <button className="text-gray-600 ml-auto flex items-center mb-2">
      {url}/{petId}
      <Copy size={20} className="ml-2" />
    </button>
  );
}

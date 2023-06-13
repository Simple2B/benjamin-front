'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { OpenAPI } from '@/openapi';
import screenfull from 'screenfull';
// import FullScreen from 'react-fullscreen-crossbrowser';

interface IProviders {
  children: React.ReactNode;
}

export default function Providers({ children }: IProviders) {
  const [queryClient] = useState(() => new QueryClient());
  const pageRef = useRef<HTMLDivElement | null>(null);
  // const [isFullScreen, setFullScreen] = useState<boolean>(false);

  useEffect(() => {
    if (!pageRef.current) {
      return;
    }
    const page = pageRef.current;
    page.addEventListener('click', () => {
      if (screenfull.isEnabled) {
        screenfull.request();
      }
    });
  });

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div ref={pageRef}>{children}</div>
      </QueryClientProvider>
    </div>
  );
}

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { OpenAPI } from '@/openapi';
// import screenfull from 'screenfull';
import FullScreen from 'react-fullscreen-crossbrowser';

OpenAPI.BASE = process.env.BACKEND_URL || '';

interface IProviders {
  children: React.ReactNode;
}

export default function Providers({ children }: IProviders) {
  const [queryClient] = useState(() => new QueryClient());
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [isFullScreen, setFullScreen] = useState<boolean>(false);

  useEffect(() => {
    if (!pageRef.current) {
      return;
    }
    const page = pageRef.current;
    page.addEventListener('click', () => {
      setFullScreen(true);
    });
  });

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <FullScreen enabled={isFullScreen}>
          <div ref={pageRef}>{children}</div>
        </FullScreen>
      </QueryClientProvider>
    </div>
  );
}

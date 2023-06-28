'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { OpenAPI } from '@/openapi';
import screenfull from 'screenfull';
import { ICONS_NAME } from '@/components/constants/iconName';
import IconButton from '@/components/IconButton';
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
    document.getElementById('fullscreen')?.addEventListener('click', () => {
      if (screenfull.isEnabled) {
        screenfull.request();
      }
    });
  });

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div ref={pageRef}>
          <div
            className={`fixed z-[100] flex justify-end right-0`}
            id={'fullscreen'}
          >
            <IconButton iconName={ICONS_NAME.fullscreen} className="w-9 h-9" />
          </div>
          {children}
        </div>
      </QueryClientProvider>
    </div>
  );
}

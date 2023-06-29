'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef, useState } from 'react';

interface IProviders {
  children: React.ReactNode;
}

export default function Providers({ children }: IProviders) {
  const [queryClient] = useState(() => new QueryClient());
  const pageRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div ref={pageRef}>{children}</div>
      </QueryClientProvider>
    </div>
  );
}

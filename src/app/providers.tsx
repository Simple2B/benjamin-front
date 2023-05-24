'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { OpenAPI } from '@/openapi';

OpenAPI.BASE = process.env.BACKEND_URL || '';

interface IProviders {
  children: React.ReactNode;
}

export default function Providers({ children }: IProviders) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

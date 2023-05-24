import Providers from './providers';
import './globals.css';
import { OpenAPI } from '@/openapi';

OpenAPI.BASE = process.env.BACKEND_URL || '';

interface IRootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

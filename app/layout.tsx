import type {Metadata} from 'next';
import { Tajawal } from 'next/font/google';
import './globals.css'; // Global styles

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  title: 'عروضك الترويجية',
  description: 'إدارة العروض الترويجية',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-tajawal antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}

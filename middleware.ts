import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // শুধুমাত্র /admin রাউটগুলোর জন্য চেক করবে
  if (path.startsWith('/admin')) {
    // কাস্টম লগইন টোকেন এবং NextAuth টোকেন চেক করা হচ্ছে
    const customToken = request.cookies.get('token')?.value;
    const nextAuthToken = request.cookies.get('next-auth.session-token')?.value || request.cookies.get('__Secure-next-auth.session-token')?.value;

    // যদি কোনো টোকেন না থাকে, তবে সরাসরি লগইন পেজে পাঠিয়ে দেবে
    if (!customToken && !nextAuthToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// কোন কোন লিংকের জন্য মিডলওয়্যার কাজ করবে তা এখানে বলা আছে
export const config = {
  matcher: ['/admin/:path*'],
};
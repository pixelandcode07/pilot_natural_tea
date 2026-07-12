import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0A1E11] text-[#E8DFC8] pt-16 pb-6 border-t-[4px] border-[#1E5E3A]">
      {/* 1920x1080 ডিসপ্লের জন্য ন্যাভবার ও অন্যান্য সেকশনের সাথে হুবহু অ্যালাইমেন্ট (lg:px-[150px]) */}
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
        
        {/* ========================================= */}
        {/* Top 4 Columns: Info, Links, Contact */}
        {/* ========================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-10">
          
          {/* ১. Brand Info Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group inline-flex">
              <div className="relative w-10 h-10 flex items-center justify-center p-1 rounded-full">
                <Image
                  src="/favicons/android-chrome-512x512.png" 
                  alt="Pilot Natural Tea Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-sans text-2xl font-bold tracking-tight text-white">
                Pilot <span className="font-light text-[#C6FF36]">Tea</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs pt-2">
              ১০০% খাঁটি ও প্রাকৃতিক চা এবং মধু সরাসরি বাগান ও খামার থেকে আপনার দোরগোড়ায়। সুস্থতা আর স্বাদের এক অনন্য প্রতিশ্রুতি।
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="w-8 h-8 rounded-full bg-[#133821] flex items-center justify-center text-white hover:bg-[#C6FF36] hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-[#133821] flex items-center justify-center text-white hover:bg-[#C6FF36] hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-[#133821] flex items-center justify-center text-white hover:bg-[#C6FF36] hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </Link>
            </div>
          </div>

          {/* ২. Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="#about" className="hover:text-[#C6FF36] transition-colors">About Us</Link></li>
              <li><Link href="#shop" className="hover:text-[#C6FF36] transition-colors">Our Shop</Link></li>
              <li><Link href="#blogs" className="hover:text-[#C6FF36] transition-colors">Read Blogs</Link></li>
              <li><Link href="#privacy" className="hover:text-[#C6FF36] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#terms" className="hover:text-[#C6FF36] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* ৩. Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="#green-tea" className="hover:text-[#C6FF36] transition-colors">Premium Green Tea</Link></li>
              <li><Link href="#black-tea" className="hover:text-[#C6FF36] transition-colors">Sylhet Black Tea</Link></li>
              <li><Link href="#honey" className="hover:text-[#C6FF36] transition-colors">Natural Honey</Link></li>
              <li><Link href="#combos" className="hover:text-[#C6FF36] transition-colors">Exclusive Combos</Link></li>
              <li><Link href="#gifts" className="hover:text-[#C6FF36] transition-colors">Gift Boxes</Link></li>
            </ul>
          </div>

          {/* ৪. Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#C6FF36] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>Sreemangal, Sylhet,<br/>Bangladesh - 3210</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#C6FF36] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>+880 1712-345678</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#C6FF36] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>support@pilotnaturaltea.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ========================================= */}
        {/* Bottom Bar: Copyright & Payment Methods */}
        {/* ========================================= */}
        <div className="border-t border-[#133821] pt-8 mt-4 flex flex-col xl:flex-row items-center justify-between gap-6">
          
          {/* Left: Copyright & Developer Info */}
          <div className="flex flex-col gap-1.5 text-gray-400 text-xs sm:text-sm text-center xl:text-left">
            <p>Copyright &copy; {new Date().getFullYear()} Pilot Natural Tea. All Rights Reserved.</p>
            <p>
              Design and Develop by{" "}
              <a 
                href="https://pixelandcode.agency" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#C6FF36] font-medium hover:underline hover:text-white transition-colors"
              >
                Pixel & Code
              </a>
            </p>
          </div>

          {/* Right: Payment Methods Image */}
          <div className="w-full xl:w-auto max-w-3xl flex items-center justify-center xl:justify-end bg-white/95 rounded-xl p-2 sm:p-3 shadow-md">
             <Image
              src="/paymentMethod.png" 
              alt="Secure Payment Methods by SSLCOMMERZ"
              width={800}
              height={80}
              className="w-full h-auto object-contain max-h-[50px] sm:max-h-[60px]"
              sizes="(max-w-768px) 100vw, 800px"
            />
          </div>

        </div>

      </div>
    </footer>
  );
}
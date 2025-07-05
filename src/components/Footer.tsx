'use client';
import React, { useRef } from 'react';
import { Heart, Mail, MapPin, Instagram } from 'lucide-react';

const Footer = () => {
  // 长按跳转逻辑
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      window.location.href = '/admin/login';
    }, 3000);
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <footer className="bg-gradient-to-br from-kawaii-yellow/30 to-kawaii-blue/30 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-kawaii-reverse rounded-full flex items-center justify-center shadow-kawaii hover-wobble">
                <Heart className="w-8 h-8 text-gray-700" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient-kawaii font-fredoka">
                  Happy Beans
                </h1>
                <p className="text-base text-gray-600 font-noto-jp">福豆</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-8 leading-relaxed text-lg font-poppins">
              Bringing pure joy through beautiful Japanese-Korean kawaii treasures. 
              Every product is selected with love to add happiness and cuteness to your daily life! ✨
            </p>
            

          </div>

          {/* Quick Links */}
          <div className="bg-kawaii-yellow/20 p-8 rounded-3xl shadow-kawaii">
            <h3 className="font-bold text-gray-800 mb-6 text-xl font-fredoka">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-700 hover:text-gray-900 transition-colors font-quicksand hover-wobble">🏠 Home</a></li>
              <li><a href="#products" className="text-gray-700 hover:text-gray-900 transition-colors font-quicksand hover-wobble">🛍️ Products</a></li>
              <li><a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors font-quicksand hover-wobble">🌟 About Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-kawaii-blue/20 p-8 rounded-3xl shadow-kawaii">
            <h3 className="font-bold text-gray-800 mb-6 text-xl font-fredoka">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-kawaii-yellow/40 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-gray-700 font-poppins">hello@happybeans.com</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-kawaii-blue/40 rounded-full flex items-center justify-center">
                  <span className="text-lg">💬</span>
                </div>
                <span className="text-gray-700 font-poppins">微信号：happybeansyyds</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-kawaii-pink/40 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-700" />
                </div>
                <a 
                  href="https://www.google.com/maps/place/Happy+Beans/@49.1844064,-123.1407063,17z/data=!3m2!4b1!5s0x5486752f4d351c77:0x659b4d5192ac8c7!4m6!3m5!1s0x5486758ca800ce6b:0x450dec1aeb5326e1!8m2!3d49.184403!4d-123.13583!16s%2Fg%2F11l_2w8skm?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 font-poppins hover:text-gray-900 transition-colors hover-wobble"
                >
                  4000 Number 3 Rd #2185, Richmond, BC V6X 0J8
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="font-bold text-gray-800 mb-4 font-fredoka">Follow Our Kawaii Journey</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/happy_beans2023/?igsh=b3lxNTRra2RsMDRm&utm_source=qr#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white hover:shadow-kawaii-hover transition-all duration-300 hover:scale-110 hover-wobble"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-white/30 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div
              className="text-gray-700 text-lg font-poppins select-none"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
            >
              © 2024 Happy Beans (福豆). Made with <Heart className="w-5 h-5 inline text-red-500 fill-current animate-pulse-gentle" /> for kawaii lovers worldwide.
            </div>
            
            <div className="flex space-x-8 text-gray-700 font-quicksand">
              <a href="#" className="hover:text-gray-900 transition-colors hover-wobble">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition-colors hover-wobble">Terms of Service</a>
              <a href="#" className="hover:text-gray-900 transition-colors hover-wobble">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";
import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const heroImages = ['/HeroB/hero1.png', '/HeroB/hero2.png', '/HeroB/hero3.png'];

const HeroSection = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 每5秒切换一次
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-sky-200 via-yellow-50 to-sky-100 py-24 min-h-screen flex items-center">
      {/* 背景轮播图片层 */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        {heroImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-2000
              ${bgIndex === idx ? 'opacity-30' : 'opacity-0'}
            `}
            style={{ transitionProperty: 'opacity' }}
            draggable={false}
          />
        ))}
      </div>
      {/* Floating kawaii elements */}
      <div className="absolute top-16 left-16 w-6 h-6 bg-kawaii-pink rounded-full animate-float stagger-1 shadow-bubble"></div>
      <div className="absolute top-32 right-20 w-8 h-8 bg-kawaii-mint rounded-full animate-bounce-cute stagger-2 shadow-bubble"></div>
      <div className="absolute bottom-32 left-24 w-5 h-5 bg-kawaii-peach rounded-full animate-float stagger-3 shadow-bubble"></div>
      <div className="absolute top-48 left-1/3 w-4 h-4 bg-kawaii-lavender rounded-full animate-pulse-gentle stagger-4 shadow-bubble"></div>
      <div className="absolute bottom-48 right-1/3 w-7 h-7 bg-kawaii-blue rounded-full animate-bounce-cute stagger-5 shadow-bubble"></div>
      
      {/* Bean icons */}
      <div className="absolute top-24 right-1/4 text-4xl animate-float stagger-2">🫘</div>
      <div className="absolute bottom-24 left-1/4 text-5xl animate-bounce-cute stagger-4">💛</div>
      <div className="absolute top-1/3 left-16 text-3xl animate-pulse-gentle stagger-6">💙</div>
      <div className="absolute bottom-1/3 right-16 text-4xl animate-float stagger-1">✨</div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main heading with staggered animation */}
          <div className="mb-8 animate-slide-up">
            <div className="inline-flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-bubble mb-6 animate-bounce-cute">
              <Sparkles className="w-5 h-5 text-kawaii-blue" />
              <span className="text-base font-medium text-kawaii-blue font-cute">New Kawaii Collection Available</span>
              <Sparkles className="w-5 h-5 text-kawaii-yellow" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-cute mb-6 text-kawaii-yellow drop-shadow-lg animate-bounce-cute">
              Happy Beans
              <br />
              <span className="text-4xl md:text-5xl font-cute text-kawaii-blue tracking-wider">福豆ブティック</span>
            </h1>
          </div>

          {/* Subtitle with staggered animation */}
          <p className="text-2xl md:text-3xl text-kawaii-pink mb-12 max-w-3xl mx-auto leading-relaxed font-cute animate-fade-in-stagger stagger-2">
            Discover adorable Japanese-Korean inspired treasures that spark joy in every moment ✨🌸
          </p>

          {/* CTA Buttons with staggered animation */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-stagger stagger-3">
            <button className="group bg-gradient-kawaii text-gray-800 font-semibold py-4 px-10 rounded-full shadow-bubble hover:shadow-bubble-hover transform transition-all duration-300 hover:scale-105 hover:animate-bounce-cute text-xl flex items-center space-x-3 font-potta">
              <span>Browse Products</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="bg-white/70 backdrop-blur-sm border-3 border-kawaii-blue text-gray-700 px-10 py-4 rounded-full font-semibold text-xl shadow-bubble hover:bg-kawaii-blue hover:text-white transition-all duration-300 hover:scale-105 font-comic hover-wobble">
              Our Story
            </button>
          </div>

          {/* Feature highlights with staggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-bubble hover:shadow-bubble-hover transition-all duration-500 hover-kawaii animate-fade-in-stagger stagger-4">
              <div className="w-16 h-16 bg-kawaii-yellow/30 rounded-full flex items-center justify-center mb-6 mx-auto animate-bounce-cute">
                <span className="text-4xl">🌸</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-3 text-xl font-potta">Handpicked Treasures</h3>
              <p className="text-gray-600 font-mplus">Carefully curated with love and kawaii spirit</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-bubble hover:shadow-bubble-hover transition-all duration-500 hover-kawaii animate-fade-in-stagger stagger-5">
              <div className="w-16 h-16 bg-kawaii-blue/30 rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse-gentle">
                <span className="text-4xl">💝</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-3 text-xl font-potta">Unique Kawaii Designs</h3>
              <p className="text-gray-600 font-mplus">One-of-a-kind adorable finds</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-bubble hover:shadow-bubble-hover transition-all duration-500 hover-kawaii animate-fade-in-stagger stagger-6">
              <div className="w-16 h-16 bg-kawaii-pink/30 rounded-full flex items-center justify-center mb-6 mx-auto animate-float">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-3 text-xl font-potta">Authentic Culture</h3>
              <p className="text-gray-600 font-mplus">Pure Japanese-Korean charm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

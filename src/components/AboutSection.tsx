
import React from 'react';
import Image from 'next/image';
import { Heart, Users, Award, Smile } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every item is carefully selected with passion and kawaii spirit",
      color: "bg-kawaii-pink/30"
    },
    {
      icon: Users,
      title: "Kawaii Community",
      description: "Building connections through shared love of Japanese-Korean culture",
      color: "bg-kawaii-blue/30"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Authentic materials and craftsmanship in every adorable product",
      color: "bg-kawaii-mint/30"
    },
    {
      icon: Smile,
      title: "Spread Joy",
      description: "Our mission is to bring happiness to your everyday kawaii moments",
      color: "bg-kawaii-yellow/30"
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-kawaii-pink/20 via-kawaii-lavender/20 to-kawaii-mint/20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-kawaii mb-8 animate-pulse-gentle">
                <span className="text-3xl">🌟</span>
                <span className="text-base font-medium text-gray-700 font-comfortaa">About Happy Beans</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 font-fredoka">
                Bringing <span className="text-gradient-kawaii">Kawaii</span> Culture to Life
              </h2>
              
              <div className="space-y-6 text-gray-700 text-xl leading-relaxed mb-10 font-poppins">
                <p>
                  Welcome to Happy Beans (福豆), where East meets pure joy! We're passionate about sharing 
                  the beautiful, kawaii world of Japanese and Korean culture through carefully curated items 
                  that spark happiness and wonder in every heart. ✨
                </p>
                <p>
                  From traditional tea ceremony treasures to modern kawaii accessories, each product 
                  in our collection tells a story of craftsmanship, culture, and the simple joy of 
                  beautiful, adorable things. 🌸
                </p>
                <p>
                  Our name &quot;福豆&quot; (Happy Beans) represents good fortune and prosperity - values we 
                  hope to share with every customer who becomes part of our kawaii family! 💕
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mb-10">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-2 font-fredoka">500+</div>
                  <div className="text-base text-gray-600 font-quicksand">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-2 font-fredoka">100+</div>
                  <div className="text-base text-gray-600 font-quicksand">Kawaii Products</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-2 font-fredoka">2+</div>
                  <div className="text-base text-gray-600 font-quicksand">Years of Joy</div>
                </div>
              </div>
            </div>

            {/* Right Content - Mascot */}
            <div className="relative animate-slide-up">
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-kawaii hover:shadow-kawaii-hover transition-all duration-500">
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto mb-8 bg-gradient-kawaii rounded-full flex items-center justify-center shadow-kawaii animate-bounce-soft overflow-hidden relative">
                    <Image 
                      src="/images/home_about_img.png" 
                      alt="Happy Beans About" 
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4 font-fredoka">
                    Welcome to Happy Beans
                  </h3>
                  <p className="text-gray-600 text-lg font-poppins">
                    Discover the wonderful kawaii world of carefully curated Japanese and Korean treasures! 🌟
                  </p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-10 h-10 bg-kawaii-yellow rounded-full animate-float shadow-kawaii"></div>
              <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-kawaii-blue rounded-full animate-bounce-soft shadow-kawaii"></div>
              <div className="absolute top-1/3 -left-4 text-4xl animate-pulse-gentle">💖</div>
              <div className="absolute bottom-1/3 -right-4 text-3xl animate-float">✨</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-kawaii hover:shadow-kawaii-hover transition-all duration-500 text-center hover-kawaii animate-fade-in-stagger"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={`w-20 h-20 ${feature.color} rounded-full flex items-center justify-center mb-6 mx-auto shadow-kawaii animate-pulse-gentle`}>
                    <IconComponent className="w-10 h-10 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 font-fredoka">{feature.title}</h3>
                  <p className="text-gray-600 font-poppins leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

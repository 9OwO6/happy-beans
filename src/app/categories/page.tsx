'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  bgPattern: string;
  productCount: number;
  featuredProducts: string[];
  animation: string;
  specialEffect: string;
}

const CategoriesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories: Category[] = [
    {
      id: 'trendy-decor',
      name: '潮流摆件',
      description: '精选时尚潮流摆件，为你的空间增添独特魅力',
      icon: '🎨',
      color: '#FF6B9D',
      gradient: 'from-pink-400 via-purple-500 to-indigo-500',
      bgPattern: 'radial-gradient(circle at 20% 80%, rgba(255, 107, 157, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
      productCount: 24,
      featuredProducts: ['潮流艺术画', '现代雕塑', '创意装饰品'],
      animation: 'shimmer-effect',
      specialEffect: 'sparkle'
    },
    {
      id: 'fashion-wear',
      name: '衣帽穿搭',
      description: '时尚服饰与配饰，展现你的个性风格',
      icon: '👗',
      color: '#4ECDC4',
      gradient: 'from-teal-400 via-cyan-500 to-blue-500',
      bgPattern: 'linear-gradient(45deg, rgba(78, 205, 196, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(78, 205, 196, 0.1) 25%, transparent 25%)',
      productCount: 36,
      featuredProducts: ['时尚外套', '潮流帽子', '个性配饰'],
      animation: 'animate-gentle-shake',
      specialEffect: 'wave'
    },
    {
      id: 'practical-goods',
      name: '实用好物',
      description: '精选实用生活用品，让生活更加便利美好',
      icon: '🛠️',
      color: '#45B7D1',
      gradient: 'from-blue-400 via-indigo-500 to-purple-500',
      bgPattern: 'repeating-linear-gradient(45deg, rgba(69, 183, 209, 0.1) 0px, rgba(69, 183, 209, 0.1) 2px, transparent 2px, transparent 8px)',
      productCount: 42,
      featuredProducts: ['生活用品', '厨房用具', '收纳整理'],
      animation: 'animate-breathe',
      specialEffect: 'glow'
    },
    {
      id: 'beauty-supplies',
      name: '颜值补给',
      description: '美妆护肤精选，让你由内而外散发魅力',
      icon: '💄',
      color: '#FF8E53',
      gradient: 'from-orange-400 via-red-500 to-pink-500',
      bgPattern: 'radial-gradient(circle at 50% 50%, rgba(255, 142, 83, 0.1) 0%, transparent 70%)',
      productCount: 28,
      featuredProducts: ['护肤套装', '彩妆系列', '香水香氛'],
      animation: 'animate-float',
      specialEffect: 'shimmer'
    },
    {
      id: 'festival-special',
      name: '节日精选',
      description: '节日主题商品，为每个特殊时刻增添欢乐',
      icon: '🎉',
      color: '#FFD93D',
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      bgPattern: 'radial-gradient(circle at 25% 25%, rgba(255, 217, 61, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 142, 83, 0.1) 0%, transparent 50%)',
      productCount: 18,
      featuredProducts: ['圣诞装饰', '新年礼物', '生日派对'],
      animation: 'animate-confetti-pop',
      specialEffect: 'confetti'
    },
    {
      id: 'anime-shop',
      name: '次元小铺',
      description: '二次元周边商品，带你进入动漫世界',
      icon: '🎭',
      color: '#A8E6CF',
      gradient: 'from-green-400 via-emerald-500 to-teal-500',
      bgPattern: 'linear-gradient(90deg, rgba(168, 230, 207, 0.1) 0px, transparent 1px), linear-gradient(0deg, rgba(168, 230, 207, 0.1) 0px, transparent 1px)',
      productCount: 31,
      featuredProducts: ['动漫手办', '周边商品', 'cosplay道具'],
      animation: 'animate-neon-pulse',
      specialEffect: 'neon'
    },
    {
      id: 'useless-beauty',
      name: '无用之美',
      description: '那些看似无用却充满美感的艺术品',
      icon: '🌸',
      color: '#FFB6B9',
      gradient: 'from-pink-300 via-rose-400 to-red-400',
      bgPattern: 'radial-gradient(circle at 30% 70%, rgba(255, 182, 185, 0.1) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(251, 113, 133, 0.1) 0%, transparent 60%)',
      productCount: 15,
      featuredProducts: ['艺术装置', '创意摆件', '手工制品'],
      animation: 'animate-focus-blur',
      specialEffect: 'petals'
    }
  ];

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    // 跳转到具体的分类页面
    window.location.href = `/categories/${category.id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5BA] via-[#A5D8FA] to-[#FFD6E0] relative overflow-hidden">
      {/* 动态背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 浮动几何图形 */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#FFB6B9]/20 to-[#A5D8FA]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#A5D8FA]/30 to-[#FFD6E0]/30 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-[#FFD6E0]/25 to-[#FFF5BA]/25 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-gradient-to-br from-[#FFF5BA]/40 to-[#FFB6B9]/40 rounded-full blur-md animate-bounce"></div>
        
        {/* 动态粒子效果 */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#FFB6B9] rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-[#A5D8FA] rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-[#FFD6E0] rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        
        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFB6B9 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <Header />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-7xl font-heading-cute font-extrabold text-black drop-shadow-lg mb-6 tracking-wide relative">
                商品分类
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-[#FFB6B9] to-[#A5D8FA] rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-[#FFD6E0] to-[#FFF5BA] rounded-full animate-sparkle"></div>
              </h1>
              <p className="text-2xl font-body-cute text-gray-600 mb-8 drop-shadow-sm max-w-3xl mx-auto leading-relaxed">
                探索我们精心策划的商品分类，每个主题都有独特的魅力和惊喜
              </p>
            </div>
          </div>
        </section>

        {/* 分类网格 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className={`relative group cursor-pointer transition-all duration-700 hover:scale-105 hover:shadow-2xl ripple-effect ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    background: category.bgPattern
                  }}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => handleCategoryClick(category)}
                >
                  {/* 主卡片 */}
                  <div className="relative bg-white/90 rounded-3xl p-8 shadow-lg backdrop-blur-sm border border-white/20 overflow-hidden">
                    {/* 装饰背景 */}
                    <div className="absolute inset-0 opacity-10" style={{background: category.bgPattern}}></div>
                    
                    {/* 特殊装饰效果 */}
                    {category.id === 'trendy-decor' && (
                      <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-ping opacity-60"></div>
                    )}
                    {category.id === 'fashion-wear' && (
                      <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full animate-pulse"></div>
                    )}
                    {category.id === 'practical-goods' && (
                      <div className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-breathe opacity-40"></div>
                    )}
                    {category.id === 'beauty-supplies' && (
                      <div className="absolute bottom-6 right-6 w-3 h-3 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-float"></div>
                    )}
                    {category.id === 'festival-special' && (
                      <>
                        <div className="absolute top-2 left-2 text-yellow-400 text-sm animate-confetti-pop">✨</div>
                        <div className="absolute bottom-2 right-2 text-orange-400 text-sm animate-confetti-pop" style={{animationDelay: '0.3s'}}>🎊</div>
                      </>
                    )}
                    {category.id === 'anime-shop' && (
                      <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-neon-pulse"></div>
                    )}
                    {category.id === 'useless-beauty' && (
                      <div className="absolute bottom-3 left-3 text-pink-300 text-lg animate-float">🌸</div>
                    )}
                    
                    {/* 图片和横线区域 */}
                    <div className="relative z-10 text-center mb-6">
                      {/* 分类图片区域 */}
                      <div className={`w-32 h-24 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 mb-4 ${category.animation} ${category.id === 'fashion-wear' ? 'group-hover:animate-gentle-shake' : ''} ${category.id === 'practical-goods' ? 'animate-breathe' : ''} ${category.id === 'beauty-supplies' ? 'animate-float' : ''} ${category.id === 'anime-shop' ? 'animate-neon-pulse' : ''} ${category.id === 'useless-beauty' ? 'group-hover:animate-focus-blur' : ''} overflow-hidden`}>
                        {/* 尝试加载图片，如果失败则显示图标 */}
                        <img 
                          src={`/images/categories/${category.id}.jpg`}
                          alt={category.name}
                          className="w-full h-full object-cover rounded-2xl transition-all duration-300 group-hover:scale-110"
                          onError={(e) => {
                            // 图片加载失败时隐藏图片，显示图标
                            e.currentTarget.style.display = 'none';
                            const iconElement = e.currentTarget.nextElementSibling as HTMLElement;
                            if (iconElement) {
                              iconElement.style.display = 'flex';
                            }
                          }}
                        />
                        {/* 图标作为备用显示 */}
                        <div className="text-3xl opacity-60 hidden">{category.icon}</div>
                      </div>
                      
                      {/* 装饰横线 */}
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-gray-400 rounded-full transition-all duration-300 group-hover:w-12"></div>
                        <div className="w-12 h-1 bg-gradient-to-r ${category.gradient} rounded-full shadow-sm transition-all duration-300 group-hover:w-16 group-hover:h-1.5"></div>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-gray-400 to-transparent rounded-full transition-all duration-300 group-hover:w-12"></div>
                      </div>
                    </div>

                    {/* 内容区域 */}
                    <div className="relative z-10 text-center">
                      <h3 className="text-3xl font-cute font-bold text-black mb-3 group-hover:text-gray-700 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-lg font-body-cute text-gray-600 mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      
                      {/* 统计信息 */}
                      <div className="flex justify-center items-center gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-cute font-bold text-black">{category.productCount}</div>
                          <div className="text-sm font-body-cute text-gray-500">商品数量</div>
                        </div>
                        <div className="w-px h-8 bg-gray-300"></div>
                        <div className="text-center">
                          <div className="text-lg font-cute font-bold text-gray-600">精选</div>
                          <div className="text-sm font-body-cute text-gray-500">优质商品</div>
                        </div>
                      </div>

                      {/* 特色商品预览 */}
                      <div className="mb-6">
                        <div className="text-sm font-body-cute text-gray-500 mb-2">特色商品</div>
                        <div className="flex flex-wrap justify-center gap-2">
                          {category.featuredProducts.slice(0, 2).map((product, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-xs font-body-cute text-gray-600"
                            >
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 进入按钮 */}
                      <button className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full font-cute font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-gray-800">
                        进入分类
                      </button>
                    </div>

                    {/* 特殊效果 */}
                    {hoveredCategory === category.id && (
                      <>
                        {/* 闪光效果 */}
                        {category.specialEffect === 'sparkle' && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                            <div className="absolute top-8 right-6 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                          </div>
                        )}

                        {/* 波浪效果 */}
                        {category.specialEffect === 'wave' && (
                          <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-blue-400/20 to-transparent animate-wave"></div>
                          </div>
                        )}

                        {/* 发光效果 */}
                        {category.specialEffect === 'glow' && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-3xl animate-pulse"></div>
                          </div>
                        )}

                        {/* 闪烁效果 */}
                        {category.specialEffect === 'shimmer' && (
                          <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                          </div>
                        )}

                        {/* 彩带效果 */}
                        {category.specialEffect === 'confetti' && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-2 left-2 w-1 h-3 bg-yellow-400 animate-bounce"></div>
                            <div className="absolute top-4 right-4 w-1 h-3 bg-red-400 animate-bounce" style={{animationDelay: '0.3s'}}></div>
                            <div className="absolute bottom-4 left-4 w-1 h-3 bg-blue-400 animate-bounce" style={{animationDelay: '0.6s'}}></div>
                          </div>
                        )}

                        {/* 霓虹效果 */}
                        {category.specialEffect === 'neon' && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-cyan-400/10 rounded-3xl animate-pulse"></div>
                          </div>
                        )}

                        {/* 花瓣效果 */}
                        {category.specialEffect === 'petals' && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-2 left-2 text-pink-300 animate-bounce">🌸</div>
                            <div className="absolute top-6 right-6 text-rose-300 animate-bounce" style={{animationDelay: '0.5s'}}>🌺</div>
                            <div className="absolute bottom-4 left-6 text-pink-200 animate-bounce" style={{animationDelay: '1s'}}>💮</div>
                          </div>
                        )}
                      </>
                    )}

                    {/* 装饰元素 */}
                    <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full opacity-60"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full opacity-40"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 底部统计 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-white/80 rounded-3xl p-8 shadow-lg backdrop-blur-sm border border-white/20 text-center">
              <h2 className="text-3xl font-heading-cute font-bold text-black mb-6">
                分类统计
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-cute font-bold text-black mb-2">{categories.length}</div>
                  <div className="text-lg font-body-cute text-gray-600">商品分类</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-cute font-bold text-black mb-2">
                    {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
                  </div>
                  <div className="text-lg font-body-cute text-gray-600">总商品数</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-cute font-bold text-black mb-2">精选</div>
                  <div className="text-lg font-body-cute text-gray-600">优质商品</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-cute font-bold text-black mb-2">24/7</div>
                  <div className="text-lg font-body-cute text-gray-600">在线服务</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CategoriesPage; 
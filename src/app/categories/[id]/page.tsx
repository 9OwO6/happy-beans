'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  image_urls?: string[];
  price: number;
  category: string;
  category_id?: string;
  stock?: number;
  tags?: string[];
  likes_count?: number;
  created_at: string;
}

interface CategoryInfo {
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

const CategoryDetailPage = () => {
  const params = useParams();
  const categoryId = params.id as string;
  
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<string>('最新');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [imgZoom, setImgZoom] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo | null>(null);

  const categories: CategoryInfo[] = [
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

  useEffect(() => {
    setIsVisible(true);
    const category = categories.find(cat => cat.id === categoryId);
    setCategoryInfo(category || null);
    
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category?.name || '')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [categoryId]);

  // 排序功能
  const getSortedProducts = (products: Product[]) => {
    switch (sortBy) {
      case '价格从低到高':
        return [...products].sort((a, b) => a.price - b.price);
      case '价格从高到低':
        return [...products].sort((a, b) => b.price - a.price);
      case '名称':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case '热度':
        return [...products].sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));
      case '最新':
      default:
        return [...products].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  };

  // 搜索和价格筛选
  const getFilteredProducts = () => {
    const filtered = products.filter(p => {
      const matchSearch = !search || p.name.includes(search) || p.description.includes(search);
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchSearch && matchPrice;
    });

    return getSortedProducts(filtered);
  };

  const filteredProducts = getFilteredProducts();

  const toggleLike = async (productId: string) => {
    try {
      const isLiked = likedProducts.includes(productId);
      
      const response = await fetch('/api/likes', {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      const result = await response.json();

      if (result.success) {
        // 更新本地状态
        setLikedProducts(prev => 
          isLiked 
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
        );
        
        // 更新产品列表中的点赞数
        setProducts(prev => 
          prev.map(p => 
            p.id === productId 
              ? { ...p, likes_count: result.likes_count }
              : p
          )
        );
      } else {
        // 显示错误消息
        alert(result.message || '操作失败');
      }
    } catch (error) {
      console.error('点赞操作失败:', error);
      alert('网络错误，请稍后重试');
    }
  };

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5BA] via-[#A5D8FA] to-[#FFD6E0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading-cute font-bold text-black mb-4">分类不存在</h1>
          <button 
            onClick={() => window.location.href = '/categories'}
            className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full font-cute font-bold hover:shadow-lg transition-all duration-300"
          >
            返回分类页面
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5BA] via-[#A5D8FA] to-[#FFD6E0] relative overflow-hidden">
      {/* 动态背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{background: categoryInfo.bgPattern}}></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#FFB6B9]/20 to-[#A5D8FA]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#A5D8FA]/30 to-[#FFD6E0]/30 rounded-full blur-lg animate-bounce"></div>
      </div>

      <Header />
      
      <main className="relative z-10">
        {/* 分类头部 */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* 面包屑导航 */}
              <div className="mb-6 text-lg text-gray-600">
                <span 
                  className="hover:text-gray-800 cursor-pointer transition-colors duration-200"
                  onClick={() => window.location.href = '/'}
                >
                  首页
                </span>
                <span className="mx-2 text-gray-400">{'>'}</span>
                <span 
                  className="hover:text-gray-800 cursor-pointer transition-colors duration-200"
                  onClick={() => window.location.href = '/categories'}
                >
                  商品分类
                </span>
                <span className="mx-2 text-gray-400">{'>'}</span>
                <span className="text-gray-800 font-bold">{categoryInfo.name}</span>
              </div>

              {/* 分类信息 */}
              <div className="mb-8">
                {/* 分类图片区域 */}
                <div className={`w-48 h-36 bg-gradient-to-r ${categoryInfo.gradient} rounded-3xl flex items-center justify-center mx-auto shadow-2xl mb-6 group-hover:shadow-2xl transition-all duration-500 ${categoryInfo.animation} ${categoryInfo.id === 'fashion-wear' ? 'group-hover:animate-gentle-shake' : ''} ${categoryInfo.id === 'practical-goods' ? 'animate-breathe' : ''} ${categoryInfo.id === 'beauty-supplies' ? 'animate-float' : ''} ${categoryInfo.id === 'anime-shop' ? 'animate-neon-pulse' : ''} ${categoryInfo.id === 'useless-beauty' ? 'group-hover:animate-focus-blur' : ''} overflow-hidden`}>
                  {/* 尝试加载图片，如果失败则显示图标 */}
                  <Image 
                    src={`/images/categories/${categoryInfo.id}.jpg`}
                    alt={categoryInfo.name}
                    fill
                    className="object-cover rounded-3xl transition-all duration-300 group-hover:scale-110"
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
                  <div className="text-5xl opacity-60 hidden">{categoryInfo.icon}</div>
                </div>
                
                {/* 装饰横线 */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-400 rounded-full"></div>
                  <div className="w-20 h-1.5 bg-gradient-to-r ${categoryInfo.gradient} rounded-full shadow-sm"></div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-gray-400 to-transparent rounded-full"></div>
                </div>
                <h1 className="text-6xl font-heading-cute font-extrabold text-black drop-shadow-lg mb-4 tracking-wide">
                  {categoryInfo.name}
                </h1>
                <p className="text-2xl font-body-cute text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                  {categoryInfo.description}
                </p>
                <div className="flex justify-center gap-8 text-lg text-gray-500">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    共 {filteredProducts.length} 件商品
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    热度 {filteredProducts.reduce((sum, p) => sum + (p.likes_count || 0), 0)} 次
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 搜索和筛选 */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white/80 rounded-3xl p-6 mb-8 shadow-lg backdrop-blur-sm border border-white/20">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <input
                  className="rounded-full px-6 py-3 border-2 border-[#A5D8FA] focus:ring-2 focus:ring-[#A5D8FA] outline-none text-lg bg-white shadow font-bold transition-all duration-200 focus:scale-105 text-gray-800"
                  style={{ fontFamily: 'ZCOOL KuaiLe, cursive', minWidth: 220 }}
                  type="text"
                  placeholder="搜索商品名称或描述"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <select
                  className="rounded-full px-6 py-3 border-2 border-[#FFD6E0] bg-white text-lg shadow font-bold transition-all duration-200 focus:scale-105 text-gray-800"
                  style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="最新">最新</option>
                  <option value="价格从低到高">价格从低到高</option>
                  <option value="价格从高到低">价格从高到低</option>
                  <option value="名称">名称</option>
                  <option value="热度">热度</option>
                </select>
              </div>

              {/* 价格区间筛选 */}
              <div className="flex items-center gap-4">
                <span className="text-lg text-gray-600">价格区间：</span>
                <input
                  type="number"
                  placeholder="最低价"
                  className="rounded-full px-4 py-2 border-2 border-[#A5D8FA] bg-white text-lg text-gray-800"
                  value={priceRange[0]}
                  onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                />
                <span className="text-lg text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="最高价"
                  className="rounded-full px-4 py-2 border-2 border-[#A5D8FA] bg-white text-lg text-gray-800"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 产品展示 */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center text-2xl text-gray-600">加载中...</div>
            ) : (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center">
                    <div className="text-6xl mb-4">😔</div>
                    <div className="text-2xl font-cute font-bold text-gray-600 mb-4">暂无商品</div>
                    <div className="text-lg font-body-cute text-gray-500 mb-6">该分类下暂时没有商品，请稍后再来看看吧！</div>
                    <button 
                      onClick={() => window.location.href = '/categories'}
                      className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full font-cute font-bold hover:shadow-lg transition-all duration-300"
                    >
                      返回分类页面
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product, idx) => (
                      <div
                        key={product.id}
                        className="relative bg-white/90 rounded-3xl p-6 shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group"
                        style={{ 
                          fontFamily: 'ZCOOL KuaiLe, cursive',
                          animationDelay: `${idx * 0.1}s`
                        }}
                        onClick={() => setSelected(product)}
                      >
                        {/* 产品图片 */}
                        <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#FFF5BA] via-[#FFD6E0] to-[#A5D8FA] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {product.image_url ? (
                            <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#FFF5BA] to-[#FFD6E0] flex items-center justify-center">
                              <div className="w-12 h-12 border-4 border-[#FFB6B9] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                        </div>

                        {/* 产品信息 */}
                        <div className="text-center">
                          <div className="text-xl font-extrabold text-black mb-2 group-hover:text-gray-700 transition-colors duration-200">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 mb-3 min-h-[40px] bg-white/60 rounded-xl px-2 py-1 shadow-inner">
                            {product.description}
                          </div>
                          <div className="text-2xl font-extrabold text-black mb-3">
                            ${product.price}
                          </div>
                        </div>

                        {/* 点赞按钮 */}
                        <button
                          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                            likedProducts.includes(product.id) 
                              ? 'bg-red-400 text-white shadow-lg' 
                              : 'bg-white/80 text-gray-400 hover:bg-red-100'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(product.id);
                          }}
                        >
                          {likedProducts.includes(product.id) ? '❤️' : '🤍'}
                        </button>
                        
                        {/* 点赞数显示 */}
                        <div className="absolute top-4 left-4 bg-white/80 rounded-full px-2 py-1 text-xs font-bold text-gray-600 shadow-lg">
                          ❤️ {product.likes_count || 0}
                        </div>

                        {/* 装饰元素 */}
                        <div className="absolute top-4 left-4 w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full opacity-60"></div>
                        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full opacity-40"></div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* 产品详情模态框 */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => {
            setSelected(null);
            setCurrentImageIndex(0);
          }}>
            <div className="bg-white/95 rounded-3xl shadow-2xl p-10 max-w-2xl w-full relative animate-bounce-cute border-4 border-[#FFD6E0] backdrop-blur-sm" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }} onClick={e => e.stopPropagation()}>
              <button className="absolute right-4 top-4 text-3xl bg-[#FFD6E0] hover:bg-[#FFB6B9] text-white rounded-full w-12 h-12 flex items-center justify-center shadow transition-all duration-200" onClick={() => {
                setSelected(null);
                setCurrentImageIndex(0);
              }}>&times;</button>
              <div className="flex flex-col items-center">
                {/* 主图片区域 */}
                <div className="relative w-96 h-96 mb-6 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#FFF5BA] via-[#FFD6E0] to-[#A5D8FA] flex items-center justify-center cursor-zoom-in border-4 border-[#FFD6E0]" onClick={() => setImgZoom(true)}>
                  {(selected.image_urls && selected.image_urls.length > 0) ? (
                    <Image src={selected.image_urls[currentImageIndex]} alt={selected.name} fill className="object-cover transition-transform duration-300 hover:scale-110" />
                                      ) : selected.image_url ? (
                      <Image src={selected.image_url} alt={selected.name} fill className="object-cover transition-transform duration-300 hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#FFF5BA] to-[#FFD6E0] flex items-center justify-center">
                      <div className="w-20 h-20 border-4 border-[#FFB6B9] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <span className="absolute right-2 bottom-2 text-gray-600 text-xl bg-white/70 rounded-full px-2">点击放大</span>
                </div>

                {/* 缩略图导航 */}
                {selected.image_urls && selected.image_urls.length > 1 && (
                  <div className="flex gap-2 mb-6">
                    {selected.image_urls.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'border-[#FF6B9D] scale-110' 
                            : 'border-gray-300 hover:border-[#A5D8FA]'
                        }`}
                      >
                        <img src={url} alt={`${selected.name} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="text-4xl font-extrabold text-black mb-2 drop-shadow">{selected.name}</div>
                <div className="text-lg text-gray-600 font-bold mb-1 drop-shadow">{selected.category || '未分类'}</div>
                <div className="text-base text-gray-500 mb-3 text-center max-w-md bg-white/60 rounded-xl px-2 py-1 shadow-inner">{selected.description}</div>
                
                {/* 标签显示 */}
                {selected.tags && selected.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selected.tags.map((tag, index) => (
                      <span key={index} className="bg-gradient-to-r from-[#A5D8FA] to-[#FFD6E0] text-gray-700 px-3 py-1 rounded-full text-sm font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="text-2xl font-extrabold text-black mb-4 drop-shadow">${selected.price}</div>
                
                {/* 库存信息 */}
                {selected.stock !== undefined && (
                  <div className="text-lg text-gray-600 mb-4">
                    库存: {selected.stock > 0 ? `${selected.stock} 件` : '缺货'}
                  </div>
                )}
                
                <div className="flex gap-4 mt-4">
                  <button
                    className={`px-6 py-2 rounded-full font-bold transition-all duration-200 ${
                      likedProducts.includes(selected.id) 
                        ? 'bg-red-400 text-white shadow-lg' 
                        : 'bg-[#FFD6E0] text-white hover:bg-red-400'
                    }`}
                    onClick={() => toggleLike(selected.id)}
                  >
                    {likedProducts.includes(selected.id) ? '已点赞' : '点赞'}
                  </button>
                  <button
                    className="px-6 py-2 bg-[#A5D8FA] text-white rounded-full font-bold hover:bg-[#7ec4f8] transition-colors duration-200"
                  >
                    加入购物车
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 图片放大预览 */}
        {imgZoom && selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in" onClick={() => setImgZoom(false)}>
            <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
              <img 
                src={(selected.image_urls && selected.image_urls.length > 0) ? selected.image_urls[currentImageIndex] : selected.image_url} 
                alt={selected.name} 
                className="max-w-full max-h-full rounded-2xl shadow-2xl border-8 border-[#FFD6E0]" 
              />
              
              {/* 多图导航 */}
              {selected.image_urls && selected.image_urls.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selected.image_urls!.length - 1);
                    }}
                  >
                    ‹
                  </button>
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(prev => prev < selected.image_urls!.length - 1 ? prev + 1 : 0);
                    }}
                  >
                    ›
                  </button>
                  
                  {/* 图片指示器 */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {selected.image_urls.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-white' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryDetailPage; 
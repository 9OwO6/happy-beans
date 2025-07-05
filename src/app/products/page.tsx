'use client';
import React, { useEffect, useState } from 'react';
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

const kawaiiBg = 'bg-gradient-to-br from-[#FFF5BA] via-[#A5D8FA] to-[#FFD6E0]';
const kawaiiShadow = 'shadow-[0_8px_32px_0_rgba(255,182,185,0.15),0_1.5px_8px_0_rgba(165,216,250,0.10)]';
const borderGradient = 'border-4 border-transparent bg-clip-padding bg-gradient-to-br from-[#FFD6E0] via-[#FFF5BA] to-[#A5D8FA]';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('全部');
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const [imgZoom, setImgZoom] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sortBy, setSortBy] = useState<string>('最新');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [filterTags, setFilterTags] = useState<string[]>([]);

  const itemsPerPage = 9;

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setProducts(data);
        const cats = Array.from(new Set(data.map((p: Product) => p.category).filter(Boolean)));
        setCategories(['全部', ...cats]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

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

  // 搜索、分类、价格筛选
  const getFilteredProducts = () => {
    let filtered = products.filter(p => {
      const matchCat = category === '全部' || p.category === category;
      const matchSearch = !search || p.name.includes(search) || p.description.includes(search);
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchCat && matchSearch && matchPrice;
    });

    // 标签筛选
    if (filterTags.includes('新品')) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filtered = filtered.filter(p => new Date(p.created_at) > oneWeekAgo);
    }

    return getSortedProducts(filtered);
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  const toggleCompare = (productId: string) => {
    setCompareList(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : prev.length < 3 
          ? [...prev, productId]
          : prev
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5BA] via-[#A5D8FA] to-[#FFD6E0] relative overflow-hidden">
      {/* 动态背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 几何图形装饰 */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#FFB6B9]/20 to-[#A5D8FA]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#A5D8FA]/30 to-[#FFD6E0]/30 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-[#FFD6E0]/25 to-[#FFF5BA]/25 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-gradient-to-br from-[#FFF5BA]/40 to-[#FFB6B9]/40 rounded-full blur-md animate-bounce"></div>
        
        {/* 波浪线装饰 */}
        <svg className="absolute top-0 left-0 w-full h-32 opacity-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,60 600,30 1200,60 L1200,120 L0,120 Z" fill="url(#wave-gradient)"></path>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB6B9" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#A5D8FA" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#FFD6E0" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
        </svg>
        
        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFB6B9 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* 动态光晕效果 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FFB6B9]/10 via-[#A5D8FA]/10 to-[#FFD6E0]/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <Header />
      <section className="relative py-8" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
        <div className="container mx-auto px-4 relative z-10">
          {/* 面包屑导航 */}
          <div className="mb-6 text-lg text-gray-600">
            <span 
              className="hover:text-gray-800 cursor-pointer transition-colors duration-200"
              onClick={() => window.location.href = '/'}
            >
              首页
            </span>
            <span className="mx-2 text-gray-400">{'>'}</span>
            <span className="text-gray-800 font-bold">全部商品</span>
          </div>

          {/* 页面标题和统计 */}
          <div className="text-center mb-8">
            <h1 className="text-6xl font-extrabold text-gray-800 drop-shadow-lg mb-4 tracking-wide relative">
              商品展示
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-[#FFB6B9] to-[#A5D8FA] rounded-full animate-ping"></div>
            </h1>
            <p className="text-2xl text-gray-600 mb-4 drop-shadow-sm">发现更多精选好物，支持智能筛选与检索</p>
            <div className="flex justify-center gap-8 text-lg text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                共 {filteredProducts.length} 件商品
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                {categories.length - 1} 个分类
              </span>
              <span className="text-gray-300">•</span>
                                <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    热度 {products.reduce((sum, p) => sum + (p.likes_count || 0), 0)} 次
                  </span>
            </div>
          </div>

          {/* 搜索和筛选区域 */}
          <div className="bg-white/80 rounded-3xl p-6 mb-8 shadow-lg backdrop-blur-sm border border-white/20">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <input
                className="rounded-full px-6 py-3 border-2 border-[#A5D8FA] focus:ring-2 focus:ring-[#A5D8FA] outline-none text-lg bg-white shadow font-bold transition-all duration-200 focus:scale-105"
                style={{ fontFamily: 'ZCOOL KuaiLe, cursive', minWidth: 220 }}
                type="text"
                placeholder="搜索商品名称或描述"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <select
                className="rounded-full px-6 py-3 border-2 border-[#FFD6E0] bg-white text-lg shadow font-bold transition-all duration-200 focus:scale-105"
                style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                className="rounded-full px-6 py-3 border-2 border-[#FFF5BA] bg-white text-lg shadow font-bold transition-all duration-200 focus:scale-105"
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
              <div className="flex gap-2">
                <button
                  className={`px-4 py-3 rounded-full font-bold transition-all duration-200 ${viewMode === 'grid' ? 'bg-[#FFB6B9] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-[#FFD6E0]'}`}
                  onClick={() => setViewMode('grid')}
                >
                  网格
                </button>
                <button
                  className={`px-4 py-3 rounded-full font-bold transition-all duration-200 ${viewMode === 'list' ? 'bg-[#FFB6B9] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-[#FFD6E0]'}`}
                  onClick={() => setViewMode('list')}
                >
                  列表
                </button>
              </div>
            </div>

            {/* 价格区间筛选 */}
            <div className="flex items-center gap-4 mb-4">
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

            {/* 标签筛选 */}
            <div className="flex flex-wrap gap-2">
              {['新品', '热门', '促销'].map(tag => (
                <button
                  key={tag}
                  className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                    filterTags.includes(tag) 
                      ? 'bg-[#FFB6B9] text-white shadow-lg' 
                      : 'bg-white text-gray-600 hover:bg-[#FFD6E0]'
                  }`}
                  onClick={() => setFilterTags(prev => 
                    prev.includes(tag) 
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 对比栏 */}
          {compareList.length > 0 && (
            <div className="bg-white/90 rounded-2xl p-4 mb-6 shadow-lg backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">对比商品 ({compareList.length}/3)</span>
                <button
                  className="px-4 py-2 bg-[#FFB6B9] text-white rounded-full font-bold hover:bg-[#FFD6E0] transition-colors duration-200"
                  onClick={() => setCompareList([])}
                >
                  清空对比
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center text-2xl text-gray-600">加载中...</div>
          ) : (
            <>
              {/* 产品网格 */}
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {currentProducts.length === 0 ? (
                  <div className="col-span-full text-center text-xl text-gray-500">没有找到相关商品</div>
                ) : currentProducts.map((p, idx) => (
                  <div
                    key={p.id}
                    className={`relative bg-white/90 rounded-3xl ${borderGradient} ${kawaiiShadow} hover:shadow-[0_0_32px_8px_rgba(255,182,185,0.25)] transition-all duration-300 p-7 flex ${viewMode === 'list' ? 'flex-row items-center gap-6' : 'flex-col items-center'} border-yellow-100 hover:border-pink-200 animate-fade-in cursor-pointer hover:scale-105 active:scale-97 group backdrop-blur-sm`}
                    style={{ fontFamily: 'ZCOOL KuaiLe, cursive', animationDelay: `${idx * 0.08}s` }}
                    onClick={() => setSelected(p)}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'w-32 h-32' : 'w-48 h-48'} mb-4 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#FFF5BA] via-[#FFD6E0] to-[#A5D8FA] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-4 border-[#FFD6E0]`}>
                      {p.image_url ? (
                        <Image 
                          src={p.image_url} 
                          alt={p.name} 
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-110" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#FFF5BA] to-[#FFD6E0] flex items-center justify-center">
                          <div className="w-16 h-16 border-4 border-[#FFB6B9] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    <div className={`flex-1 ${viewMode === 'list' ? 'text-left' : 'text-center'}`}>
                      <div className="text-2xl font-extrabold text-black mb-2 drop-shadow group-hover:text-gray-700 transition-colors duration-200" style={{letterSpacing:'0.04em'}}>{p.name}</div>
                      <div className="text-lg text-gray-600 font-bold mb-1 drop-shadow">{p.category || '未分类'}</div>
                      <div className="text-base text-gray-500 mb-3 min-h-[48px] bg-white/60 rounded-xl px-2 py-1 shadow-inner">{p.description}</div>
                      <div className="text-2xl font-extrabold text-black mb-2 drop-shadow">${p.price}</div>
                    </div>
                    
                    {/* 操作按钮 */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                          likedProducts.includes(p.id) 
                            ? 'bg-red-400 text-white shadow-lg' 
                            : 'bg-white/80 text-[#FFD6E0] hover:bg-red-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(p.id);
                        }}
                      >
                        {likedProducts.includes(p.id) ? '❤️' : '🤍'}
                      </button>
                      <button
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                          compareList.includes(p.id) 
                            ? 'bg-[#A5D8FA] text-white shadow-lg' 
                            : 'bg-white/80 text-[#A5D8FA] hover:bg-[#A5D8FA] hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(p.id);
                        }}
                      >
                        ⚖️
                      </button>
                    </div>
                    
                    {/* 点赞数显示 */}
                    <div className="absolute top-4 left-4 bg-white/80 rounded-full px-2 py-1 text-xs font-bold text-gray-600 shadow-lg">
                      ❤️ {p.likes_count || 0}
                    </div>
                    
                    {/* 装饰元素 */}
                    <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-[#FFB6B9] to-[#A5D8FA] rounded-full opacity-60" style={{top: '2.5rem'}}></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-[#A5D8FA] to-[#FFD6E0] rounded-full opacity-40"></div>
                  </div>
                ))}
              </div>

              {/* 分页 */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <button
                    className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                      currentPage === 1 
                        ? 'bg-gray-200 text-gray-400' 
                        : 'bg-[#FFB6B9] text-white hover:bg-[#FFD6E0] shadow-lg'
                    }`}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    上一页
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                        currentPage === page 
                          ? 'bg-[#FFB6B9] text-white shadow-lg' 
                          : 'bg-white text-gray-600 hover:bg-[#FFD6E0]'
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                      currentPage === totalPages 
                        ? 'bg-gray-200 text-gray-400' 
                        : 'bg-[#FFB6B9] text-white hover:bg-[#FFD6E0] shadow-lg'
                    }`}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    下一页
                  </button>
                </div>
              )}
            </>
          )}

          {/* 产品详情模态卡片 */}
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
                      <Image 
                        src={selected.image_urls[currentImageIndex]} 
                        alt={selected.name} 
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110" 
                      />
                    ) : selected.image_url ? (
                      <Image 
                        src={selected.image_url} 
                        alt={selected.name} 
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110" 
                      />
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
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
                            index === currentImageIndex 
                              ? 'border-[#FF6B9D] scale-110' 
                              : 'border-gray-300 hover:border-[#A5D8FA]'
                          }`}
                        >
                          <Image 
                            src={url} 
                            alt={`${selected.name} ${index + 1}`} 
                            fill
                            className="object-cover" 
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="text-4xl font-extrabold text-black mb-2 drop-shadow" style={{letterSpacing:'0.04em'}}>{selected.name}</div>
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
                  
                  <div className="text-3xl font-extrabold text-black mb-4 drop-shadow">${selected.price}</div>
                  
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
                      className={`px-6 py-2 rounded-full font-bold transition-all duration-200 ${
                        compareList.includes(selected.id) 
                          ? 'bg-[#A5D8FA] text-white shadow-lg' 
                          : 'bg-[#A5D8FA] text-white hover:bg-[#7ec4f8]'
                      }`}
                      onClick={() => toggleCompare(selected.id)}
                    >
                      {compareList.includes(selected.id) ? '已对比' : '加入对比'}
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
        </div>
      </section>
    </div>
  );
};

export default ProductList; 
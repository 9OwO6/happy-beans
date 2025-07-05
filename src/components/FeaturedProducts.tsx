'use client';
import React from 'react';
import Image from 'next/image';


interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
}

interface FeaturedProductsProps {
  products?: Product[];
}

const defaultProducts: Product[] = [
  // 这里可以放一些默认的热卖商品示例，后续你可以传入真实数据
  {
    id: '1',
    name: '樱花茶具套装',
    description: '精美的樱花陶瓷茶具，日系可爱风',
    image_url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
    price: 89.99,
    category: '茶具',
  },
  {
    id: '2',
    name: '可爱猫咪抱枕',
    description: '超软萌猫咪抱枕，治愈你的每一天',
    image_url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
    price: 24.99,
    category: '玩偶',
  },
  {
    id: '3',
    name: '便当盒套装',
    description: '环保竹制日式便当盒，分格设计',
    image_url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
    price: 34.99,
    category: '餐具',
  },
  {
    id: '4',
    name: '动漫手账本',
    description: '精美插画手账本，记录你的生活',
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
    price: 19.99,
    category: '文具',
  },
  {
    id: '5',
    name: '抹茶碗套装',
    description: '日式抹茶碗与茶筅，茶道必备',
    image_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop',
    price: 45.99,
    category: '茶具',
  },
  {
    id: '6',
    name: '招财猫钥匙扣',
    description: '可爱招财猫，带来好运',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    price: 12.99,
    category: '饰品',
  },
];

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products = defaultProducts }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-pink-400 mb-4">热卖商品</h2>
          <p className="text-xl text-blue-400 mb-6">精选可爱好物，限时热卖中！</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.slice(0, 6).map((p, idx) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center border-2 border-yellow-100 hover:border-pink-200 animate-fade-in"
              style={{ fontFamily: 'ZCOOL KuaiLe, cursive', animationDelay: `${idx * 0.08}s` }}
            >
              <div className="relative w-48 h-48 mb-4 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 flex items-center justify-center">
                {p.image_url ? (
                  <Image 
                    src={p.image_url} 
                    alt={p.name} 
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                  />
                ) : (
                  <span className="text-5xl text-gray-300">🛍️</span>
                )}
              </div>
              <div className="text-2xl text-pink-500 font-bold mb-2">{p.name}</div>
              <div className="text-lg text-yellow-500 mb-1">{p.category || '未分类'}</div>
              <div className="text-base text-gray-500 mb-3 text-center min-h-[48px]">{p.description}</div>
                              <div className="text-2xl text-blue-400 font-bold mb-2">${p.price}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/products" className="inline-block bg-white border-2 border-pink-300 text-pink-400 px-10 py-4 rounded-full font-bold text-xl shadow hover:bg-pink-100 hover:text-pink-600 transition-all duration-300 hover:scale-105" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
            浏览全部商品
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

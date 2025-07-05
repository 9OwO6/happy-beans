'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>('');

  useEffect(() => {
    // 只在页面加载时触发一次动画
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '1000+', label: '快乐客户', icon: '😊' },
    { number: '50+', label: '精选商品', icon: '🛍️' },
    { number: '3', label: '年品牌历史', icon: '⭐' },
    { number: '99%', label: '客户满意度', icon: '💖' }
  ];

  const values = [
    {
      title: '可爱至上',
      description: '我们相信可爱能治愈一切，让每一天都充满温暖',
      icon: '🌸',
      color: 'from-pink-300 to-rose-300'
    },
    {
      title: '品质保证',
      description: '严选每一件商品，只为给你最好的体验',
      icon: '✨',
      color: 'from-yellow-300 to-orange-300'
    },
    {
      title: '创新设计',
      description: '融合日韩可爱元素，创造独特的视觉体验',
      icon: '🎨',
      color: 'from-blue-300 to-cyan-300'
    },
    {
      title: '用心服务',
      description: '每一个细节都用心，让购物成为享受',
      icon: '💝',
      color: 'from-purple-300 to-pink-300'
    }
  ];



  const deliveryServices = [
    {
      area: 'Richmond市区内',
      condition: '满额免费配送',
      description: 'Richmond市区内享受免费配送服务',
      icon: '🚚',
      color: 'from-green-300 to-emerald-300'
    },
    {
      area: 'Richmond市区外',
      condition: '15公里内满55元配送',
      description: 'Richmond Center 15公里范围内，满55元即可配送',
      icon: '🚗',
      color: 'from-blue-300 to-cyan-300'
    },
    {
      area: '15公里以上',
      condition: '请咨询客服',
      description: '15公里以上地区，请联系客服咨询配送详情',
      icon: '📞',
      color: 'from-purple-300 to-pink-300'
    }
  ];

  const businessHours = [
    { day: '周一至周日', time: '13:00 - 18:00' },
    { day: '法定节假日', time: '联系小客服咨询情况' }
  ];

  const openModal = (imageSrc: string, title: string) => {
    setModalImage(imageSrc);
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalImage(null);
    setModalTitle('');
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
      </div>

      <Header />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-7xl font-heading-cute font-extrabold text-gray-800 drop-shadow-lg mb-6 tracking-wide relative">
                关于我们
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-[#FFB6B9] to-[#A5D8FA] rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-[#FFD6E0] to-[#FFF5BA] rounded-full animate-sparkle"></div>
              </h1>
              <p className="text-2xl font-body-cute text-gray-700 mb-8 drop-shadow-sm max-w-3xl mx-auto leading-relaxed">
                我们是一个充满梦想和创意的团队，致力于为世界带来更多可爱和温暖
              </p>
            </div>
          </div>
        </section>

        {/* 统计数据 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-6 bg-white/80 rounded-3xl shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:rotate-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-4xl mb-2 animate-bounce" style={{animationDelay: `${index * 0.5}s`}}>{stat.icon}</div>
                  <div className="text-3xl font-cute font-bold text-gradient-warm mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-body-cute text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 品牌故事 */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-heading-cute font-bold text-gray-800 mb-6 relative">
                  我们的故事
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#FFB6B9] to-[#A5D8FA] rounded-full animate-ping"></div>
                </h2>
                <p className="text-xl font-body-cute text-gray-700 max-w-3xl mx-auto">
                  从一个小小的梦想开始，我们正在创造属于可爱爱好者的美好世界
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <div className="bg-white/80 rounded-3xl p-8 shadow-lg backdrop-blur-sm border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    <h3 className="text-3xl font-cute font-bold text-cute-pink mb-4">
                      梦想的起源
                    </h3>
                    <p className="text-lg font-body-cute text-gray-700 leading-relaxed mb-6">
                      2021年，一群热爱可爱文化的年轻人聚在一起，他们相信可爱不仅仅是一种审美，更是一种生活态度。我们希望通过精选的商品，让每个人都能在日常生活中感受到温暖和快乐。
                    </p>
                    <p className="text-lg font-body-cute text-gray-700 leading-relaxed">
                      从最初的几个人，到现在拥有数千名忠实客户，我们始终坚持初心：让世界变得更可爱，让生活充满色彩。
                    </p>
                  </div>
                </div>
                
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{transitionDelay: '300ms'}}>
                  <div className="relative group">
                    <div className="w-full h-80 bg-gradient-to-br from-[#FFB6B9] via-[#A5D8FA] to-[#FFD6E0] rounded-3xl shadow-lg flex items-center justify-center group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 overflow-hidden">
                      {/* 视频播放器占位符 */}
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4 animate-bounce">🎬</div>
                          <p className="text-xl font-body-cute text-gray-700 font-semibold">店铺视频展示</p>
                          <p className="text-lg font-body-cute text-gray-600 mt-2">精彩内容即将上线</p>
                        </div>
                      </div>
                      {/* 播放按钮 */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center text-4xl shadow-lg backdrop-blur-sm">
                          ▶️
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-[#FFD6E0] to-[#FFF5BA] rounded-full flex items-center justify-center text-2xl animate-pulse">
                      ✨
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#A5D8FA] to-[#FFB6B9] rounded-full flex items-center justify-center text-xl animate-bounce">
                      💖
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 福豆配送服务 */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-heading-cute font-bold text-gray-800 mb-6 relative">
                福豆配送服务
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#FFB6B9] to-[#A5D8FA] rounded-full animate-ping"></div>
              </h2>
              <p className="text-xl font-body-cute text-gray-700 max-w-3xl mx-auto">
                为您提供便捷、快速的配送服务，让可爱商品快速到达您的手中
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {deliveryServices.map((service, index) => (
                <div
                  key={index}
                  className={`text-center p-8 bg-white/80 rounded-3xl shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-full h-48 mb-6 relative">
                    <Image 
                      src="/images/about/delivery-service.jpg" 
                      alt="福豆配送服务" 
                      fill
                      className="object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-cute font-bold text-cute-pink mb-2">{service.area}</h3>
                  <p className="text-lg font-body-cute text-gray-600 font-semibold mb-4">{service.condition}</p>
                  <p className="text-lg font-body-cute text-gray-700 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 核心价值观 */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-heading-cute font-bold text-gray-800 mb-6 relative">
                核心价值观
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#FFB6B9] to-[#A5D8FA] rounded-full animate-ping"></div>
              </h2>
              <p className="text-xl font-body-cute text-gray-700 max-w-3xl mx-auto">
                这些价值观指引着我们前进的方向，也是我们与客户建立深厚连接的基石
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`text-center p-8 bg-white/80 rounded-3xl shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-cute font-bold text-cute-pink mb-4">{value.title}</h3>
                  <p className="text-lg font-body-cute text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* 联系信息和地图 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className={`bg-white/80 rounded-3xl p-8 shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <h2 className="text-4xl font-heading-cute font-bold text-gray-800 mb-8 text-center">
                  营业时间 & 联系我们
                  <div className="w-6 h-6 bg-gradient-to-r from-[#FFB6B9] to-[#A5D8FA] rounded-full animate-ping mx-auto mt-2"></div>
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* 左侧：联系信息 */}
                  <div className="space-y-6">
                    {/* 营业时间 */}
                    <div className="text-center p-6 bg-gradient-to-r from-[#FFB6B9]/10 to-[#A5D8FA]/10 rounded-2xl">
                      <div className="text-4xl mb-4">🕐</div>
                      <h3 className="text-2xl font-cute font-bold text-cute-pink mb-4">营业时间</h3>
                      <div className="space-y-3">
                        {businessHours.map((schedule, index) => (
                          <div key={index} className="text-center">
                            <div className="text-lg font-cute font-bold text-gray-800">{schedule.day}</div>
                            <div className="text-lg font-body-cute text-gray-700">{schedule.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 联系信息 */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* 微信二维码 */}
                      <div className="text-center p-6 bg-gradient-to-r from-[#A5D8FA]/10 to-[#FFD6E0]/10 rounded-2xl">
                        <div className="text-4xl mb-4">📱</div>
                        <h3 className="text-2xl font-cute font-bold text-cute-pink mb-2">微信客服</h3>
                        <p className="text-lg font-body-cute text-gray-700 mb-4">扫描二维码添加客服</p>
                        <div 
                          className="w-32 h-32 mx-auto rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 relative"
                          onClick={() => openModal('/images/about/wechat-qr.png', '微信二维码')}
                        >
                          <Image 
                            src="/images/about/wechat-qr.png" 
                            alt="微信二维码" 
                            fill
                            className="object-cover rounded-2xl"
                          />
                        </div>
                        <p className="text-sm font-body-cute text-gray-600 mt-2">点击查看大图</p>
                      </div>

                      {/* Instagram */}
                      <div className="text-center p-6 bg-gradient-to-r from-[#FFD6E0]/10 to-[#FFF5BA]/10 rounded-2xl">
                        <div className="text-4xl mb-4">📸</div>
                        <h3 className="text-2xl font-cute font-bold text-cute-pink mb-2">Instagram</h3>
                        <p className="text-lg font-body-cute text-gray-700 mb-4">关注我们的最新动态</p>
                        <div 
                          className="w-32 h-32 mx-auto rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 relative"
                          onClick={() => openModal('/images/about/instagram-qr.png', 'Instagram二维码')}
                        >
                          <Image 
                            src="/images/about/instagram-qr.png" 
                            alt="Instagram二维码" 
                            fill
                            className="object-cover rounded-2xl"
                          />
                        </div>
                        <p className="text-sm font-body-cute text-gray-600 mt-2">@happydou_shop</p>
                      </div>
                    </div>
                  </div>

                  {/* 右侧：Google Maps */}
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-[#FFF5BA]/10 to-[#A5D8FA]/10 rounded-2xl">
                      <div className="text-4xl mb-4">📍</div>
                      <h3 className="text-2xl font-cute font-bold text-cute-pink mb-4">店铺位置</h3>
                      <p className="text-lg font-body-cute text-gray-700 mb-4">欢迎来店选购</p>
                      
                      {/* Google Maps 预览 */}
                      <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg relative">
                        {/* 背景图片 */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: 'url(/images/about/map_back.jpg)',
                            filter: 'brightness(0.7) contrast(0.8)'
                          }}
                        ></div>
                        
                        {/* 渐变遮罩 */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FFB6B9]/40 to-[#A5D8FA]/40"></div>
                        
                        {/* 内容 */}
                        <div className="relative z-10 flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="text-6xl mb-4 drop-shadow-lg">🗺️</div>
                            <p className="text-xl font-cute font-bold text-white mb-2 drop-shadow-lg">店铺位置</p>
                            <p className="text-lg font-body-cute text-white mb-4 drop-shadow-lg">4000 Number 3 Rd #2185</p>
                            <p className="text-lg font-body-cute text-white drop-shadow-lg">Richmond, BC V6X 0J8</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-white/60 rounded-xl">
                        <p className="text-lg font-cute font-bold text-gray-800 mb-2">地址</p>
                        <p className="text-lg font-body-cute text-gray-700">
                          4000 Number 3 Rd #2185, Richmond, BC V6X 0J8
                        </p>
                        <a 
                          href="https://www.google.com/maps/place/Happy+Beans/@49.1844064,-123.1407063,17z/data=!3m2!4b1!5s0x5486752f4d351c77:0x659b4d5192ac8c7!4m6!3m5!1s0x5486758ca800ce6b:0x450dec1aeb5326e1!8m2!3d49.184403!4d-123.13583!16s%2Fg%2F11l_2w8skm?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-3 px-6 py-2 bg-gradient-to-r from-[#FFB6B9] to-[#A5D8FA] text-white rounded-full font-cute font-bold hover:scale-105 transition-transform duration-300"
                        >
                          🗺️ 在Google Maps中查看
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 联系我们 */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className={`bg-white/80 rounded-3xl p-12 shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <h2 className="text-5xl font-heading-cute font-bold text-gray-800 mb-6 relative">
                  加入我们的可爱世界
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#FFB6B9] to-[#A5D8FA] rounded-full animate-ping"></div>
                </h2>
                <p className="text-xl font-body-cute text-gray-700 mb-8 leading-relaxed">
                  无论你是寻找可爱商品的顾客，还是想要分享可爱文化的朋友，我们都欢迎你的加入！
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <button 
                    onClick={() => window.location.href = '/products'}
                    className="px-8 py-4 bg-gradient-to-r from-[#FFB6B9] to-[#A5D8FA] text-white rounded-full font-cute font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-1 active:scale-95"
                  >
                    浏览商品
                  </button>
                  <button 
                    onClick={() => window.location.href = '/categories'}
                    className="px-8 py-4 bg-white border-2 border-[#A5D8FA] text-[#A5D8FA] rounded-full font-cute font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-1 active:scale-95"
                  >
                    查看分类
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 二维码模态框 */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-3xl p-6 max-w-sm mx-4 transform transition-all duration-300 hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-cute font-bold text-gray-800">{modalTitle}</h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <Image 
              src={modalImage || ''} 
              alt={modalTitle} 
              width={300}
              height={300}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
            <p className="text-center mt-4 text-gray-600">点击外部区域关闭</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage; 
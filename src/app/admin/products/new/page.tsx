"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [stock, setStock] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();

  // 预定义的分类
  const predefinedCategories: Category[] = [
    { id: 'trendy-decor', name: '潮流摆件', description: '精选时尚潮流摆件，为你的空间增添独特魅力' },
    { id: 'fashion-wear', name: '衣帽穿搭', description: '时尚服饰与配饰，展现你的个性风格' },
    { id: 'practical-goods', name: '实用好物', description: '精选实用生活用品，让生活更加便利美好' },
    { id: 'beauty-supplies', name: '颜值补给', description: '美妆护肤精选，让你由内而外散发魅力' },
    { id: 'festival-special', name: '节日精选', description: '节日主题商品，为每个特殊时刻增添欢乐' },
    { id: 'anime-shop', name: '次元小铺', description: '二次元周边商品，带你进入动漫世界' },
    { id: 'useless-beauty', name: '无用之美', description: '那些看似无用却充满美感的艺术品' }
  ];

  useEffect(() => {
    setCategories(predefinedCategories);
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    setUploading(true);
    const newImageUrls: string[] = [];

    for (const file of files) {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id || "anonymous";
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;

        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (error) {
          alert(`图片 ${file.name} 上传失败: ${error.message}`);
          continue;
        }

        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        newImageUrls.push(publicUrlData?.publicUrl || "");
      } catch (error) {
        console.error('上传错误:', error);
        alert(`图片 ${file.name} 上传失败`);
      }
    }

    setImageUrls(prev => [...prev, ...newImageUrls]);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrls.length === 0) {
      alert("请至少上传一张产品图片");
      return;
    }

    const selectedCategory = categories.find(cat => cat.id === category);
    
    // 使用完整的新表结构
    const productData = {
      name,
      description,
      image_url: imageUrls[0], // 主图
      image_urls: imageUrls, // 所有图片
      price: Number(price),
      stock: Number(stock) || 0,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      status: "on",
      category: selectedCategory?.name || category,
      category_id: category,
    };

    const { error } = await supabase.from("products").insert([productData]);

    if (!error) {
      alert("新增成功！");
      router.push("/admin/dashboard");
    } else {
      console.log(error);
      alert("新增失败：" + JSON.stringify(error));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5BA] via-[#A5D8FA] to-[#FFD6E0] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="bg-white/80 hover:bg-white text-gray-700 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105 font-bold"
            style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
          >
            ← 返回管理面板
          </button>
        </div>

        <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
            新增产品
          </h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                  产品名称 *
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-[#A5D8FA] rounded-2xl focus:ring-2 focus:ring-[#A5D8FA] outline-none text-lg transition-all duration-200 focus:scale-105"
                  style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                  placeholder="请输入产品名称"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                  产品分类 *
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-[#FFD6E0] rounded-2xl focus:ring-2 focus:ring-[#FFD6E0] outline-none text-lg transition-all duration-200 focus:scale-105"
                  style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  required
                >
                  <option value="">请选择分类</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} - {cat.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                  价格 (CAD) *
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-[#FFF5BA] rounded-2xl focus:ring-2 focus:ring-[#FFF5BA] outline-none text-lg transition-all duration-200 focus:scale-105"
                  style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                  库存数量
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-[#A5D8FA] rounded-2xl focus:ring-2 focus:ring-[#A5D8FA] outline-none text-lg transition-all duration-200 focus:scale-105"
                  style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                  type="number"
                  min="0"
                  placeholder="0"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                产品描述
              </label>
              <textarea
                className="w-full px-4 py-3 border-2 border-[#FFD6E0] rounded-2xl focus:ring-2 focus:ring-[#FFD6E0] outline-none text-lg transition-all duration-200 focus:scale-105 resize-none"
                style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                rows={4}
                placeholder="请详细描述产品特点、材质、尺寸等信息..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                产品标签
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-[#FFF5BA] rounded-2xl focus:ring-2 focus:ring-[#FFF5BA] outline-none text-lg transition-all duration-200 focus:scale-105"
                style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                placeholder="标签用逗号分隔，如：新品,热销,限量"
                value={tags}
                onChange={e => setTags(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                产品图片 * (支持多图上传)
              </label>
              <div className="border-2 border-dashed border-[#A5D8FA] rounded-2xl p-6 text-center hover:border-[#FFD6E0] transition-colors duration-300">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="image-upload"
                  onChange={handleImageChange}
                  disabled={uploading}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-6xl mb-4">📸</div>
                  <div className="text-lg text-gray-600 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                    {uploading ? '上传中...' : '点击选择图片或拖拽图片到此处'}
                  </div>
                  <div className="text-sm text-gray-500" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                    支持 JPG、PNG、GIF 格式，最多可上传 10 张图片
                  </div>
                </label>
              </div>
            </div>

            {imageUrls.length > 0 && (
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                  图片预览 ({imageUrls.length} 张)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={url} 
                        alt={`预览 ${index + 1}`} 
                        className="w-full h-32 object-cover rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors duration-200"
                      >
                        ×
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          主图
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={uploading || imageUrls.length === 0}
                className="bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
              >
                {uploading ? '上传中...' : '新增产品'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  productCount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const router = useRouter();

  // 表单状态
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "🎨",
    color: "#FF6B9D",
    gradient: "from-pink-400 via-purple-500 to-indigo-500"
  });

  const predefinedCategories: Category[] = [
    {
      id: 'trendy-decor',
      name: '潮流摆件',
      description: '精选时尚潮流摆件，为你的空间增添独特魅力',
      icon: '🎨',
      color: '#FF6B9D',
      gradient: 'from-pink-400 via-purple-500 to-indigo-500',
      productCount: 0
    },
    {
      id: 'fashion-wear',
      name: '衣帽穿搭',
      description: '时尚服饰与配饰，展现你的个性风格',
      icon: '👗',
      color: '#4ECDC4',
      gradient: 'from-teal-400 via-cyan-500 to-blue-500',
      productCount: 0
    },
    {
      id: 'practical-goods',
      name: '实用好物',
      description: '精选实用生活用品，让生活更加便利美好',
      icon: '🛠️',
      color: '#45B7D1',
      gradient: 'from-blue-400 via-indigo-500 to-purple-500',
      productCount: 0
    },
    {
      id: 'beauty-supplies',
      name: '颜值补给',
      description: '美妆护肤精选，让你由内而外散发魅力',
      icon: '💄',
      color: '#FF8E53',
      gradient: 'from-orange-400 via-red-500 to-pink-500',
      productCount: 0
    },
    {
      id: 'festival-special',
      name: '节日精选',
      description: '节日主题商品，为每个特殊时刻增添欢乐',
      icon: '🎉',
      color: '#FFD93D',
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      productCount: 0
    },
    {
      id: 'anime-shop',
      name: '次元小铺',
      description: '二次元周边商品，带你进入动漫世界',
      icon: '🎭',
      color: '#A8E6CF',
      gradient: 'from-green-400 via-emerald-500 to-teal-500',
      productCount: 0
    },
    {
      id: 'useless-beauty',
      name: '无用之美',
      description: '那些看似无用却充满美感的艺术品',
      icon: '🌸',
      color: '#FFB6B9',
      gradient: 'from-pink-300 via-rose-400 to-red-400',
      productCount: 0
    }
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      // 获取每个分类的产品数量
      const categoriesWithCount = await Promise.all(
        predefinedCategories.map(async (cat) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category', cat.name);
          
          return {
            ...cat,
            productCount: count || 0
          };
        })
      );
      
      setCategories(categoriesWithCount);
    } catch (error) {
      console.error('加载分类失败:', error);
    }
    setLoading(false);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCategory = {
      id: formData.name.toLowerCase().replace(/\s+/g, '-'),
      ...formData
    };

    // 这里可以保存到数据库，现在先保存到本地状态
    setCategories(prev => [...prev, { ...newCategory, productCount: 0 }]);
    setShowAddForm(false);
    setFormData({
      name: "",
      description: "",
      icon: "🎨",
      color: "#FF6B9D",
      gradient: "from-pink-400 via-purple-500 to-indigo-500"
    });
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    const updatedCategory = {
      ...editingCategory,
      ...formData
    };

    setCategories(prev => 
      prev.map(cat => 
        cat.id === editingCategory.id ? updatedCategory : cat
      )
    );
    
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      icon: "🎨",
      color: "#FF6B9D",
      gradient: "from-pink-400 via-purple-500 to-indigo-500"
    });
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("确定要删除这个分类吗？相关产品将变为未分类状态。")) return;

    // 更新相关产品的分类
    await supabase
      .from('products')
      .update({ category: '未分类', category_id: null })
      .eq('category_id', categoryId);

    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const startEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
      gradient: category.gradient
    });
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setShowAddForm(false);
    setFormData({
      name: "",
      description: "",
      icon: "🎨",
      color: "#FF6B9D",
      gradient: "from-pink-400 via-purple-500 to-indigo-500"
    });
  };

  const iconOptions = [
    "🎨", "👗", "🛠️", "💄", "🎉", "🎭", "🌸", "📱", "💻", "🎮", 
    "🏠", "🚗", "✈️", "🍔", "☕", "🎵", "📚", "🎬", "⚽", "🎪"
  ];

  const gradientOptions = [
    { name: "粉色渐变", value: "from-pink-400 via-purple-500 to-indigo-500" },
    { name: "青色渐变", value: "from-teal-400 via-cyan-500 to-blue-500" },
    { name: "蓝色渐变", value: "from-blue-400 via-indigo-500 to-purple-500" },
    { name: "橙色渐变", value: "from-orange-400 via-red-500 to-pink-500" },
    { name: "黄色渐变", value: "from-yellow-400 via-orange-500 to-red-500" },
    { name: "绿色渐变", value: "from-green-400 via-emerald-500 to-teal-500" },
    { name: "玫瑰渐变", value: "from-pink-300 via-rose-400 to-red-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5BA] via-[#A5D8FA] to-[#FFD6E0] p-8">
      <div className="max-w-6xl mx-auto">
        {/* 返回按钮 */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="bg-white/80 hover:bg-white text-gray-700 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105 font-bold"
            style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
          >
            ← 返回管理面板
          </button>
        </div>

        {/* 标题和操作按钮 */}
        <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/20 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
              分类管理
            </h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
            >
              + 新增分类
            </button>
          </div>
        </div>

        {/* 分类表格 */}
        <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/20">
          {loading ? (
            <div className="text-center text-2xl text-gray-600" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
              加载中...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 text-lg font-bold text-gray-700" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                      图标
                    </th>
                    <th className="text-left py-4 px-4 text-lg font-bold text-gray-700" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                      分类名称
                    </th>
                    <th className="text-left py-4 px-4 text-lg font-bold text-gray-700" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                      描述
                    </th>
                    <th className="text-left py-4 px-4 text-lg font-bold text-gray-700" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                      产品数量
                    </th>
                    <th className="text-left py-4 px-4 text-lg font-bold text-gray-700" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-4 px-4">
                        <div className="text-3xl">{category.icon}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-lg font-bold text-gray-800" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                          {category.name}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-600 max-w-md" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                          {category.description}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-lg font-bold text-blue-600" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                          {category.productCount} 个产品
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(category)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors duration-200"
                            style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                          >
                            编辑
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-colors duration-200"
                            style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                          >
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 新增/编辑表单 */}
        {(showAddForm || editingCategory) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                {editingCategory ? '编辑分类' : '新增分类'}
              </h2>
              
              <form onSubmit={editingCategory ? handleEditCategory : handleAddCategory} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                      分类名称 *
                    </label>
                    <input
                      className="w-full px-4 py-3 border-2 border-[#A5D8FA] rounded-2xl focus:ring-2 focus:ring-[#A5D8FA] outline-none text-lg transition-all duration-200 focus:scale-105"
                      style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                      图标
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-[#FFD6E0] rounded-2xl focus:ring-2 focus:ring-[#FFD6E0] outline-none text-lg transition-all duration-200 focus:scale-105"
                      style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                      value={formData.icon}
                      onChange={e => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    >
                      {iconOptions.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                    描述
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-[#FFF5BA] rounded-2xl focus:ring-2 focus:ring-[#FFF5BA] outline-none text-lg transition-all duration-200 focus:scale-105 resize-none"
                    style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
                    渐变色
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-[#A5D8FA] rounded-2xl focus:ring-2 focus:ring-[#A5D8FA] outline-none text-lg transition-all duration-200 focus:scale-105"
                    style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                    value={formData.gradient}
                    onChange={e => setFormData(prev => ({ ...prev, gradient: e.target.value }))}
                  >
                    {gradientOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                  >
                    {editingCategory ? '保存修改' : '新增分类'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
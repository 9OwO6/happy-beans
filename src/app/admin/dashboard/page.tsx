"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  status: string;
  created_at: string;
  category: string;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("全部");
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setProducts(data);
        // 自动提取所有分类
        const cats = Array.from(new Set(data.map((p: Product) => p.category).filter(Boolean)));
        setCategories(["全部", ...cats]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("确定要下架该产品吗？")) return;
    await supabase.from("products").update({ status: "off" }).eq("id", id);
    setProducts(products => products.map(p => p.id === id ? { ...p, status: "off" } : p));
  };

  const handleRemove = async (id: string) => {
    if (!confirm("确定要永久删除该产品吗？此操作不可恢复！")) return;
    await supabase.from("products").delete().eq("id", id);
    setProducts(products => products.filter(p => p.id !== id));
  };

  // 分类筛选
  const filteredProducts = category === "全部"
    ? products
    : products.filter(p => p.category === category);

  return (
    <div className="p-8 max-w-6xl mx-auto" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
      <div className="mb-4">
        <button
          className="cute-btn"
          type="button"
          onClick={() => router.push("/")}
          style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
        >
          返回主页
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-blue-400" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>产品管理</h1>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors duration-200"
          onClick={() => router.push("/admin/products/new")}
          style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
        >
          新增产品
        </button>
        <button
          className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500 transition-colors duration-200"
          onClick={() => router.push("/admin/categories")}
          style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
        >
          分类管理
        </button>
        <select
          className="border rounded px-3 py-2"
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>加载中...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col items-center animate-fade-in border border-blue-100" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>
              {p.image_url && (
                <img src={p.image_url} alt={p.name} className="w-32 h-32 object-cover rounded-xl mb-2 shadow" />
              )}
              <div className="text-lg font-bold text-blue-500 mb-1">{p.name}</div>
              <div className="text-sm text-yellow-500 mb-1">{p.category || "未分类"}</div>
              <div className="text-sm text-gray-500 mb-2">{p.status === "on" ? "上架" : "下架"}</div>
              <div className="flex gap-2 mt-2">
                <button
                  className="px-3 py-1 bg-yellow-300 rounded"
                  onClick={() => router.push(`/admin/products/${p.id}/edit`)}
                  style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                >
                  编辑
                </button>
                <button
                  className="px-3 py-1 bg-red-400 text-white rounded"
                  onClick={() => handleDelete(p.id)}
                  disabled={p.status === "off"}
                  style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                >
                  下架
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={() => handleRemove(p.id)}
                  style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
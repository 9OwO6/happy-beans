"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 使用 Supabase Auth 进行邮箱密码登录
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("登录失败，请检查邮箱和密码！");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="bg-white/80 rounded-3xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-blue-400" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>管理员登录</h2>
      <form
        onSubmit={handleLogin}
        className="w-full flex flex-col gap-4"
        style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
      >
        <input
          className="rounded-full px-4 py-3 border border-blue-200 focus:ring-2 focus:ring-blue-200 outline-none text-lg placeholder:text-blue-200"
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
        />
        <input
          className="rounded-full px-4 py-3 border border-blue-200 focus:ring-2 focus:ring-blue-200 outline-none text-lg placeholder:text-blue-200"
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
        />
        {error && <div className="text-red-500 text-sm" style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}>{error}</div>}
        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-blue-200 via-yellow-100 to-blue-300 text-blue-700 font-bold py-3 rounded-full shadow-md hover:scale-105 transition-transform"
          disabled={loading}
          style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
        >
          {loading ? "登录中..." : "登录"}
        </button>
      </form>
      <button
        className="mt-6 cute-btn"
        type="button"
        onClick={() => router.push("/")}
        style={{ fontFamily: 'ZCOOL KuaiLe, cursive' }}
      >
        返回主页
      </button>
    </div>
  );
}

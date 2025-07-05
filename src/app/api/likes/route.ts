import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// 获取用户IP地址
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

// 获取用户代理信息
function getUserAgent(request: NextRequest): string {
  return request.headers.get('user-agent') || 'unknown';
}

// POST - 添加点赞
export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: '产品ID是必需的' },
        { status: 400 }
      );
    }

    const userIP = getClientIP(request);
    const userAgent = getUserAgent(request);

    // 调用数据库函数添加点赞
    const { data, error } = await supabase.rpc('add_product_like', {
      p_product_id: productId,
      p_user_ip: userIP,
      p_user_agent: userAgent
    });

    if (error) {
      console.error('点赞失败:', error);
      return NextResponse.json(
        { error: '点赞失败，请稍后重试' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('点赞API错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// DELETE - 移除点赞
export async function DELETE(request: NextRequest) {
  try {
    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: '产品ID是必需的' },
        { status: 400 }
      );
    }

    const userIP = getClientIP(request);

    // 调用数据库函数移除点赞
    const { data, error } = await supabase.rpc('remove_product_like', {
      p_product_id: productId,
      p_user_ip: userIP
    });

    if (error) {
      console.error('取消点赞失败:', error);
      return NextResponse.json(
        { error: '取消点赞失败，请稍后重试' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('取消点赞API错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// GET - 检查用户今天是否已经点赞
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    
    if (!productId) {
      return NextResponse.json(
        { error: '产品ID是必需的' },
        { status: 400 }
      );
    }

    const userIP = getClientIP(request);

    // 检查用户今天是否已经点赞
    const { data, error } = await supabase.rpc('has_user_liked_today', {
      p_product_id: productId,
      p_user_ip: userIP
    });

    if (error) {
      console.error('检查点赞状态失败:', error);
      return NextResponse.json(
        { error: '检查点赞状态失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({ hasLikedToday: data });

  } catch (error) {
    console.error('检查点赞状态API错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
} 
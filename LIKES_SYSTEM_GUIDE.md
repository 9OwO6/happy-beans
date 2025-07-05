# ❤️ 热度点赞系统指南

## 🎯 功能概述

将原有的收藏功能升级为热度点赞系统，用户可以为喜欢的商品点赞，系统会记录点赞数并支持按热度排序。

## 🗄️ 数据库更新

### 1. 执行数据库脚本
运行 `create_likes_table.sql` 脚本来创建点赞系统所需的数据库结构：

```sql
-- 创建点赞记录表
CREATE TABLE product_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_ip VARCHAR(45) NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, user_ip, DATE(created_at))
);

-- 为products表添加likes_count字段
ALTER TABLE products ADD COLUMN likes_count INTEGER DEFAULT 0;
```

### 2. 数据库功能
- **点赞记录表**: 记录每个用户的点赞信息
- **IP限制**: 每个IP每天只能给每个商品点赞一次
- **自动计数**: 触发器自动维护产品的总点赞数
- **行级安全**: 确保数据安全访问

## 🔧 API接口

### 点赞API (`/api/likes`)

#### POST - 添加点赞
```javascript
POST /api/likes
Content-Type: application/json

{
  "productId": "product-uuid"
}

Response:
{
  "success": true,
  "message": "点赞成功",
  "likes_count": 15
}
```

#### DELETE - 取消点赞
```javascript
DELETE /api/likes
Content-Type: application/json

{
  "productId": "product-uuid"
}

Response:
{
  "success": true,
  "message": "取消点赞成功",
  "likes_count": 14
}
```

#### GET - 检查点赞状态
```javascript
GET /api/likes?productId=product-uuid

Response:
{
  "hasLikedToday": true
}
```

## 🎨 界面更新

### 1. 产品卡片
- **点赞按钮**: 右上角小红心，点击切换点赞状态
- **点赞数显示**: 左上角显示当前点赞数
- **视觉反馈**: 已点赞显示红色心形，未点赞显示白色心形

### 2. 产品详情弹窗
- **点赞按钮**: 底部操作区域，显示"点赞"/"已点赞"
- **实时更新**: 点赞后立即更新显示状态

### 3. 排序功能
- **新增排序选项**: "热度"排序，按点赞数从高到低排列
- **排序位置**: 在价格和名称排序之间

### 4. 统计显示
- **页面统计**: 显示当前页面的总热度（点赞数总和）
- **分类统计**: 分类详情页面显示该分类的总热度

## 🛡️ 安全特性

### 1. IP限制
- 每个IP地址每天只能给每个商品点赞一次
- 防止恶意刷赞行为

### 2. 用户识别
- 记录用户IP地址和用户代理信息
- 支持代理服务器环境

### 3. 数据完整性
- 使用数据库约束确保数据一致性
- 触发器自动维护点赞计数

## 📱 用户体验

### 1. 操作流程
1. 用户点击商品卡片上的心形按钮
2. 系统检查用户今天是否已点赞
3. 如果未点赞，添加点赞记录并更新计数
4. 如果已点赞，显示提示信息

### 2. 反馈机制
- **成功反馈**: 点赞成功，按钮变红，计数增加
- **错误反馈**: 显示具体错误信息（如"今天已经点赞过了"）
- **网络错误**: 显示网络错误提示

### 3. 实时更新
- 点赞后立即更新本地状态
- 无需刷新页面即可看到变化

## 🔄 更新内容

### 修改的文件
1. **数据库**: `create_likes_table.sql`
2. **API**: `src/app/api/likes/route.ts`
3. **产品页面**: `src/app/products/page.tsx`
4. **分类详情**: `src/app/categories/[id]/page.tsx`

### 新增功能
- ✅ 点赞/取消点赞功能
- ✅ 按热度排序
- ✅ 点赞数显示
- ✅ IP限制防刷
- ✅ 实时状态更新

### 移除功能
- ❌ 收藏功能（替换为点赞）
- ❌ 收藏统计（替换为热度统计）

## 🚀 部署步骤

1. **执行数据库脚本**
   ```bash
   # 在Supabase中执行 create_likes_table.sql
   ```

2. **重启应用**
   ```bash
   npm run dev
   ```

3. **测试功能**
   - 测试点赞/取消点赞
   - 测试热度排序
   - 测试IP限制

## 💡 注意事项

1. **数据迁移**: 现有产品的点赞数初始化为0
2. **性能考虑**: 点赞操作使用数据库函数，确保原子性
3. **用户体验**: 提供清晰的反馈信息
4. **安全性**: 使用IP限制防止恶意操作

## 🎉 功能特色

- **简单易用**: 一键点赞，操作简单
- **防刷机制**: IP限制确保公平性
- **实时反馈**: 即时更新点赞状态
- **排序支持**: 支持按热度排序商品
- **数据持久**: 所有点赞数据永久保存 
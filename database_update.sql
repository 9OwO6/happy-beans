-- 数据库表结构更新脚本
-- 请在 Supabase SQL Editor 中执行以下命令

-- 1. 添加新字段到 products 表
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS category_id TEXT,
ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- 2. 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock);
CREATE INDEX IF NOT EXISTS idx_products_tags ON products USING GIN(tags);

-- 3. 更新现有数据的 category_id 字段
-- 根据现有的 category 字段设置对应的 category_id
UPDATE products 
SET category_id = CASE 
  WHEN category = '潮流摆件' THEN 'trendy-decor'
  WHEN category = '衣帽穿搭' THEN 'fashion-wear'
  WHEN category = '实用好物' THEN 'practical-goods'
  WHEN category = '颜值补给' THEN 'beauty-supplies'
  WHEN category = '节日精选' THEN 'festival-special'
  WHEN category = '次元小铺' THEN 'anime-shop'
  WHEN category = '无用之美' THEN 'useless-beauty'
  ELSE NULL
END
WHERE category_id IS NULL;

-- 4. 为现有产品设置默认库存
UPDATE products 
SET stock = 10 
WHERE stock IS NULL OR stock = 0;

-- 5. 为现有产品设置默认标签
UPDATE products 
SET tags = ARRAY['新品'] 
WHERE tags IS NULL OR array_length(tags, 1) IS NULL;

-- 6. 为现有产品设置 image_urls（如果有 image_url）
UPDATE products 
SET image_urls = ARRAY[image_url] 
WHERE image_url IS NOT NULL AND (image_urls IS NULL OR array_length(image_urls, 1) IS NULL);

-- 7. 验证更新结果
SELECT 
  COUNT(*) as total_products,
  COUNT(CASE WHEN image_urls IS NOT NULL THEN 1 END) as products_with_image_urls,
  COUNT(CASE WHEN category_id IS NOT NULL THEN 1 END) as products_with_category_id,
  COUNT(CASE WHEN stock > 0 THEN 1 END) as products_with_stock,
  COUNT(CASE WHEN array_length(tags, 1) > 0 THEN 1 END) as products_with_tags
FROM products;

-- 8. 显示表结构（可选）
-- \d products; 
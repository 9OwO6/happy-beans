-- 创建全新的 products 表
-- 请在 Supabase SQL Editor 中执行以下命令

-- 1. 删除现有的 products 表（如果存在）
DROP TABLE IF EXISTS products CASCADE;

-- 2. 创建新的 products 表
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT, -- 主图URL
    image_urls TEXT[] DEFAULT '{}', -- 多图URL数组
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0, -- 库存数量
    category TEXT, -- 分类名称
    category_id TEXT, -- 分类ID
    tags TEXT[] DEFAULT '{}', -- 标签数组
    status TEXT DEFAULT 'on' CHECK (status IN ('on', 'off')), -- 商品状态：on=上架，off=下架
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建索引以提高查询性能
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_stock ON products(stock);
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX idx_products_tags ON products USING GIN(tags);
CREATE INDEX idx_products_image_urls ON products USING GIN(image_urls);

-- 4. 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 5. 设置 RLS (Row Level Security) 策略
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取上架的商品
CREATE POLICY "Allow public read access to active products" ON products
    FOR SELECT USING (status = 'on');

-- 允许认证用户读取所有商品（用于管理）
CREATE POLICY "Allow authenticated users to read all products" ON products
    FOR SELECT USING (auth.role() = 'authenticated');

-- 允许认证用户插入商品
CREATE POLICY "Allow authenticated users to insert products" ON products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 允许认证用户更新商品
CREATE POLICY "Allow authenticated users to update products" ON products
    FOR UPDATE USING (auth.role() = 'authenticated');

-- 允许认证用户删除商品
CREATE POLICY "Allow authenticated users to delete products" ON products
    FOR DELETE USING (auth.role() = 'authenticated');

-- 6. 插入一些示例数据
INSERT INTO products (name, description, image_url, image_urls, price, stock, category, category_id, tags) VALUES
('可爱猫咪抱枕', '超柔软的猫咪造型抱枕，采用优质毛绒面料，手感舒适，是居家必备的可爱装饰品。', 'https://example.com/cat-pillow.jpg', ARRAY['https://example.com/cat-pillow.jpg', 'https://example.com/cat-pillow-2.jpg'], 89.00, 50, '潮流摆件', 'trendy-decor', ARRAY['新品', '热销', '可爱']),
('时尚帆布包', '简约时尚的帆布包，大容量设计，适合日常使用，环保材质，时尚百搭。', 'https://example.com/canvas-bag.jpg', ARRAY['https://example.com/canvas-bag.jpg'], 129.00, 30, '衣帽穿搭', 'fashion-wear', ARRAY['新品', '实用']),
('多功能收纳盒', '可折叠的多功能收纳盒，帮助整理桌面杂物，让生活更加整洁有序。', 'https://example.com/storage-box.jpg', ARRAY['https://example.com/storage-box.jpg'], 45.00, 100, '实用好物', 'practical-goods', ARRAY['实用', '收纳']),
('玫瑰金化妆镜', 'LED补光化妆镜，高清镜面，三档调光，让化妆更加精准完美。', 'https://example.com/makeup-mirror.jpg', ARRAY['https://example.com/makeup-mirror.jpg'], 158.00, 25, '颜值补给', 'beauty-supplies', ARRAY['美妆', 'LED']),
('圣诞装饰套装', '精美的圣诞装饰套装，包含各种节日装饰品，为节日增添欢乐氛围。', 'https://example.com/christmas-decor.jpg', ARRAY['https://example.com/christmas-decor.jpg'], 199.00, 20, '节日精选', 'festival-special', ARRAY['节日', '圣诞']),
('动漫手办模型', '精美的动漫手办模型，高精度制作，是动漫爱好者的收藏佳品。', 'https://example.com/anime-figure.jpg', ARRAY['https://example.com/anime-figure.jpg'], 299.00, 15, '次元小铺', 'anime-shop', ARRAY['动漫', '手办']),
('手工陶瓷花瓶', '手工制作的陶瓷花瓶，独特的艺术设计，为家居增添艺术气息。', 'https://example.com/ceramic-vase.jpg', ARRAY['https://example.com/ceramic-vase.jpg'], 268.00, 10, '无用之美', 'useless-beauty', ARRAY['手工', '艺术']);

-- 7. 验证表创建结果
SELECT 
    'Table created successfully!' as status,
    COUNT(*) as total_products,
    COUNT(CASE WHEN image_urls IS NOT NULL THEN 1 END) as products_with_multiple_images,
    COUNT(CASE WHEN category_id IS NOT NULL THEN 1 END) as products_with_category_id,
    COUNT(CASE WHEN stock > 0 THEN 1 END) as products_with_stock,
    COUNT(CASE WHEN array_length(tags, 1) > 0 THEN 1 END) as products_with_tags
FROM products;

-- 8. 显示表结构
\d products; 
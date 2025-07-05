-- 创建点赞记录表
CREATE TABLE IF NOT EXISTS product_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_ip VARCHAR(45) NOT NULL, -- 存储用户IP地址
    user_agent TEXT, -- 存储用户代理信息，用于更精确的识别
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    like_date DATE DEFAULT CURRENT_DATE -- 添加日期字段用于唯一约束
);

-- 创建唯一约束，确保每个IP每天只能给每个商品点赞一次
ALTER TABLE product_likes ADD CONSTRAINT unique_product_ip_date 
    UNIQUE(product_id, user_ip, like_date);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_product_likes_product_id ON product_likes(product_id);
CREATE INDEX IF NOT EXISTS idx_product_likes_user_ip ON product_likes(user_ip);
CREATE INDEX IF NOT EXISTS idx_product_likes_created_at ON product_likes(created_at);
CREATE INDEX IF NOT EXISTS idx_product_likes_like_date ON product_likes(like_date);
CREATE INDEX IF NOT EXISTS idx_product_likes_unique_constraint ON product_likes(product_id, user_ip, like_date);

-- 为products表添加likes_count字段
ALTER TABLE products ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0;

-- 创建触发器函数，自动更新产品的点赞数
CREATE OR REPLACE FUNCTION update_product_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE products 
        SET likes_count = likes_count + 1 
        WHERE id = NEW.product_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE products 
        SET likes_count = likes_count - 1 
        WHERE id = OLD.product_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器
DROP TRIGGER IF EXISTS trigger_update_product_likes_count ON product_likes;
CREATE TRIGGER trigger_update_product_likes_count
    AFTER INSERT OR DELETE ON product_likes
    FOR EACH ROW
    EXECUTE FUNCTION update_product_likes_count();

-- 创建函数来检查用户今天是否已经点赞
CREATE OR REPLACE FUNCTION has_user_liked_today(p_product_id UUID, p_user_ip VARCHAR(45))
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM product_likes 
        WHERE product_id = p_product_id 
        AND user_ip = p_user_ip 
        AND like_date = CURRENT_DATE
    );
END;
$$ LANGUAGE plpgsql;

-- 创建函数来添加点赞
CREATE OR REPLACE FUNCTION add_product_like(p_product_id UUID, p_user_ip VARCHAR(45), p_user_agent TEXT DEFAULT NULL)
RETURNS JSON AS $$
DECLARE
    result JSON;
    current_likes INTEGER;
BEGIN
    -- 检查是否今天已经点赞
    IF has_user_liked_today(p_product_id, p_user_ip) THEN
        result := json_build_object(
            'success', false,
            'message', '今天已经点赞过了',
            'likes_count', (SELECT likes_count FROM products WHERE id = p_product_id)
        );
    ELSE
        -- 添加点赞记录
        INSERT INTO product_likes (product_id, user_ip, user_agent, like_date)
        VALUES (p_product_id, p_user_ip, p_user_agent, CURRENT_DATE);
        
        -- 获取更新后的点赞数
        SELECT likes_count INTO current_likes FROM products WHERE id = p_product_id;
        
        result := json_build_object(
            'success', true,
            'message', '点赞成功',
            'likes_count', current_likes
        );
    END IF;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 创建函数来移除点赞（如果需要的话）
CREATE OR REPLACE FUNCTION remove_product_like(p_product_id UUID, p_user_ip VARCHAR(45))
RETURNS JSON AS $$
DECLARE
    result JSON;
    current_likes INTEGER;
BEGIN
    -- 删除今天的点赞记录
    DELETE FROM product_likes 
    WHERE product_id = p_product_id 
    AND user_ip = p_user_ip 
    AND like_date = CURRENT_DATE;
    
    -- 获取更新后的点赞数
    SELECT likes_count INTO current_likes FROM products WHERE id = p_product_id;
    
    result := json_build_object(
        'success', true,
        'message', '取消点赞成功',
        'likes_count', current_likes
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 设置行级安全策略
ALTER TABLE product_likes ENABLE ROW LEVEL SECURITY;

-- 允许所有用户查看点赞记录
CREATE POLICY "Allow read access to product_likes" ON product_likes
    FOR SELECT USING (true);

-- 允许所有用户添加点赞记录
CREATE POLICY "Allow insert access to product_likes" ON product_likes
    FOR INSERT WITH CHECK (true);

-- 允许用户删除自己的点赞记录（基于IP）
CREATE POLICY "Allow delete own likes" ON product_likes
    FOR DELETE USING (user_ip = current_setting('request.headers', true)::json->>'x-forwarded-for' OR 
                     user_ip = current_setting('request.headers', true)::json->>'x-real-ip' OR
                     user_ip = inet_client_addr()::text);

-- 更新现有产品的点赞数为0（如果还没有设置的话）
UPDATE products SET likes_count = 0 WHERE likes_count IS NULL;

-- 插入一些示例点赞数据（可选）
-- INSERT INTO product_likes (product_id, user_ip, user_agent) VALUES 
-- ('your-product-id-1', '192.168.1.1', 'Mozilla/5.0...'),
-- ('your-product-id-2', '192.168.1.2', 'Mozilla/5.0...');

COMMENT ON TABLE product_likes IS '产品点赞记录表，记录用户对产品的点赞信息';
COMMENT ON COLUMN product_likes.user_ip IS '用户IP地址，用于限制每个IP每天只能点赞一次';
COMMENT ON COLUMN product_likes.user_agent IS '用户代理信息，用于更精确的用户识别';
COMMENT ON COLUMN products.likes_count IS '产品的总点赞数，由触发器自动维护'; 
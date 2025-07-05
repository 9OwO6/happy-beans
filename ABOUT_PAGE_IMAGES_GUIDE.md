# 🎨 关于我们页面图片添加指南

## 📁 图片存放位置

建议在 `public/images/about/` 文件夹中存放关于我们页面的图片：

```
public/images/about/
├── delivery-service.jpg     # 配送服务图片
├── wechat-qr.png           # 微信二维码
├── instagram-qr.png        # Instagram二维码
└── team-photos/            # 团队成员照片（可选）
    ├── member1.jpg
    ├── member2.jpg
    └── member3.jpg
```

## 🚚 配送服务图片

### 文件位置
```
public/images/about/delivery-service.jpg
```

### 图片规格
- **尺寸**: 800x600 像素 (4:3 比例)
- **格式**: JPG 或 PNG
- **文件大小**: 建议小于 500KB
- **内容建议**: 
  - 配送车辆或配送员
  - 可爱的配送包装
  - 配送路线图
  - 温馨的配送场景

## 📱 微信二维码

### 文件位置
```
public/images/about/wechat-qr.png
```

### 图片规格
- **尺寸**: 300x300 像素 (1:1 比例)
- **格式**: PNG（支持透明背景）
- **文件大小**: 建议小于 200KB
- **内容**: 清晰的微信二维码，便于扫描

## 📸 Instagram二维码

### 文件位置
```
public/images/about/instagram-qr.png
```

### 图片规格
- **尺寸**: 300x300 像素 (1:1 比例)
- **格式**: PNG（支持透明背景）
- **文件大小**: 建议小于 200KB
- **内容**: Instagram主页二维码或链接

## 🖼️ 团队成员照片（可选）

### 文件位置
```
public/images/about/team-photos/
```

### 图片规格
- **尺寸**: 400x400 像素 (1:1 比例)
- **格式**: JPG 或 PNG
- **文件大小**: 建议小于 300KB
- **内容**: 团队成员的专业照片或可爱头像

## 🔧 代码更新

### 1. 配送服务图片
在配送服务部分添加图片：

```tsx
<div className="text-center p-8 bg-white/80 rounded-3xl shadow-lg backdrop-blur-sm border border-white/20">
  <img 
    src="/images/about/delivery-service.jpg" 
    alt="福豆配送服务" 
    className="w-full h-48 object-cover rounded-2xl mb-6"
  />
  <h3 className="text-2xl font-cute font-bold text-cute-pink mb-2">配送服务</h3>
  {/* 其他内容 */}
</div>
```

### 2. 微信二维码
在联系方式部分添加二维码：

```tsx
<div className="text-center p-6 bg-gradient-to-r from-[#FFB6B9]/10 to-[#A5D8FA]/10 rounded-2xl">
  <div className="text-4xl mb-4">📱</div>
  <h3 className="text-2xl font-cute font-bold text-cute-pink mb-2">微信客服</h3>
  <p className="text-lg font-body-cute text-cute-blue mb-4">扫描二维码添加客服</p>
  <img 
    src="/images/about/wechat-qr.png" 
    alt="微信二维码" 
    className="w-32 h-32 mx-auto rounded-2xl shadow-lg"
  />
  <p className="text-sm font-body-cute text-cute-purple mt-2">点击查看二维码</p>
</div>
```

### 3. Instagram二维码
在联系方式部分添加Instagram：

```tsx
<div className="text-center p-6 bg-gradient-to-r from-[#A5D8FA]/10 to-[#FFD6E0]/10 rounded-2xl">
  <div className="text-4xl mb-4">📸</div>
  <h3 className="text-2xl font-cute font-bold text-cute-pink mb-2">Instagram</h3>
  <p className="text-lg font-body-cute text-cute-blue mb-4">关注我们的最新动态</p>
  <img 
    src="/images/about/instagram-qr.png" 
    alt="Instagram二维码" 
    className="w-32 h-32 mx-auto rounded-2xl shadow-lg"
  />
  <p className="text-sm font-body-cute text-cute-purple mt-2">@happydou_shop</p>
</div>
```

## 🎯 设计建议

### 1. 配送服务图片
- 使用温暖、可爱的色调
- 体现快速、便捷的配送特点
- 可以包含品牌元素（如福豆logo）

### 2. 二维码
- 确保二维码清晰可扫描
- 可以添加品牌装饰元素
- 保持简洁的设计风格

### 3. 整体风格
- 与网站可爱风格保持一致
- 使用圆角、阴影等设计元素
- 保持色彩搭配的和谐

## 📝 操作步骤

1. **创建文件夹**: 在 `public/images/` 下创建 `about` 文件夹
2. **准备图片**: 按照规格要求准备各种图片
3. **上传图片**: 将图片放入对应文件夹
4. **更新代码**: 在页面中添加图片引用
5. **测试显示**: 刷新页面查看效果

## 💡 注意事项

- 确保图片文件大小适中，避免影响页面加载速度
- 图片格式建议使用 JPG（照片）和 PNG（图标、二维码）
- 保持图片的清晰度和可读性
- 定期更新二维码，确保链接有效 
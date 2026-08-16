# 艺术作品集网站 · Demo v1

艺术创作者个人作品集网站（插画 / 漫画 / 油画 / 证书 / 个人介绍）。
当前为 **Demo 演示版本**：所有作品、文字、图片均为占位示意，正式上线前整体替换。

## 运行方式

任选其一（均需在 `portfolio/` 目录下执行）：

```bash
# 方式一：零依赖 Node 静态服务器（推荐，MIME 最稳）
node serve.mjs
# 或自定义端口：PORT=8080 node serve.mjs

# 方式二：Python
python -m http.server 8080
```

然后用浏览器打开 `http://localhost:5173`（或对应端口）。
> 说明：因使用 ES Module，需通过 http 服务器访问，直接双击 `index.html`（file://）会被浏览器拦截。

后台登录（Demo 单管理员）：`admin` / `demo1234`

## 目录结构（前台 / 后台 / 数据访问 / 媒体存储 解耦）

```
portfolio/
├─ index.html                 # 应用外壳（导航 + 主区 + 页脚）
├─ serve.mjs                  # 零依赖静态服务器
├─ src/
│  ├─ main.js                 # 入口：装配路由与站点框架
│  ├─ core/                   # 与业务无关的基础能力
│  │  ├─ dom.js               #   极简 DOM 构建工具
│  │  └─ router.js            #   基于 hash 的前端路由
│  ├─ data/                   # 数据访问层（与 UI 解耦，统一接口）
│  │  ├─ types.js             #   领域模型与常量
│  │  ├─ seed.js              #   Demo 数据（12 插画 / 4 漫画 / 2 油画 / 8 证书）
│  │  ├─ repository.js        #   WorkRepository 接口 + Mock 实现（localStorage 持久化）
│  │  ├─ storage.js           #   MediaStorage 接口 + Mock 实现（对象存储抽象）
│  │  ├─ auth.js              #   AuthProvider 接口 + Mock 实现（单管理员）
│  │  └─ services.js          #   全局单例（前台/后台共享同一实例）
│  ├─ ui/
│  │  ├─ components/          # 可复用 UI 原子
│  │  │  ├─ media.js          #   Demo 占位图生成（标注 DEMO）
│  │  │  ├─ site.js          #   导航 + 页脚
│  │  │  ├─ primitives.js     #   标签 / 空状态 / 确认弹窗 / Toast
│  │  │  ├─ workCard.js       #   作品卡片
│  │  │  ├─ filterBar.js      #   检索与筛选栏
│  │  │  └─ comicReader.js    #   漫画阅读器组件
│  │  └─ pages/               # 页面（路由视图）
│  │     ├─ home.js  works.js  workDetail.js
│  │     ├─ comicReaderPage.js  about.js
│  │     └─ admin/            # 后台：login / dashboard / workEdit / comicPages / layout
│  └─ styles/                 # 设计系统（美拉德 Maillard 暖色 tokens + 基础/组件/页面/响应式）
```

## 后续接入正式服务（替换点）

仅需在 `src/data/` 中提供相同接口的实现，UI 层无需改动：

- **数据库**：实现 `WorkRepository`（如 PostgreSQL / Supabase / 自建 REST）。
- **对象存储**：实现 `MediaStorage`（如 阿里云 OSS / 腾讯云 COS / AWS S3 / 七牛）。
- **鉴权**：实现 `AuthProvider`（如 OAuth / 后端会话 / JWT）。

替换 `src/data/services.js` 中的单例即可完成切换。

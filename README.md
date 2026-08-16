# 邱钰真 QIU YUZHEN · 艺术作品集（正式真实素材版 v1）

插画 / 漫画 / 油画创作者的个人作品集网站。**本版已接入客户真实作品与真实简历文字**，可直接用于客户验收预览。

> 数据来源：18 张个人插画、2 幅油画、5 部漫画（课程作业 20 页 / 马拉松 8 页 / 毕业设计 42 页 / CP30 同人志 13 页 / 代代木毕业设计 27 页）、7 张真实荣誉证书（仅展示于「关于」页）。
> 后台当前仍使用 Mock 接口完成视觉预览，未接入正式数据库 / 对象存储（替换点见文末）。

## 运行方式（本地预览，必须经由 http 服务器）

本站使用 ES Module，直接双击 `index.html`（`file://`）会被浏览器拦截，**必须用本地服务器打开**。任选其一，在解压后的项目根目录执行：

### 方式 A：一键启动脚本（推荐，无需记命令）
- **Windows**：双击 `start.bat`
- **macOS / Linux**：在终端执行 `sh start.sh`（若提示权限不足，先 `chmod +x start.sh`）

脚本会自动检测本机是否安装了 Python 或 Node，启动静态服务器并打开浏览器。默认端口 Windows 为 `8080`，Node 为 `5173`。

### 方式 B：手动命令
```bash
# 需要 Python 3（绝大多数系统自带）
python -m http.server 8080
# 或指定端口：python -m http.server 5173

# 或需要 Node.js
node serve.mjs            # 默认 5173 端口
PORT=8080 node serve.mjs  # 自定义端口
```
然后浏览器打开 `http://localhost:8080`（或对应端口）。

## 页面导览
- **首页 `/`**：《旅途》主视觉 + 编辑式精选 4 件作品。
- **作品 `/works`**：全部 / 插画 / 漫画 / 油画 筛选；按质量与年份综合排序。漫画以「一部 = 一个项目」呈现。
- **作品详情 `/work/:id`**：大图 + 文字介绍。
- **漫画阅读 `/comic/:id`**：连续纵向阅读，暖白背景，大作（42 / 27 页）已启用懒加载。
- **关于 `/about`**：01 简介 / 02 教育（中传南广 2017–2021、代代木动画学院 2024–2026）/ 03 经历·项目 / 04 技能（CSP · SAI · Photoshop · JLPT N2）/ 05 荣誉（7 证书 + 少年连续金奖文字概括）。

## 目录结构
```
portfolio/
├─ index.html                 # 应用外壳（导航 + 主区 + 页脚）
├─ serve.mjs                  # 零依赖 Node 静态服务器（正确 MIME）
├─ start.bat / start.sh       # 一键本地启动脚本
├─ src/
│  ├─ main.js                 # 入口：装配路由与站点框架
│  ├─ core/                   # 与业务无关的基础能力（dom / router）
│  ├─ data/                   # 数据访问层（与 UI 解耦，统一接口）
│  │  ├─ types.js             #   领域模型与常量（类型 / 阶段 / 排序）
│  │  ├─ seed.js              #   真实作品数据（18 插画 / 5 漫画 / 2 油画 / 7 证书）
│  │  ├─ assets.gen.js        #   真实素材清单（路径 + 尺寸，由素材包生成）
│  │  ├─ repository.js        #   WorkRepository 接口 + Mock 实现（localStorage 持久化）
│  │  ├─ storage.js           #   MediaStorage 接口 + Mock 实现
│  │  ├─ auth.js               #   AuthProvider 接口 + Mock 实现（单管理员）
│  │  └─ services.js          #   全局单例（前台/后台共享同一实例）
│  ├─ ui/
│  │  ├─ components/          # 可复用 UI 原子（site / workCard / filterBar / comicReader / media / primitives）
│  │  └─ pages/               # 页面（home / works / workDetail / comicReaderPage / about / admin）
│  └─ styles/                 # 设计系统（美拉德 Maillard 暖色 tokens + 基础 / 组件 / 页面 / 响应式）
└─ assets/                    # 网页优化后的真实素材（已压缩，非原始高清）
   ├─ illustration/           #   18 张插画
   ├─ oil/                    #   2 幅油画
   ├─ comic/                  #   5 部漫画分页（course2020 / marathon2020 / grad2021 / cp30 / yoyogi2026）
   └─ cert/                   #   7 张荣誉证书
```

## 后台（Mock，仅用于视觉预览）
本地访问 `/#/admin` 可进入后台（Mock 单管理员）：`admin` / `demo1234`。
后台结构保留，但当前未接入真实数据库；正式上线时替换 `src/data/` 下的接口实现即可，UI 层无需改动。

## 后续接入正式服务（替换点）
仅需在 `src/data/` 中提供相同接口的实现，UI 层无需改动：
- **数据库**：实现 `WorkRepository`（如 PostgreSQL / Supabase / 自建 REST）。
- **对象存储**：实现 `MediaStorage`（如 阿里云 OSS / 腾讯云 COS / AWS S3 / 七牛）。
- **鉴权**：实现 `AuthProvider`（如 OAuth / 后端会话 / JWT）。
替换 `src/data/services.js` 中的单例即可完成切换。

# OpenCampusKB 中文说明

> **开发状态：** 项目仍在快速更新中，暂不建议下载或用于生产；建议几天后再查看。

[English README](README.md)

OpenCampusKB 是一个面向团队的、具备严格治理能力的 AI 知识库系统。系统围绕已审核资料、来源引用和管理员可控的入库流程设计，避免模型产生幻觉或不受控发言。

这个项目最早来自 **CityUInfo** 的生产经验。CityUInfo 是一个面向香港城市大学新生的非官方资料整理和 AI 问答项目。开源版本保留了产品结构、资料审核流程、匿名使用模型、来源引用逻辑、反馈系统和 Cloudflare Pages + Workers 的部署思路，但移除了真实资料、密钥、日志、后台账号和生产数据。

- 线上参考项目：[CityUInfo](https://cityuinfo.royilab.com)
- GitHub 仓库：[RoyNiu06/open-campus-kb](https://github.com/RoyNiu06/open-campus-kb)
- 当前示例版本：`v3.0.1-example`

## 项目介绍

OpenCampusKB 强调“先审核、再入库、回答带来源”。资料上传后默认处于待审核状态，由管理员统一进行通过、拒绝、修改元数据、停用、归档或删除等操作，确保进入知识库的内容尽可能准确、合规、可追溯。

用户端可以免登录使用。部署方可通过匿名 ID 实现点数限制、防滥用监控、历史记录和可选分析；如果已经明确告知用户并获得同意，管理员可以查看匿名对话内容，用来发现常见问题、改进知识库覆盖范围和优化回答质量。

系统默认采用 RAG，即检索增强生成。用户问题会先匹配已审核文档切块，再由模型根据检索结果生成带引用的回答。当前本地 Demo 使用 mock 文档和关键词检索，生产环境应替换为 embedding、混合检索和向量数据库。

CityUInfo 最新版本还加入了 **Course Engine** 思路：对于课程、专业、学习计划这类结构化问题，先由轻量路由判断是否进入专门的结构化引擎，再和 RAG 结果结合。虽然名字来自课程规划，但这种模式也可以扩展到企业制度、项目手册、产品目录、工单流程、研究资料、客服知识库等场景。

OpenCampusKB 不只适用于学校，也适用于企业内部知识库、项目小组资料库、研究团队、社群 FAQ、入职培训、客服支持和任何需要受控知识检索的场景。

AI 层可以替换。你可以接入 OpenRouter、OpenAI、Anthropic、Gemini、DeepSeek 等托管服务，也可以改成本地模型或私有化模型，以满足更强隐私需求。

## 核心特性

- 审核优先：上传资料不会自动进入检索，需要管理员审核。
- 来源可追溯：回答尽量展示引用来源、标签、文件类型和相关度。
- 匿名免登录：适合低门槛使用，同时保留限额和防滥用空间。
- 反馈闭环：支持点赞、点踩、对话反馈、建议反馈和更新通知邮箱。
- 多语言示例：示例前端包含简体中文、繁体中文和英文切换。
- Pages + Workers：前端适合部署到 Cloudflare Pages，API 适合放在 Workers。
- Course Engine：可为结构化领域问题提供比纯 RAG 更稳定的检索路径。
- 可扩展：后续可加入本地模型、多租户、企业登录、OCR、统计面板和复杂权限系统。

## 本仓库包含什么

- 可本地运行的 mock 示例。
- Next `app/` 前端，用于 Pages 风格部署。
- Worker API 示例，包括 `/api/chat`、上传、反馈、邮箱通知和文档接口。
- Course Engine / RAG / Hybrid 路由演示。
- 标签、引用编号、相关度评分、反馈入口和轻量耗时字段。
- `templates/campus-template` 通用模板。
- `examples/cityuinfo` 脱敏 CityUInfo 示例。
- Supabase schema 草案。
- 架构、部署、隐私、安全和适配文档。

## 本仓库不包含什么

- 真实学校 PDF 或内部资料。
- API key、Supabase service-role key、Cloudflare token、GitHub token 或 AI provider key。
- 生产后台账号。
- 私人使用日志或可识别用户数据。
- 完整托管的生产 SaaS。

## 本地启动

```bash
git clone https://github.com/RoyNiu06/open-campus-kb.git
cd open-campus-kb
npm install
npm run check
npm run app:dev
```

打开：

```text
http://127.0.0.1:3000
```

如果想测试 Pages 前端 + Worker API 的拆分模式，可以先启动 Worker：

```bash
npm run dev
```

再启动前端：

```bash
NEXT_PUBLIC_OPEN_CAMPUS_API_BASE=http://127.0.0.1:8788 npm run app:dev
```

## 常用命令

```bash
npm run check          # Worker 语法检查
npm run app:dev        # Next app 本地前端
npm run pages:build    # 构建静态 Pages 输出
npm run preview        # Worker 本地预览
npm run seed:example   # 解析示例 seed 文档
npm run check:release  # 发布前检查和密钥模式扫描
```

## 适配建议

1. 从 `templates/campus-template` 和 `examples/cityuinfo` 开始。
2. 修改项目名、域名、语言、标签和来源可信度。
3. 用安全的公开示例资料替换 mock 文档。
4. 根据需要接入 Supabase、R2、AI provider、本地模型和 Turnstile。
5. 真实文件、后台密码、service-role key、生产日志不要提交到公开仓库。

## 许可证

MIT

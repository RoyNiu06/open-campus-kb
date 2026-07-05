# OpenCampusKB 中文说明

OpenCampusKB 是一个开源框架，用来构建“经过审核、基于来源、有引用”的知识库和 AI 问答助手。

[English README](README.md)

这个项目最早来自 **CityUInfo** 的生产经验。CityUInfo 是一个面向香港城市大学新生的非官方资料整理和 AI 问答项目。开源版本保留了产品结构、资料审核流程、匿名使用模型、来源引用逻辑和部署思路，但移除了真实资料、密钥、日志、后台账号和生产数据。

- 线上参考项目：[CityUInfo](https://cityuinfo.royilab.com)
- GitHub 仓库：[RoyNiu06/open-campus-kb](https://github.com/RoyNiu06/open-campus-kb)
- 当前示例版本：`v2.4.0-example`

## 项目介绍

OpenCampusKB 是一个面向团队的、具备严格治理能力的 AI 知识库系统。系统围绕已审核资料、来源引用和管理员可控的入库流程设计，避免模型产生幻觉或不受控发言。

### 核心特性

审核优先流程：资料上传后默认处于待审核状态，由管理员统一进行通过、拒绝、修改元数据或停用等操作，确保入库内容准确合规。

免登录与防滥用：用户端支持匿名使用，部署方可通过匿名 ID 实现点数限制、防滥用监控，并在用户知情同意的前提下查看对话日志以优化知识库。

RAG 架构与来源追溯：基于检索增强生成技术，系统仅从已审核的文档切块中检索上下文并生成带引用的回答。目前本地 Demo 使用 Mock 文档和关键词检索，生产环境可替换为向量数据库。

AI 层解耦替换：支持接入 OpenRouter、OpenAI、Gemini、DeepSeek 等托管服务，亦可对接本地或私有化模型，满足高隐私场景需求。

### 应用场景

适用于学校、企业内部知识库、项目小组资料库、研究团队、社群 FAQ、入职培训及客服支持等需要受控知识检索的场景。

### 后续规划

项目架构保留了较大的扩展空间，后续可继续完善文件解析与 OCR、多租户模式、企业级登录（SSO）、统计数据面板及更复杂的权限管理系统。

## 核心原则

- AI 回答优先基于已审核资料。
- 回答尽量附来源。
- 没有可靠资料时明确说明不确定，不编造。
- 用户上传资料不能直接进入知识库，必须先审核。
- 管理员应能控制资料状态和元数据。
- 匿名使用要清楚告知、合理限流、保护隐私。
- 密钥必须只放在后端或部署平台 secret 中，不能进前端和公开仓库。
- 框架应能适配学校、企业、项目组和其他社群。

## 这个仓库包含什么

- 可本地运行的 mock demo，包含资料展示和基于来源的问答。
- 更接近生产环境的 Next `app/` 前端结构，适合部署到 Cloudflare Pages。
- Worker API mock，用来展示 `/api/*` 后端边界。
- 旧版单 Worker preview，作为低门槛本地预览和兼容 fallback。
- `templates/campus-template` 通用模板。
- `examples/cityuinfo` 脱敏版 CityUInfo 示例和 mock seed documents。
- Supabase schema 脚手架，用于 documents、chunks、questions、feedback 等表。
- 架构、部署、隐私、发布策略和适配说明文档。
- 发布前检查脚本，用于检查必需文件、Worker 语法、seed 解析和常见密钥模式。

## 这个仓库不包含什么

- 真实大学 PDF 或私人资料。
- API key、Supabase service-role key、Cloudflare token、GitHub token 或 AI provider key。
- 生产后台账号密码。
- 私人使用日志或可识别用户身份的数据。
- 完整托管版 SaaS 服务。

## 本地启动 Demo

要求：

- 推荐 Node.js 22 或更新版本。
- npm。

命令：

```bash
git clone https://github.com/RoyNiu06/open-campus-kb.git
cd open-campus-kb
npm install
npm run check
npm run app:dev
```

然后打开：

```text
http://127.0.0.1:3000
```

Pages 风格前端提供：

- `/` mock 来源约束问答
- `/kb/` mock 知识库卡片
- `/upload/` 文件、文本和链接上传审核流程展示
- `/about/` 项目、架构、反馈和安全说明

如果要模拟生产拆分，可以先在一个终端启动 Worker API：

```bash
npm run dev
```

再在另一个终端启动前端，并指向 API：

```bash
NEXT_PUBLIC_OPEN_CAMPUS_API_BASE=http://127.0.0.1:8788 npm run app:dev
```

Worker API 提供：

- `/api/chat` mock 检索问答 API
- `/api/upload` mock 待审核上传 API
- `/api/documents` mock 文档 API
- `/api/feedback` mock 反馈 API
- `/api/email-notification` mock 更新通知邮箱 API
- `/health` 健康检查

本地 demo 不需要 OpenRouter、Supabase、R2、Turnstile，也不需要登录。正式部署时应将 mock 检索替换为真实向量库和审核入库流程。

如果你想使用旧版单 Worker preview：

```bash
npm run preview
```

## 常用命令

```bash
npm run check          # 检查 Worker 语法
npm run app:dev        # Next app 前端，地址为 127.0.0.1:3000
npm run pages:build    # 生成适合 Cloudflare Pages 的静态导出
npm run preview        # 旧版单 Worker preview，地址为 127.0.0.1:8788
npm run seed:example   # 把 mock CityUInfo 文档解析成 JSON
npm run check:release  # 发布前检查和常见密钥扫描
```

## 推荐架构

真实部署建议：

- 前端：Cloudflare Pages、Vercel 或其他静态前端平台；示例使用 Next `app/` 静态导出。
- 后端 API：Cloudflare Workers，建议挂在 `/api/*`。
- 数据库：Supabase Postgres + `pgvector`，或其他兼容 Postgres 的数据库。
- 文件存储：Cloudflare R2 或其他对象存储。
- AI provider：OpenRouter、OpenAI、Anthropic、Gemini、DeepSeek、本地模型或其他 provider。
- Embedding：可配置 embedding 模型，并存入向量数据库。
- 人机验证：Cloudflare Turnstile 或类似服务，用于保护公开上传入口。

问答流程：

```text
用户提问
-> 匿名 ID / session 限额检查
-> 检索已通过审核的文档 chunks
-> 调用模型并传入来源上下文
-> 返回答案和引用
-> 记录使用量和可选反馈
```

入库流程：

```text
用户上传或管理员录入资料
-> 待审核
-> 管理员通过
-> 文本提取
-> 切块
-> embedding
-> 存入向量库
-> 可被 RAG 检索
```

## 如何改成自己的学校、企业或团队

建议从这些文件开始：

- `templates/campus-template`
- `examples/cityuinfo`
- `docs/adaptation-guide.md`
- `.env.example`

基本步骤：

1. 替换项目名称、组织名称和域名。
2. 修改分类，比如入学、选课、宿舍、签注、校园生活、内部政策、项目文档等。
3. 修改来源可信度，比如官方资料、组织认证资料、成员整理资料。
4. 替换 mock seed documents。
5. 按需配置 Supabase、R2、AI provider、本地模型和 Turnstile。
6. 不要把真实密钥、后台密码、用户日志、私人文件提交到 GitHub。

## 给 AI 的本地启动 Prompt

你可以把下面这段发给 Codex、Cursor、Claude Code 或其他 AI 编程助手：

```text
请帮我在本地启动 OpenCampusKB 开源 demo。

仓库地址：https://github.com/RoyNiu06/open-campus-kb

任务：
1. 克隆仓库。
2. 安装 npm 依赖。
3. 运行语法检查和发布检查。
4. 启动本地 preview server。
5. 打开或输出 localhost 地址。
6. 验证 /health 返回 ok，并验证 /api/chat 能返回带 sources 的回答。

限制：
- 本地 demo 不需要任何生产 API key。
- 不要创建或暴露密钥。
- 如果 Wrangler local dev 失败，就使用 npm run preview。
- 最后告诉我运行过的命令和本地 URL。
```

## 给 AI 的学校、企业或团队适配 Prompt

你可以把下面这段发给 AI，让它协助你把项目改成自己的版本：

```text
我想把 OpenCampusKB 改造成我所在学校、企业、项目组或社群的资料知识库和 AI 问答助手。

请先阅读仓库结构，然后帮我创建专属版本。

组织信息：
- 组织名称：
- 项目名称：
- 域名：
- 支持语言：
- 主要用户群体：
- 初始分类：
- 来源可信度分级：
- 联系邮箱：
- 是否官方项目：
- 是否允许用户同意后查看匿名对话用于改进服务：
- 使用托管模型还是本地模型：

实现目标：
1. 修改 template 和 example config。
2. 用安全的公开示例资料替换 mock seed documents。
3. 所有密钥都不能写进仓库。
4. 用户上传资料必须 pending，管理员审核后才能入库。
5. AI 回答必须优先基于来源，并展示引用。
6. 添加清晰的免责声明、隐私说明和反馈邮箱。
7. 默认支持免登录匿名 ID 限额。
8. 根据 .env.example 准备环境变量。
9. 如果我使用 Cloudflare，请指导我配置 Pages、Workers、R2、Turnstile，以及可选 MCP 或 Wrangler。
10. 如果我使用 Supabase，请指导我创建 organization/project、执行 migration、启用 pgvector，并只把 service role key 放在后端 secret。
11. 如果我使用本地模型，请说明后端需要如何改造，以及如何保证模型接口不暴露在公网前端。
12. 如果需要 token，请让我创建最小权限 token，并放进部署平台的 secret manager。不要硬编码到前端，也不要提交到 Git。

修改前：
- 先说明你会改哪些文件。
- 区分通用框架修改和组织专属内容。
- 不要加入真实私人 PDF、截图、邮件、日志、账号密码或用户数据。

修改后：
- 运行 npm run check:release。
- 启动本地 preview。
- 验证 /health、/api/documents、/api/chat 和主要页面。
- 总结还需要哪些真实生产配置。
```

## 给 AI 的 Cloudflare + Supabase 部署 Prompt

真正准备上线时，可以使用这段：

```text
请帮我用 Cloudflare 和 Supabase 部署 OpenCampusKB。

请谨慎操作，不要暴露任何密钥。

Cloudflare 目标：
- 如果有静态前端，用 Pages 部署前端。
- 用 Workers 提供 /api/*。
- 用 R2 存储上传文件。
- 用 Turnstile 保护公开上传入口。
- 如果可用，可以使用 Wrangler 或 Cloudflare MCP。

Supabase 目标：
- 创建或使用一个 Supabase project。
- 执行 supabase/migrations 下的 schema。
- 启用 pgvector。
- 保存 documents、chunks、questions、feedback、usage logs 和 review metadata。
- service-role key 只能放在后端，不允许出现在前端。

AI 目标：
- 通过后端 secret 配置 chat model 和 embedding model。
- 只检索 approved chunks。
- prompt 必须要求回答引用来源，资料不足时说明不确定。
- 如果使用本地模型，模型接口应保持私有，只允许后端调用。

安全要求：
- API key 不能写进前端。
- 不能提交 .env 或 .dev.vars。
- 尽量使用最小权限 token。
- 明确告诉我需要创建哪些 secret，以及粘贴到哪里。
- 每次 git commit 前先做 secret scan。
```

## 发布前检查

```bash
npm run check
npm run seed:example
npm run check:release
```

也建议阅读：

- `docs/release-checklist.md`
- `docs/security-and-privacy.md`
- `SECURITY.md`
- `.env.example`

## 许可证

MIT

# 社交媒体内容日历生成器

一个前端本地运行的中文内容规划工具。输入账号定位、受众、风格和计划周期，生成 1 周或 1 月的内容日历，覆盖干货、互动、故事、热点借势，并为每条内容标注执行难度。

## 技术栈

- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- shadcn/ui 风格基础组件

## 本地启动

```bash
npm install
npm run dev
```

默认开发地址：`http://localhost:5173`

## 构建

```bash
npm run build
```

## 当前能力

- 输入领域、受众、风格、周期
- 支持 `1周` 和 `1月`
- 本地规则生成内容支柱和日历排期
- 节假日和行业热点模板关联
- 每条内容附带难度和目标说明
- 内置两个示例账号预设

## 相关文档

- 产品与实现方案：[docs/plans/2026-04-06-social-calendar-design.md](docs/plans/2026-04-06-social-calendar-design.md)
- 工作区开发约束：[AGENTS.md](AGENTS.md)

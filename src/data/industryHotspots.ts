import type { IndustryHotspot } from '@/types/content'

export const INDUSTRY_HOTSPOTS: IndustryHotspot[] = [
    {
        id: 'ai-productivity',
        title: 'AI效率工具上新潮',
        description: '围绕新工具、新工作流和替代方案做借势内容。',
        months: [1, 4, 9],
        keywords: ['ai', '工具', '效率', '办公', '自动化', '生产力'],
        angle: '用一个新工具变化，带出旧流程怎么被重做。',
    },
    {
        id: 'fitness-season',
        title: '减脂打卡季',
        description: '适合结合体重管理、训练计划和打卡互动。',
        months: [3, 4, 5, 6],
        keywords: ['健身', '减脂', '塑形', '训练', '运动'],
        angle: '把阶段目标拆成更容易坚持的小动作和检查点。',
    },
    {
        id: 'spring-skincare',
        title: '换季护肤节点',
        description: '结合肤感变化、产品选择和误区提醒切入。',
        months: [3, 4, 9, 10],
        keywords: ['护肤', '美妆', '皮肤', '护发', '穿搭'],
        angle: '强调换季痛点，再给出低门槛应对方案。',
    },
    {
        id: 'job-hunting',
        title: '求职与转岗窗口期',
        description: '适合职场成长、简历优化、表达训练类内容。',
        months: [2, 3, 6, 9],
        keywords: ['职场', '求职', '转岗', '成长', '沟通', '管理'],
        angle: '从真实场景拆解常见误区，给出可执行的表达方式。',
    },
    {
        id: 'creator-review',
        title: '账号复盘与调优周期',
        description: '适合所有内容创作者做数据复盘和选题更新。',
        months: [1, 4, 7, 10, 12],
        keywords: ['博主', '创作者', '内容', '运营', '账号'],
        angle: '围绕最近一个阶段的数据变化，总结保留与调整项。',
    },
    {
        id: 'generic-consumption',
        title: '季节性消费决策节点',
        description: '适合做清单、避坑和选择逻辑相关内容。',
        months: [4, 5, 11, 12],
        keywords: ['通用'],
        angle: '围绕“该不该做”或“怎么选”给出明确判断框架。',
    },
]
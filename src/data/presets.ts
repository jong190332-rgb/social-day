import type { PresetExample } from '@/types/content'

export const PRESET_EXAMPLES: PresetExample[] = [
    {
        id: 'ai-office-week',
        label: '示例一：AI效率账号',
        blurb: '面向普通上班族，适合验证 1 周内容节奏。',
        input: {
            niche: 'AI 工具效率',
            audience: '普通上班族',
            style: '轻松亲切',
            period: 'week',
        },
    },
    {
        id: 'fitness-month',
        label: '示例二：健身减脂账号',
        blurb: '面向减脂新手，适合验证 1 月排期和热点安排。',
        input: {
            niche: '健身减脂',
            audience: '减脂新手',
            style: '专业理性',
            period: 'month',
        },
    },
]
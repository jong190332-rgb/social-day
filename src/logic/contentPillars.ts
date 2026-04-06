import type { GeneratorInput } from '@/types/content'

interface PillarRule {
    keywords: string[]
    pillars: string[]
}

const PILLAR_RULES: PillarRule[] = [
    {
        keywords: ['ai', '工具', '效率', '办公', '自动化'],
        pillars: ['提效技巧', '工具测评', '工作流示例', '常见误区', '学习路径'],
    },
    {
        keywords: ['健身', '减脂', '训练', '塑形', '运动'],
        pillars: ['饮食误区', '动作教学', '训练计划', '学员故事', '打卡互动'],
    },
    {
        keywords: ['护肤', '美妆', '穿搭', '皮肤'],
        pillars: ['成分认知', '产品选择', '换季问题', '真实体验', '互动问答'],
    },
    {
        keywords: ['职场', '求职', '管理', '沟通', '成长'],
        pillars: ['表达技巧', '场景拆解', '认知升级', '真实案例', '高频问题'],
    },
    {
        keywords: ['内容', '博主', '运营', '账号', '创作'],
        pillars: ['选题方法', '数据复盘', '账号定位', '内容结构', '用户互动'],
    },
]

const GENERIC_PILLARS = ['常见误区', '实用技巧', '案例拆解', '用户互动', '趋势观察']

function normalize(value: string) {
    return value.trim().toLowerCase()
}

export function getContentPillars(input: GeneratorInput) {
    const niche = normalize(input.niche)
    const matchedRule = PILLAR_RULES.find((rule) => rule.keywords.some((keyword) => niche.includes(keyword)))
    const basePillars = matchedRule?.pillars ?? GENERIC_PILLARS

    if (input.audience.includes('新手')) {
        return basePillars.slice(0, 5).map((pillar, index) => (index === 0 ? `新手入门·${pillar}` : pillar))
    }

    return basePillars.slice(0, 5)
}

export function describeTone(style: string) {
    if (style.includes('专业')) return '用更专业、清晰的表达给出判断标准。'
    if (style.includes('轻松')) return '用更轻松、好理解的口吻降低理解门槛。'
    if (style.includes('故事')) return '先讲场景和转折，再落到可执行建议。'
    if (style.includes('犀利')) return '先抛出反常识观点，再解释为什么。'

    return '表达要直接，结论要能马上拿去用。'
}
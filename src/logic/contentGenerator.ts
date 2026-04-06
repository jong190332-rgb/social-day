import { HOLIDAYS } from '@/data/holidays'
import { INDUSTRY_HOTSPOTS } from '@/data/industryHotspots'
import { getContentPillars, describeTone } from '@/logic/contentPillars'
import { createPlanDates, formatDateLabel, formatIsoDate, includesMonth } from '@/logic/dateUtils'
import { getDifficultyLevel } from '@/logic/difficultyRules'
import type {
    CalendarEntry,
    ContentType,
    GeneratedPlan,
    GeneratorInput,
    HolidayDefinition,
    IndustryHotspot,
} from '@/types/content'

const WEEK_PATTERN: ContentType[] = ['干货', '互动', '故事', '干货', '热点借势', '互动', '故事']

const MONTH_PATTERN: ContentType[] = [
    '干货',
    '互动',
    '故事',
    '干货',
    '互动',
    '热点借势',
    '故事',
    '干货',
    '互动',
    '热点借势',
]

const FALLBACK_TYPES: ContentType[] = ['干货', '互动', '故事']

function hashText(value: string) {
    return Array.from(value).reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 3), 17)
}

function normalize(value: string) {
    return value.trim().toLowerCase()
}

function getHoliday(date: Date) {
    return HOLIDAYS.find((holiday) => holiday.month === date.getMonth() + 1 && holiday.day === date.getDate()) ?? null
}

function getRelevantHotspots(input: GeneratorInput, dates: Date[]) {
    const niche = normalize(input.niche)
    const matches = INDUSTRY_HOTSPOTS.filter((hotspot) => {
        const keywordMatch = hotspot.keywords.some((keyword) => keyword === '通用' || niche.includes(keyword))
        const monthMatch = dates.some((date) => includesMonth(hotspot.months, date))
        return keywordMatch && monthMatch
    })

    return matches.length > 0 ? matches : INDUSTRY_HOTSPOTS.filter((hotspot) => hotspot.keywords.includes('通用'))
}

function choosePillar(pillars: string[], indexSeed: number, previousPillar: string | null) {
    const startIndex = indexSeed % pillars.length
    for (let offset = 0; offset < pillars.length; offset += 1) {
        const pillar = pillars[(startIndex + offset) % pillars.length]
        if (pillar !== previousPillar) {
            return pillar
        }
    }

    return pillars[startIndex]
}

function chooseType(
    patternType: ContentType,
    previousType: ContentType | null,
    isHoliday: boolean,
    indexSeed: number,
) {
    if (isHoliday) {
        return '热点借势' satisfies ContentType
    }

    if (patternType !== previousType) {
        return patternType
    }

    return FALLBACK_TYPES[(indexSeed + 1) % FALLBACK_TYPES.length]
}

function getGoal(type: ContentType) {
    switch (type) {
        case '干货':
            return '建立专业度'
        case '互动':
            return '拉互动'
        case '故事':
            return '拉近关系'
        case '热点借势':
            return '提升点击与时效感'
    }
}

function buildTitle(
    type: ContentType,
    pillar: string,
    input: GeneratorInput,
    holiday: HolidayDefinition | null,
    hotspot: IndustryHotspot | null,
    variant: number,
) {
    const audience = input.audience.trim() || '目标用户'

    const dryGoods = [
        `${pillar}：${audience}最该先补的3个动作`,
        `${pillar}别急着做，先把这3个坑避开`,
        `${pillar}完整清单：先做什么，再做什么`,
    ]
    const interactive = [
        `做${pillar}时，你最卡的是哪一步？`,
        `${pillar}这件事，你更想先解决哪个问题？`,
        `关于${pillar}，你最想让我下一条展开什么？`,
    ]
    const story = [
        `一个关于${pillar}的真实转变故事`,
        `我最近在${pillar}上做对的一件小事`,
        `从混乱到稳定：${pillar}背后的一个案例`,
    ]

    if (type === '热点借势' && holiday) {
        return `借${holiday.name}聊${pillar}`
    }

    if (type === '热点借势' && hotspot) {
        return `借${hotspot.title}做一条${pillar}内容`
    }

    if (type === '互动') {
        return interactive[variant % interactive.length]
    }

    if (type === '故事') {
        return story[variant % story.length]
    }

    return dryGoods[variant % dryGoods.length]
}

function buildDirection(
    type: ContentType,
    pillar: string,
    input: GeneratorInput,
    holiday: HolidayDefinition | null,
    hotspot: IndustryHotspot | null,
) {
    const tone = describeTone(input.style)

    if (type === '互动') {
        return `围绕“${pillar}”抛出一个单点问题，引导${input.audience}留言、投票或补充自己的经验。${tone}`
    }

    if (type === '故事') {
        return `用一个具体场景讲清楚${input.niche}里“${pillar}”前后变化，再落到一条可复制的建议。${tone}`
    }

    if (type === '热点借势' && holiday) {
        return `把${holiday.name}的节日情绪和${input.niche}中的“${pillar}”连接起来，给${input.audience}一个当下就能执行的切入点。${tone}`
    }

    if (type === '热点借势' && hotspot) {
        return `结合“${hotspot.title}”的讨论热度，从“${pillar}”切入，强调为什么现在做这条内容更容易被关注。${tone}`
    }

    return `把${input.niche}中的“${pillar}”拆成清晰步骤、判断标准或避坑提醒，让${input.audience}看完就知道下一步怎么做。${tone}`
}

function buildHotspotLabel(holiday: HolidayDefinition | null, hotspot: IndustryHotspot | null) {
    if (holiday) {
        return `${holiday.name}｜${holiday.reason}`
    }

    if (hotspot) {
        return `${hotspot.title}｜${hotspot.description}`
    }

    return '常规内容安排'
}

function createEntry(
    date: Date,
    type: ContentType,
    pillar: string,
    input: GeneratorInput,
    holiday: HolidayDefinition | null,
    hotspot: IndustryHotspot | null,
    variant: number,
): CalendarEntry {
    const title = buildTitle(type, pillar, input, holiday, hotspot, variant)
    const hotspotLabel = buildHotspotLabel(holiday, hotspot)

    return {
        date: formatIsoDate(date),
        dateLabel: formatDateLabel(date),
        title,
        direction: buildDirection(type, pillar, input, holiday, hotspot),
        type,
        hotspot: hotspotLabel,
        difficulty: getDifficultyLevel(type, title, hotspotLabel),
        pillar,
        goal: getGoal(type),
    }
}

export function generateCalendarPlan(input: GeneratorInput, baseDate = new Date()): GeneratedPlan {
    const dates = createPlanDates(input.period, baseDate)
    const pillars = getContentPillars(input)
    const pattern = input.period === 'week' ? WEEK_PATTERN : MONTH_PATTERN
    const hotspots = getRelevantHotspots(input, dates)
    const seed = hashText(`${input.niche}|${input.audience}|${input.style}|${input.period}`)

    let previousType: ContentType | null = null
    let previousPillar: string | null = null
    let hotspotIndex = 0

    const entries = dates.map((date, index) => {
        const holiday = getHoliday(date)
        const patternType = pattern[index % pattern.length]
        const type = chooseType(patternType, previousType, Boolean(holiday), seed + index)
        const pillar = choosePillar(pillars, seed + index * 3, previousPillar)

        let hotspot: IndustryHotspot | null = null
        if (!holiday && type === '热点借势' && hotspots.length > 0) {
            hotspot = hotspots[hotspotIndex % hotspots.length]
            hotspotIndex += 1
        }

        const entry = createEntry(date, type, pillar, input, holiday, hotspot, seed + index)
        previousType = entry.type
        previousPillar = entry.pillar

        return entry
    })

    const holidayMatches = entries
        .filter((entry) => entry.type === '热点借势' && entry.hotspot !== '常规内容安排')
        .map((entry) => {
            const [name, reason] = entry.hotspot.split('｜')
            return {
                date: entry.date,
                name,
                reason,
            }
        })
        .filter((match, index, array) => array.findIndex((item) => item.date === match.date && item.name === match.name) === index)

    const hotspotTitles = Array.from(
        new Set(
            entries
                .filter((entry) => entry.type === '热点借势')
                .map((entry) => entry.hotspot.split('｜')[0]),
        ),
    )

    return {
        entries,
        pillars,
        holidayMatches,
        hotspotTitles,
    }
}
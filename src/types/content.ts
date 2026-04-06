export type PlanPeriod = 'week' | 'month'

export type ContentType = '干货' | '互动' | '故事' | '热点借势'

export type DifficultyLevel = '低' | '中' | '高'

export interface GeneratorInput {
    niche: string
    audience: string
    style: string
    period: PlanPeriod
}

export interface CalendarEntry {
    date: string
    dateLabel: string
    title: string
    direction: string
    type: ContentType
    hotspot: string
    difficulty: DifficultyLevel
    pillar: string
    goal: string
}

export interface HolidayDefinition {
    id: string
    name: string
    month: number
    day: number
    reason: string
}

export interface IndustryHotspot {
    id: string
    title: string
    description: string
    months: number[]
    keywords: string[]
    angle: string
}

export interface PresetExample {
    id: string
    label: string
    blurb: string
    input: GeneratorInput
}

export interface HolidayMatch {
    date: string
    name: string
    reason: string
}

export interface GeneratedPlan {
    entries: CalendarEntry[]
    pillars: string[]
    holidayMatches: HolidayMatch[]
    hotspotTitles: string[]
}

export const CONTENT_TYPES: ContentType[] = ['干货', '互动', '故事', '热点借势']

export const PERIOD_OPTIONS: Array<{ value: PlanPeriod; label: string }> = [
    { value: 'week', label: '1周' },
    { value: 'month', label: '1月' },
]
import type { PlanPeriod } from '@/types/content'

const DAY_MS = 24 * 60 * 60 * 1000

export function getStartDate(base = new Date()) {
    return new Date(base.getFullYear(), base.getMonth(), base.getDate(), 12, 0, 0, 0)
}

export function addDays(date: Date, days: number) {
    return new Date(date.getTime() + days * DAY_MS)
}

export function createPlanDates(period: PlanPeriod, base = new Date()) {
    const length = period === 'week' ? 7 : 30
    const startDate = getStartDate(base)

    return Array.from({ length }, (_, index) => addDays(startDate, index))
}

export function formatIsoDate(date: Date) {
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, '0')
    const day = `${date.getDate()}`.padStart(2, '0')

    return `${year}-${month}-${day}`
}

export function formatDateLabel(date: Date) {
    return new Intl.DateTimeFormat('zh-CN', {
        month: 'numeric',
        day: 'numeric',
        weekday: 'short',
    }).format(date)
}

export function monthOf(date: Date) {
    return date.getMonth() + 1
}

export function includesMonth(months: number[], date: Date) {
    return months.includes(monthOf(date))
}
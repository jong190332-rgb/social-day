import type { ContentType, DifficultyLevel } from '@/types/content'

export function getDifficultyLevel(type: ContentType, title: string, hotspot: string): DifficultyLevel {
    if (type === '互动') {
        return '低'
    }

    if (type === '故事') {
        return '中'
    }

    if (type === '热点借势') {
        const isStrongTimeSensitive = hotspot.includes('上新') || hotspot.includes('双十一') || hotspot.includes('年终')
        return isStrongTimeSensitive ? '高' : '中'
    }

    const isDeepDive = title.includes('框架') || title.includes('清单') || title.includes('完整')
    return isDeepDive ? '高' : '中'
}
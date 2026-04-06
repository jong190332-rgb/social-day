import type { HolidayDefinition } from '@/types/content'

export const HOLIDAYS: HolidayDefinition[] = [
    { id: 'new-year', name: '元旦', month: 1, day: 1, reason: '适合做新年计划、清单和开局内容。' },
    { id: 'valentines-day', name: '情人节', month: 2, day: 14, reason: '适合做人群关系、礼物、情绪和表达相关选题。' },
    { id: 'womens-day', name: '妇女节', month: 3, day: 8, reason: '适合做女性成长、消费决策和品牌态度相关内容。' },
    { id: 'earth-day', name: '世界地球日', month: 4, day: 22, reason: '适合从习惯改变、可持续选择和生活方式角度借势。' },
    { id: 'labor-day', name: '劳动节', month: 5, day: 1, reason: '适合做效率、休息、职业状态和生活平衡相关内容。' },
    { id: 'childrens-day', name: '儿童节', month: 6, day: 1, reason: '适合做亲子、成长、初心和轻松互动主题。' },
    { id: 'teachers-day', name: '教师节', month: 9, day: 10, reason: '适合做知识、成长、经验总结和感谢主题。' },
    { id: 'national-day', name: '国庆节', month: 10, day: 1, reason: '适合做长假安排、出行、复盘和节奏管理内容。' },
    { id: 'singles-day', name: '双十一', month: 11, day: 11, reason: '适合做消费决策、清单推荐和避坑内容。' },
    { id: 'year-end', name: '年终总结季', month: 12, day: 20, reason: '适合做复盘、盘点、规划和下一年目标内容。' },
]
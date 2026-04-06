import type { GeneratedPlan, GeneratorInput } from '@/types/content'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface StrategyExplanationProps {
    input: GeneratorInput
    plan: GeneratedPlan
}

export function StrategyExplanation({ input, plan }: StrategyExplanationProps) {
    const typeDistribution = plan.entries.reduce(
        (accumulator, entry) => {
            accumulator[entry.type] += 1
            return accumulator
        },
        { 干货: 0, 互动: 0, 故事: 0, 热点借势: 0 },
    )

    return (
        <Card className="border-slate-200/80 bg-slate-950 text-slate-50 shadow-xl shadow-slate-900/10">
            <CardHeader>
                <CardTitle className="text-slate-50">内容策略说明</CardTitle>
                <CardDescription className="text-slate-300">
                    这份日历不是随机拼接，而是按支柱、类型配比和热点规则生成。
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-sm leading-7 text-slate-200">
                <div className="flex flex-wrap gap-2">
                    {plan.pillars.map((pillar) => (
                        <Badge key={pillar} variant="secondary" className="bg-slate-800 text-slate-100">
                            {pillar}
                        </Badge>
                    ))}
                </div>

                <p>
                    账号定位围绕“{input.niche}”展开，面向“{input.audience}”，因此内容支柱优先覆盖
                    {plan.pillars.slice(0, 3).join('、')}等长期主题，避免整个月都围绕单一角度打转。
                </p>

                <p>
                    当前周期内的内容类型分布为：干货 {typeDistribution['干货']} 条、互动 {typeDistribution['互动']} 条、故事 {typeDistribution['故事']} 条、热点借势 {typeDistribution['热点借势']} 条。
                    这样做的目的，是让账号既有专业度，也有讨论感和真实感。
                </p>

                <p>
                    热点部分优先检查固定节日，其次补充行业热点模板。
                    {plan.holidayMatches.length > 0
                        ? `本次命中的热点包括 ${plan.holidayMatches.map((item) => item.name).join('、')}。`
                        : '本次周期没有命中固定节日，因此使用了行业热点模板来保持时效性。'}
                </p>

                <p>
                    难度标注采用规则判断：互动内容默认偏低，故事内容通常为中，系统化干货和强时效热点会被标记为中到高，方便你安排拍摄、写稿和素材准备节奏。
                </p>
            </CardContent>
        </Card>
    )
}
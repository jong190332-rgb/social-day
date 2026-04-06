import type { GeneratorInput, PlanPeriod } from '@/types/content'
import { PERIOD_OPTIONS } from '@/types/content'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface InputFormProps {
    value: GeneratorInput
    onChange: (nextValue: GeneratorInput) => void
    onSubmit: (nextValue?: GeneratorInput) => void
    hasPendingChanges: boolean
}

export function InputForm({ value, onChange, onSubmit, hasPendingChanges }: InputFormProps) {
    const updateField = (field: keyof GeneratorInput, nextValue: string | PlanPeriod) => {
        const nextFormValue = {
            ...value,
            [field]: nextValue,
        }

        onChange(nextFormValue)

        if (field === 'period') {
            onSubmit(nextFormValue)
        }
    }

    return (
        <Card className="border-white/60 bg-white/75 shadow-lg shadow-slate-200/60">
            <CardHeader>
                <CardTitle>输入账号定位</CardTitle>
                <CardDescription>先告诉工具你是谁、面对谁、想用什么语气说话。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="niche">领域</Label>
                    <Input
                        id="niche"
                        value={value.niche}
                        onChange={(event) => updateField('niche', event.target.value)}
                        placeholder="例如：AI 工具效率 / 健身减脂 / 职场成长"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="audience">受众</Label>
                    <Input
                        id="audience"
                        value={value.audience}
                        onChange={(event) => updateField('audience', event.target.value)}
                        placeholder="例如：普通上班族 / 减脂新手 / 新手博主"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="style">风格</Label>
                    <Textarea
                        id="style"
                        value={value.style}
                        onChange={(event) => updateField('style', event.target.value)}
                        placeholder="例如：专业理性 / 轻松亲切 / 故事化表达"
                        className="min-h-24"
                    />
                </div>

                <div className="space-y-3">
                    <Label>计划周期</Label>
                    <div className="flex flex-wrap gap-3">
                        {PERIOD_OPTIONS.map((option) => (
                            <Button
                                key={option.value}
                                type="button"
                                variant={value.period === option.value ? 'default' : 'outline'}
                                onClick={() => updateField('period', option.value)}
                            >
                                {option.label}
                            </Button>
                        ))}
                    </div>
                </div>

                <Button size="lg" className="w-full" onClick={() => onSubmit()}>
                    {hasPendingChanges ? '生成内容日历' : '已同步当前结果'}
                </Button>
            </CardContent>
        </Card>
    )
}
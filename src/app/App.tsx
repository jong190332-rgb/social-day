import { useState } from 'react'
import { CalendarDays, Compass, WandSparkles } from 'lucide-react'

import { CalendarView } from '@/components/CalendarView'
import { InputForm } from '@/components/InputForm'
import { PresetExamples } from '@/components/PresetExamples'
import { StrategyExplanation } from '@/components/StrategyExplanation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PRESET_EXAMPLES } from '@/data/presets'
import { generateCalendarPlan } from '@/logic/contentGenerator'
import type { GeneratedPlan, GeneratorInput, PresetExample } from '@/types/content'

const defaultInput = PRESET_EXAMPLES[0].input

function createPlan(input: GeneratorInput): GeneratedPlan {
    return generateCalendarPlan(input)
}

function isSameInput(left: GeneratorInput, right: GeneratorInput) {
    return (
        left.niche === right.niche &&
        left.audience === right.audience &&
        left.style === right.style &&
        left.period === right.period
    )
}

function App() {
    const [input, setInput] = useState<GeneratorInput>(defaultInput)
    const [plan, setPlan] = useState<GeneratedPlan>(() => createPlan(defaultInput))
    const [lastGeneratedInput, setLastGeneratedInput] = useState<GeneratorInput>(defaultInput)
    const [lastGeneratedAt, setLastGeneratedAt] = useState<number>(() => Date.now())

    const handleGenerate = (nextInput = input) => {
        setInput(nextInput)
        setPlan(createPlan(nextInput))
        setLastGeneratedInput(nextInput)
        setLastGeneratedAt(Date.now())
    }

    const handlePreset = (preset: PresetExample) => {
        handleGenerate(preset.input)
    }

    const hasPendingChanges = !isSameInput(input, lastGeneratedInput)
    const generatedPeriodLabel = lastGeneratedInput.period === 'week' ? '7天' : '30天'
    const generatedTimeLabel = new Intl.DateTimeFormat('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(lastGeneratedAt)

    return (
        <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <section className="grid gap-6 rounded-4xl border border-white/70 bg-white/70 p-6 shadow-xl shadow-slate-200/50 backdrop-blur xl:grid-cols-[1.15fr_0.85fr] xl:p-8">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-sm text-primary">
                        <WandSparkles className="size-4" />
                        社交媒体内容日历生成器
                    </div>

                    <div className="space-y-4">
                        <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                            给账号一份能马上执行的中文内容排期
                        </h1>
                        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                            输入领域、受众、风格和周期，系统会用本地规则生成一份 1 周或 1 月的内容日历，覆盖干货、互动、故事和热点借势。
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                        <Card className="bg-slate-950 text-slate-50">
                            <CardContent className="flex items-start gap-3 p-4">
                                <Compass className="mt-0.5 size-5 text-amber-300" />
                                <div>
                                    <p className="font-medium">定位驱动</p>
                                    <p className="text-sm text-slate-300">先生成内容支柱，再排期，不靠随机拼接。</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-slate-950 text-slate-50">
                            <CardContent className="flex items-start gap-3 p-4">
                                <CalendarDays className="mt-0.5 size-5 text-teal-300" />
                                <div>
                                    <p className="font-medium">周期清晰</p>
                                    <p className="text-sm text-slate-300">只支持 1 周和 1 月，保证输出稳定可控。</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-slate-950 text-slate-50">
                            <CardContent className="flex items-start gap-3 p-4">
                                <WandSparkles className="mt-0.5 size-5 text-sky-300" />
                                <div>
                                    <p className="font-medium">热点有依据</p>
                                    <p className="text-sm text-slate-300">优先命中节日，再用行业热点模板补充时效性。</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="space-y-4 rounded-3xl border border-amber-200/60 bg-linear-to-br from-amber-50 to-sky-50 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">前端本地生成</Badge>
                        <Badge variant="outline">中文优先</Badge>
                        <Badge variant="outline">规则驱动</Badge>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">当前预览</p>
                        <div className="space-y-2 rounded-2xl bg-white/80 p-4 shadow-sm">
                            <p className="text-lg font-semibold">{input.niche}</p>
                            <p className="text-sm text-muted-foreground">受众：{input.audience}</p>
                            <p className="text-sm text-muted-foreground">风格：{input.style}</p>
                            <p className="text-sm text-muted-foreground">周期：{input.period === 'week' ? '1周' : '1月'}</p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-muted-foreground shadow-sm">
                        {hasPendingChanges
                            ? '你已经修改了输入，结果区还没刷新。点击“生成内容日历”即可更新。'
                            : `已更新 ${generatedPeriodLabel} 计划，最近一次生成时间 ${generatedTimeLabel}。`}
                    </div>

                    <Button variant="secondary" className="w-full" onClick={() => handleGenerate()}>
                        {hasPendingChanges ? '应用当前输入并重新生成' : '重新生成当前方案'}
                    </Button>
                </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
                <div className="space-y-6 xl:sticky xl:top-6 xl:self-start">
                    <PresetExamples onApply={handlePreset} />
                    <InputForm
                        value={input}
                        onChange={setInput}
                        onSubmit={handleGenerate}
                        hasPendingChanges={hasPendingChanges}
                    />
                </div>

                <div className="space-y-6">
                    <CalendarView entries={plan.entries} />
                    <StrategyExplanation input={input} plan={plan} />
                </div>
            </section>
        </main>
    )
}

export default App
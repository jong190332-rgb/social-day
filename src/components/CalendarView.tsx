import type { CalendarEntry } from '@/types/content'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface CalendarViewProps {
    entries: CalendarEntry[]
}

function getTypeBadgeVariant(type: CalendarEntry['type']) {
    switch (type) {
        case '干货':
            return 'default' as const
        case '互动':
            return 'secondary' as const
        case '故事':
            return 'outline' as const
        case '热点借势':
            return 'muted' as const
    }
}

function getDifficultyVariant(difficulty: CalendarEntry['difficulty']) {
    switch (difficulty) {
        case '低':
            return 'secondary' as const
        case '中':
            return 'outline' as const
        case '高':
            return 'default' as const
    }
}

export function CalendarView({ entries }: CalendarViewProps) {
    const summary = entries.reduce(
        (accumulator, entry) => {
            accumulator[entry.type] += 1
            return accumulator
        },
        { 干货: 0, 互动: 0, 故事: 0, 热点借势: 0 },
    )

    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">共 {entries.length} 天</Badge>
                <Badge variant="default">干货 {summary['干货']}</Badge>
                <Badge variant="secondary">互动 {summary['互动']}</Badge>
                <Badge variant="outline">故事 {summary['故事']}</Badge>
                <Badge variant="muted">热点借势 {summary['热点借势']}</Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {entries.map((entry) => (
                    <Card key={entry.date} className="border-white/60 bg-white/78 shadow-md shadow-slate-200/45">
                        <CardHeader className="space-y-3">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <CardTitle className="text-lg">{entry.dateLabel}</CardTitle>
                                    <CardDescription>{entry.date}</CardDescription>
                                </div>
                                <Badge variant={getDifficultyVariant(entry.difficulty)}>难度 {entry.difficulty}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant={getTypeBadgeVariant(entry.type)}>{entry.type}</Badge>
                                <Badge variant="outline">支柱：{entry.pillar}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-foreground">{entry.title}</h3>
                                <p className="text-sm leading-6 text-muted-foreground">{entry.direction}</p>
                            </div>

                            <Separator />

                            <dl className="space-y-3 text-sm">
                                <div>
                                    <dt className="mb-1 font-medium text-foreground">热点安排</dt>
                                    <dd className="leading-6 text-muted-foreground">{entry.hotspot}</dd>
                                </div>
                                <div>
                                    <dt className="mb-1 font-medium text-foreground">主要目标</dt>
                                    <dd className="text-muted-foreground">{entry.goal}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
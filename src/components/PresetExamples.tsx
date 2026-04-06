import { Sparkles } from 'lucide-react'

import { PRESET_EXAMPLES } from '@/data/presets'
import type { PresetExample } from '@/types/content'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface PresetExamplesProps {
    onApply: (preset: PresetExample) => void
}

export function PresetExamples({ onApply }: PresetExamplesProps) {
    return (
        <Card className="border-white/60 bg-white/70 shadow-lg shadow-slate-200/50">
            <CardHeader>
                <CardTitle>快速载入示例</CardTitle>
                <CardDescription>直接切换两个预设，检查 1 周和 1 月两种生成效果。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
                {PRESET_EXAMPLES.map((preset) => (
                    <Button
                        key={preset.id}
                        type="button"
                        variant="outline"
                        className="h-auto items-start justify-between gap-4 rounded-xl px-4 py-4 text-left"
                        onClick={() => onApply(preset)}
                    >
                        <span className="space-y-1">
                            <span className="block text-sm font-semibold text-foreground">{preset.label}</span>
                            <span className="block text-sm text-muted-foreground">{preset.blurb}</span>
                        </span>
                        <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                    </Button>
                ))}
            </CardContent>
        </Card>
    )
}
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors', {
    variants: {
        variant: {
            default: 'bg-primary/12 text-primary',
            secondary: 'bg-secondary text-secondary-foreground',
            outline: 'border border-border bg-background text-foreground',
            muted: 'bg-muted text-muted-foreground',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

function Badge({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof badgeVariants>) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
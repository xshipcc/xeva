'use client'

import { TrendingUp } from 'lucide-react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// 从本地组件目录导入图表相关组件
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

// 默认数据，当没有传入数据时使用
const defaultChartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 273 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]

// 默认配置
const defaultChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

interface RadarChartProps {
  title?: string
  description?: string
  data?: any[]
  config?: ChartConfig
  dataKey?: string
  angleKey?: string
  footerText?: string
  trendText?: string
  trendUp?: boolean
}

export function MyRadar({
  title = 'Radar Chart - Dots',
  description = 'Showing total visitors for the last 6 months',
  data = defaultChartData,
  config = defaultChartConfig,
  dataKey = 'desktop',
  angleKey = 'month',
  footerText = 'January - June 2024',
  trendText = 'Trending up by 5.2% this month',
  trendUp = true,
}: RadarChartProps) {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={config} className="mx-auto aspect-square max-h-[250px]">
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey={angleKey} />
            <PolarGrid />
            <Radar
              dataKey={dataKey}
              fill={`var(--color-${dataKey})`}
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {trendText && (
          <div className="flex items-center gap-2 font-medium leading-none">
            {trendText} {trendUp ? <TrendingUp className="h-4 w-4" /> : null}
          </div>
        )}
        {footerText && <div className="flex items-center gap-2 leading-none text-muted-foreground">{footerText}</div>}
      </CardFooter>
    </Card>
  )
}

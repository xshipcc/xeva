'use client'

import React, { useEffect, useRef } from 'react'
import { KLineChartPro, DefaultDatafeed } from '@klinecharts/pro'
import '@klinecharts/pro/dist/klinecharts-pro.css'

// 从环境变量获取 API 密钥
const polygonIoApiKey = process.env.NEXT_PUBLIC_POLYGON_IO_API_KEY || ''

const KLineChart = () => {
  const chartContainerRef = useRef(null) // 用于引用 DOM 容器
  const chartInstanceRef = useRef<KLineChartPro | null>(null) // 用于存储图表实例，添加类型

  useEffect(() => {
    // 初始化图表
    if (chartContainerRef.current) {
      chartInstanceRef.current = new KLineChartPro({
        container: chartContainerRef.current,
        symbol: {
          exchange: 'XNYS',
          market: 'stocks',
          name: 'Alibaba Group Holding Limited American Depositary Shares, each represents eight Ordinary Shares',
          shortName: 'BABA',
          ticker: 'BABA',
          priceCurrency: 'usd',
          type: 'ADRC',
        },
        period: { multiplier: 15, timespan: 'minute', text: '15m' },
        datafeed: new DefaultDatafeed(polygonIoApiKey),
      })
    }

    // 清理函数：组件卸载时销毁图表
    return () => {
      if (chartInstanceRef.current) {
        // chartInstanceRef.current?.dispose() // 使用 dispose() 方法销毁图表实例
        chartInstanceRef.current = null
      }
    }
  }, []) // 空依赖数组表示只在组件挂载和卸载时执行

  return (
    <div
      ref={chartContainerRef}
      style={{ width: '100%', height: '600px' }} // 设置容器大小
    />
  )
}

export default KLineChart

'use client'
import React, { useEffect, useRef, useState } from 'react'
import { KLineChartPro, DefaultDatafeed } from '@klinecharts/pro'
import { SymbolInfo, Period, DatafeedSubscribeCallback } from '@klinecharts/pro'
import '@klinecharts/pro/dist/klinecharts-pro.css'
import { KLineData } from 'klinecharts'
import i18n from '@/utils/i18n'

// 从环境变量获取 API 密钥
const polygonIoApiKey = process.env.NEXT_PUBLIC_POLYGON_IO_API_KEY || ''

class CustomDatafeed {
  /**
   * 模糊搜索标的
   * 在搜索框输入的时候触发
   * 返回标的信息数组
   */
  async searchSymbols(search?: string): Promise<SymbolInfo[]> {
    // 返回空数组作为默认值
    return []
    // 根据模糊字段远程拉取标的数据
  }

  /**
   * 获取历史k线数据
   * 当标的和周期发生变化的时候触发
   *
   * 返回标的k线数据数组
   */
  async getHistoryKLineData(symbol: SymbolInfo, period: Period, from: number, to: number): Promise<KLineData[]> {
    // 返回空数组作为默认值
    return []
    // 完成数据请求
  }

  /**
   * 订阅标的在某个周期的实时数据
   * 当标的和周期发生变化的时候触发
   *
   * 通过callback告知图表接收数据
   */
  subscribe(symbol: SymbolInfo, period: Period, callback: DatafeedSubscribeCallback): void {
    // 完成ws订阅或者http轮询
  }

  /**
   * 取消订阅标的在某个周期的实时数据
   * 当标的和周期发生变化的时候触发
   *
   */
  unsubscribe(symbol: SymbolInfo, period: Period): void {
    // 完成ws订阅取消或者http轮询取消
  }
}

const KLineChart = () => {
  const chartContainerRef = useRef(null) // 用于引用 DOM 容器
  const chartInstanceRef = useRef<KLineChartPro | null>(null) // 用于存储图表实例，添加类型

  const [language, setLanguage] = useState<'zh-CN' | 'en-US'>('zh-CN') // 添加语言状态

  // 语言切换处理函数
  const handleLanguageChange = (lang: 'zh-CN' | 'en-US') => {
    setLanguage(lang)

    if (chartInstanceRef.current) {
      chartInstanceRef.current.setLocale(lang)
    }
  }

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
        // datafeed: new CustomDatafeed(),
        locale: language, // 设置初始语言
      })
    }

    i18n.on('languageChanged', handleLanguageChange)

    return () => {
      i18n.off('languageChanged', handleLanguageChange)
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

import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>

// 股票数据模型
export const stockSchema = z.object({
  股票代码: z.string(),
  股票名称: z.string(),
  最新价: z.number().optional(),
  涨跌幅: z.number().optional(),
  涨跌额: z.number().optional(),
  成交量: z.number().optional(),
  成交额: z.number().optional(),
  振幅: z.number().optional(),
  换手率: z.number().optional(),
  量比: z.number().optional(),
  今开: z.number().optional(),
  最高: z.number().optional(),
  最低: z.number().optional(),
  昨收: z.number().optional(),
  涨速: z.number().optional(),
  五分钟涨跌: z.number().optional(),
  六十日涨跌幅: z.number().optional(),
  年初至今涨跌幅: z.number().optional(),
  动态市盈率: z.number().optional(),
  TTM市盈率: z.number().optional(),
  静态市盈率: z.number().optional(),
  市净率: z.number().optional(),
  每股收益: z.number().optional(),
  每股净资产: z.number().optional(),
  每股公积金: z.number().optional(),
  每股未分配利润: z.number().optional(),
  加权净资产收益率: z.number().optional(),
  毛利率: z.number().optional(),
  资产负债率: z.number().optional(),
  营业收入: z.number().optional(),
  营收同比增长: z.number().optional(),
  净利润: z.number().optional(),
  净利润同比增长: z.number().optional(),
  报告期: z.string().optional(),
  总股本: z.number().optional(),
  流通股本: z.number().optional(),
  总市值: z.number().optional(),
  流通市值: z.number().optional(),
  所属行业: z.string().optional(),
  上市日期: z.string().optional(),
})

export type Stock = z.infer<typeof stockSchema>

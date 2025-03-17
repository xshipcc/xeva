import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import Image from 'next/image'
import { z } from 'zod'
import { columns } from '../../components/stock_columns'
import { DataTable } from '../../components/data-table'
import { stockSchema } from '../../data/schema'

export const metadata: Metadata = {
  title: 'Stock',
  description: 'A task and issue tracker build using Tanstack Table.',
}

// Simulate a database read for tasks.
async function getstocks() {
  const data = await fs.readFile(path.join(process.cwd(), 'app/data/stocks.json'))

  const stocks = JSON.parse(data.toString())

  return z.array(stockSchema).parse(stocks)
}

export default async function StockInfoPage() {
  const stocks = await getstocks()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">股指信息</h1>
      <DataTable data={stocks} columns={columns} />
    </div>
  )
}

import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import Image from 'next/image'
import { z } from 'zod'
import { columns } from '../components/columns'
import { DataTable } from '../components/data-table'
import { UserNav } from '../components/user-nav'
import { taskSchema } from '../data/schema'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.',
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(path.join(process.cwd(), 'app/data/tasks.json'))

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function StockInfoPage() {
  const tasks = await getTasks()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">股指信息</h1>
      <DataTable data={tasks} columns={columns} />
    </div>
  )
}

'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

// import { labels, priorities, statuses } from '../data/data'
import { Stock } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Stock>[] = [
  // 选择列保持不变
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // 按照指定顺序排列字段
  {
    accessorKey: '股票代码',
    header: ({ column }) => <DataTableColumnHeader column={column} title="代码" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('股票代码')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: '股票名称',
    header: ({ column }) => <DataTableColumnHeader column={column} title="名称" />,
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[120px] truncate font-medium">{row.getValue('股票名称')}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: '最新价',
    header: ({ column }) => <DataTableColumnHeader column={column} title="最新价" />,
    cell: ({ row }) => <div>{row.getValue('最新价')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '涨跌幅',
    header: ({ column }) => <DataTableColumnHeader column={column} title="涨跌幅" />,
    cell: ({ row }) => {
      const value = row.getValue('涨跌幅') as number
      const isPositive = value > 0
      const isNegative = value < 0
      return (
        <div className={`font-medium ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : ''}`}>
          {value > 0 ? '+' : ''}
          {value}%
        </div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: '涨跌额',
    header: ({ column }) => <DataTableColumnHeader column={column} title="涨跌额" />,
    cell: ({ row }) => {
      const value = row.getValue('涨跌额') as number
      const isPositive = value > 0
      const isNegative = value < 0
      return (
        <div className={`font-medium ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : ''}`}>
          {value > 0 ? '+' : ''}
          {value}
        </div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: '成交量',
    header: ({ column }) => <DataTableColumnHeader column={column} title="成交量(手)" />,
    cell: ({ row }) => <div>{(Number(row.getValue('成交量')) / 100).toLocaleString()}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '成交额',
    header: ({ column }) => <DataTableColumnHeader column={column} title="成交额(万)" />,
    cell: ({ row }) => <div>{(Number(row.getValue('成交额')) / 10000).toLocaleString()}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '振幅',
    header: ({ column }) => <DataTableColumnHeader column={column} title="振幅" />,
    cell: ({ row }) => <div>{row.getValue('振幅')}%</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '换手率',
    header: ({ column }) => <DataTableColumnHeader column={column} title="换手率" />,
    cell: ({ row }) => <div>{row.getValue('换手率')}%</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '量比',
    header: ({ column }) => <DataTableColumnHeader column={column} title="量比" />,
    cell: ({ row }) => <div>{row.getValue('量比')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '今开',
    header: ({ column }) => <DataTableColumnHeader column={column} title="今开" />,
    cell: ({ row }) => <div>{row.getValue('今开')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '最高',
    header: ({ column }) => <DataTableColumnHeader column={column} title="最高" />,
    cell: ({ row }) => <div>{row.getValue('最高')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '最低',
    header: ({ column }) => <DataTableColumnHeader column={column} title="最低" />,
    cell: ({ row }) => <div>{row.getValue('最低')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '昨收',
    header: ({ column }) => <DataTableColumnHeader column={column} title="昨收" />,
    cell: ({ row }) => <div>{row.getValue('昨收')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '涨速',
    header: ({ column }) => <DataTableColumnHeader column={column} title="涨速" />,
    cell: ({ row }) => <div>{row.getValue('涨速')}%</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '五分钟涨跌',
    header: ({ column }) => <DataTableColumnHeader column={column} title="5分钟涨跌" />,
    cell: ({ row }) => <div>{row.getValue('五分钟涨跌')}%</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '六十日涨跌幅',
    header: ({ column }) => <DataTableColumnHeader column={column} title="60日涨跌幅" />,
    cell: ({ row }) => <div>{row.getValue('六十日涨跌幅')}%</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '年初至今涨跌幅',
    header: ({ column }) => <DataTableColumnHeader column={column} title="年初至今涨跌幅" />,
    cell: ({ row }) => <div>{row.getValue('年初至今涨跌幅')}%</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '动态市盈率',
    header: ({ column }) => <DataTableColumnHeader column={column} title="市盈率(动)" />,
    cell: ({ row }) => <div>{row.getValue('动态市盈率')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'TTM市盈率',
    header: ({ column }) => <DataTableColumnHeader column={column} title="市盈率(TTM)" />,
    cell: ({ row }) => <div>{row.getValue('TTM市盈率')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '静态市盈率',
    header: ({ column }) => <DataTableColumnHeader column={column} title="市盈率(静)" />,
    cell: ({ row }) => <div>{row.getValue('静态市盈率')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '市净率',
    header: ({ column }) => <DataTableColumnHeader column={column} title="市净率" />,
    cell: ({ row }) => <div>{row.getValue('市净率')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '每股收益',
    header: ({ column }) => <DataTableColumnHeader column={column} title="每股收益" />,
    cell: ({ row }) => <div>{row.getValue('每股收益')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '每股净资产',
    header: ({ column }) => <DataTableColumnHeader column={column} title="每股净资产" />,
    cell: ({ row }) => <div>{row.getValue('每股净资产')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '每股公积金',
    header: ({ column }) => <DataTableColumnHeader column={column} title="每股公积金" />,
    cell: ({ row }) => <div>{row.getValue('每股公积金')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '每股未分配利润',
    header: ({ column }) => <DataTableColumnHeader column={column} title="每股未分配利润" />,
    cell: ({ row }) => <div>{row.getValue('每股未分配利润')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '加权净资产收益率',
    header: ({ column }) => <DataTableColumnHeader column={column} title="加权净资产收益率" />,
    cell: ({ row }) => <div>{row.getValue('加权净资产收益率')}%</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '毛利率',
    header: ({ column }) => <DataTableColumnHeader column={column} title="毛利率" />,
    cell: ({ row }) => <div>{row.getValue('毛利率')}%</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '资产负债率',
    header: ({ column }) => <DataTableColumnHeader column={column} title="资产负债率" />,
    cell: ({ row }) => <div>{row.getValue('资产负债率')}%</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '营业收入',
    header: ({ column }) => <DataTableColumnHeader column={column} title="营业收入(亿)" />,
    cell: ({ row }) => <div>{(Number(row.getValue('营业收入')) / 100000000).toLocaleString()}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '营收同比增长',
    header: ({ column }) => <DataTableColumnHeader column={column} title="营收同比增长" />,
    cell: ({ row }) => <div>{row.getValue('营收同比增长')}%</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '净利润',
    header: ({ column }) => <DataTableColumnHeader column={column} title="净利润(亿)" />,
    cell: ({ row }) => <div>{(Number(row.getValue('净利润')) / 100000000).toLocaleString()}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '净利润同比增长',
    header: ({ column }) => <DataTableColumnHeader column={column} title="净利润同比增长" />,
    cell: ({ row }) => <div>{row.getValue('净利润同比增长')}%</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '报告期',
    header: ({ column }) => <DataTableColumnHeader column={column} title="报告期" />,
    cell: ({ row }) => <div>{row.getValue('报告期')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '总股本',
    header: ({ column }) => <DataTableColumnHeader column={column} title="总股本(亿)" />,
    cell: ({ row }) => <div>{(Number(row.getValue('总股本')) / 100000000).toLocaleString()}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '流通股本',
    header: ({ column }) => <DataTableColumnHeader column={column} title="流通股本(亿)" />,
    cell: ({ row }) => <div>{(Number(row.getValue('流通股本')) / 100000000).toLocaleString()}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: '总市值',
    header: ({ column }) => <DataTableColumnHeader column={column} title="总市值(亿)" />,
    cell: ({ row }) => <div>{(Number(row.getValue('总市值')) / 100000000).toLocaleString()}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '流通市值',
    header: ({ column }) => <DataTableColumnHeader column={column} title="流通市值(亿)" />,
    cell: ({ row }) => <div>{(Number(row.getValue('流通市值')) / 100000000).toLocaleString()}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '所属行业',
    header: ({ column }) => <DataTableColumnHeader column={column} title="所处行业" />,
    cell: ({ row }) => <div>{row.getValue('所属行业')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: '上市日期',
    header: ({ column }) => <DataTableColumnHeader column={column} title="上市时间" />,
    cell: ({ row }) => <div>{row.getValue('上市日期')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
]

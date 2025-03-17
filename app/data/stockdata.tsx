import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, Circle, CircleOff, HelpCircle, Timer } from 'lucide-react'

export const stocklabels = [
  {
    value: '今开',
    label: '今开',
  },
  {
    value: '涨跌幅',
    label: '涨跌幅',
  },
  {
    value: '成交量',
    label: '成交量',
  },
  {
    value: '换手率',
    label: '换手率',
  },
  {
    value: '涨速',
    label: '涨速',
  },
]

export const stockstatuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: HelpCircle,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: Circle,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: Timer,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CircleOff,
  },
]

export const stockpriorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDown,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRight,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUp,
  },
]

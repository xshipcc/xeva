'use client'

import type * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react'

import { NavMain } from './nav-main'
import { NavProjects } from './nav-projects'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import ChatSidebar from '@/components/AppSidebar'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: '股指信息',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: '综合选股',
          url: '/stock-info/comprehensive',
        },
        {
          title: '每日数据',
          url: '/stock-info',
        },
        {
          title: '资金流向',
          url: '/stock-info/dashboard',
        },
        {
          title: '分红配送',
          url: '#',
        },
        {
          title: '龙虎榜',
          url: '#',
        },
        {
          title: '大宗交易',
          url: '#',
        },
        {
          title: '行业资金流向',
          url: '#',
        },
        {
          title: '概念资金流向',
          url: '#',
        },
        {
          title: '每日ETF数据',
          url: '#',
        },
      ],
    },
    {
      title: '期货',
      url: '#',
      icon: Bot,
      items: [
        {
          title: '期货基本面',
          url: '#',
        },
        {
          title: '期货每日数据',
          url: '#',
        },
      ],
    },
    {
      title: '数字货币',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'B基本面',
          url: '#',
        },
        {
          title: 'B每日数据',
          url: '#',
        },
      ],
    },
    {
      title: '知识库',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    //,
    // {
    //   title: 'Settings',
    //   url: '#',
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: 'General',
    //       url: '#',
    //     },
    //     {
    //       title: 'Team',
    //       url: '#',
    //     },
    //     {
    //       title: 'Billing',
    //       url: '#',
    //     },
    //     {
    //       title: 'Limits',
    //       url: '#',
    //     },
    // ],
    // },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <ChatSidebar />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

"use client"

// 需要先安装 @radix-ui/react-collapsible 依赖
// npm install @radix-ui/react-collapsible
// 或
// yarn add @radix-ui/react-collapsible
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

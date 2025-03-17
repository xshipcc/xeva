import { Input } from '@/components/ui/input'

export function Search() {
  return (
    <div>
      <Input type="search" placeholder="股票代码或名称..." className="md:w-[500px] lg:w-[500px]" />
    </div>
  )
}

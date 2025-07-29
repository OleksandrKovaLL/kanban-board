import { cn } from '@/lib/utils'
import React from 'react'
import { BoardItem } from '@/components/common/board-item'

export type Items = {
  id: number
  status: string
  startDay: number | string
  endDay: number | string
  text: string
}

interface Props {
  items: Items[]
  editItem: (id: number, updatedFields: Partial<Items>) => void
  className?: string
}

export const BoardItemsList: React.FC<Props> = ({
  className,
  items,
  editItem,
}) => {
  return (
    <div className={cn('flex flex-col', className)}>
      {/*{items.map((item) => (*/}
      {/*  <BoardItem key={item.id} item={item} editItem={editItem} />*/}
      {/*))}*/}
    </div>
  )
}

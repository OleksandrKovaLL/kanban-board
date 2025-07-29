import { cn } from '@/lib/utils'
import React from 'react'
import { Input } from '@/components/common/input'

interface Props {
  label: string
  value: string
  field: string
  editMode: boolean
  isItemExpired: boolean
  onChange: (name: string, value: string) => void
  className?: string
}

export const EditableField: React.FC<Props> = ({
  isItemExpired,
  label,
  value,
  field,
  editMode,
  className,
  onChange,
}) => {
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value)
  }

  return (
    <div className={cn('flex gap-4', className)}>
      <p>{label}</p>
      {editMode ? (
        <Input
          type="text"
          value={value}
          variant="secondary"
          autoFocus={field === 'startDay'}
          onChange={inputChangeHandler}
        />
      ) : (
        <span
          className={cn(
            'font-black',
            isItemExpired && field === 'endDay' && 'text-red-900'
          )}
        >
          {value}
        </span>
      )}
    </div>
  )
}

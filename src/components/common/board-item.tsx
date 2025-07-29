import { cn } from '@/lib/utils'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CheckIcon, CrossIcon, EditIcon } from '@/assets/icons'
import { Button } from '@/components/common/button'
import { EditableField } from '@/components/common/editable-field'
import { Draggable } from '@hello-pangea/dnd'

export type Status = 'todo' | 'in_progress' | 'review' | 'done'

export type Item = {
  id: number
  status: Status
  startDay: string
  endDay: string
  text: string
}

interface Props {
  item: Item
  editItem: (id: number, updatedFields: Partial<Item>) => void
  index: number
  className?: string
}

export const BoardItem: React.FC<Props> = React.memo(
  ({ item, className, editItem, index }) => {
    const [editMode, setEditMode] = useState(false)
    const [values, setValues] = useState({
      startDay: item.startDay,
      endDay: item.endDay,
      text: item.text,
    })

    // Sync local state with props when item changes (important for external updates)
    useEffect(() => {
      if (!editMode) {
        setValues({
          startDay: item.startDay,
          endDay: item.endDay,
          text: item.text,
        })
      }
    }, [item.startDay, item.endDay, item.text, editMode])

    const saveEditedItemHandler = useCallback(() => {
      editItem(item.id, values)
      setEditMode(false)
    }, [editItem, item.id, values])

    const isItemExpired = useMemo(() => {
      return new Date(item.endDay) > new Date()
    }, [item.endDay])

    const activateViewMode = useCallback(() => {
      setEditMode(false)
      // Reset values to original on cancel
      setValues({
        startDay: item.startDay,
        endDay: item.endDay,
        text: item.text,
      })
    }, [item.startDay, item.endDay, item.text])

    const activateEditMode = useCallback(() => {
      setEditMode(true)
    }, [])

    const fieldChangeHandler = useCallback((field: string, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }))
    }, [])

    const fields = useMemo(
      () => [
        { label: '📅 Start', field: 'startDay' as const },
        { label: '🏁 End', field: 'endDay' as const },
        { label: '📝 Task', field: 'text' as const },
      ],
      []
    )

    return (
      <Draggable draggableId={item.id.toString()} index={index}>
        {(provided) => (
          <div
            className={cn(
              'bg-gray200 w-[400px] min-h-[165px] p-4 mb-4 rounded-lg cursor-grab',
              className
            )}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
            }}
          >
            <div className="flex flex-col gap-2 text-primaryColor">
              {fields.map(({ label, field }) => (
                <EditableField
                  key={field}
                  label={label}
                  field={field}
                  value={values[field]}
                  editMode={editMode}
                  onChange={fieldChangeHandler}
                  isItemExpired={isItemExpired}
                />
              ))}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              {editMode ? (
                <>
                  <Button
                    variant="primary"
                    icon={<CrossIcon />}
                    onClick={activateViewMode}
                  />
                  <Button
                    variant="primary"
                    icon={<CheckIcon />}
                    onClick={saveEditedItemHandler}
                  />
                </>
              ) : item.status === 'todo' ? (
                <Button
                  className=""
                  variant="primary"
                  onClick={activateEditMode}
                  icon={<EditIcon />}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        )}
      </Draggable>
    )
  }
)

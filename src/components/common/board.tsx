import { cn } from '@/lib/utils'
import React, { ReactNode, useCallback, useMemo } from 'react'
import { Title } from '@/components/common/title'
import { TrashIcon } from '@/assets/icons'
import { Button } from '@/components/common/button'
import { Droppable } from '@hello-pangea/dnd'
import { BoardItem, Item, Status } from '@/components/common/board-item'

interface Props {
  label: string
  boardStatus: Status
  items: Item[]
  boardIcon: ReactNode
  addItem: (boardStatus: Status) => void
  deleteCompletedTasks: () => void
  saveData: (updatedData: Item[]) => void
  className?: string
}

// Memoize the component to prevent unnecessary re-renders
export const Board: React.FC<Props> = React.memo(
  ({
    className,
    label,
    boardStatus,
    items, // Now this should already be filtered from parent
    boardIcon,
    addItem,
    deleteCompletedTasks,
    saveData,
  }) => {
    // Memoize the add item handler
    const addItemHandler = useCallback(() => {
      addItem(boardStatus)
    }, [addItem, boardStatus])

    // Since items are already filtered in parent, no need to filter again
    // But keep this as fallback for safety
    const filteredItems = useMemo(() => {
      return items.filter((item) => item.status === boardStatus)
    }, [items, boardStatus])

    // Fix the editItem function - it was missing saveData dependency
    const editItem = useCallback(
      (id: number, updatedFields: Partial<Item>) => {
        // Get ALL items from parent, not just board items
        // This is a design issue - editItem should work with all data
        const updatedData = items.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item
        )
        saveData(updatedData)
      },
      [items, saveData] // Added missing saveData dependency
    )

    // Memoize header content to prevent re-renders
    const headerContent = useMemo(() => {
      if (boardStatus === 'todo') {
        return (
          <Button
            className="text-secondaryColor mr-2 sm:mr-3 md:mr-4 cursor-pointer"
            variant="tertiary"
            text="Добавить"
            onClick={addItemHandler}
          />
        )
      }

      if (boardStatus === 'done') {
        return (
          <Droppable droppableId="trash">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-shrink-0"
              >
                <Button
                  variant="secondary"
                  onClick={deleteCompletedTasks}
                  icon={<TrashIcon isDraggingOver={snapshot.isDraggingOver} />}
                  className="mr-2 sm:mr-3 md:mr-4 cursor-pointer"
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )
      }

      return null
    }, [boardStatus, addItemHandler, deleteCompletedTasks])

    // Memoize the main container class
    const containerClass = useCallback((isDraggingOver: boolean) => {
      return cn(
        'bg-dark w-full sm:w-full md:w-full lg:w-full xl:w-full min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[685px] transition-opacity duration-200 overflow-x-hidden',
        isDraggingOver ? 'opacity-70' : 'opacity-100'
      )
    }, [])

    return (
      <Droppable droppableId={boardStatus}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              '@container', // Робимо board контейнером для container queries
              containerClass(snapshot.isDraggingOver)
            )}
          >
            <div className={cn('flex justify-between pt-4 sm:pt-5 md:pt-6 lg:pt-7 pb-3 sm:pb-4', className)}>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="ml-2 sm:ml-3 md:ml-4">{boardIcon}</div>
                <Title text={label} className="text-primaryColor font-black" />
              </div>
              {headerContent}
            </div>

            <div
              className={cn(
                'flex flex-col items-center',
                // Відступи для візуального комфорту
                'px-3 sm:px-4',
                className
              )}
            >
              {filteredItems.map((item, index) => (
                <BoardItem
                  key={item.id}
                  item={item}
                  editItem={editItem}
                  index={index}
                />
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )
  }
)

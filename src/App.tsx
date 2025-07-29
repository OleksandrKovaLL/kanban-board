import './App.css'
import { Board, Container, Input, Title } from '@/components/common'
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/local-storage'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'

import {
  GhostIcon,
  HappyIcon,
  SearchIcon,
  SmileIcon,
  UpSideDownIcon,
} from '@/assets/icons'
import { formatDate } from '@/utils/date-format'
import { Item, Status } from '@/components/common/board-item'

interface BoardConfig {
  label: string
  status: Status
  icon: ReactNode
}

const initialBoards: BoardConfig[] = [
  { label: 'To Do', status: 'todo', icon: <SmileIcon /> },
  { label: 'In Progress', status: 'in_progress', icon: <HappyIcon /> },
  { label: 'Review', status: 'review', icon: <UpSideDownIcon /> },
  { label: 'Done', status: 'done', icon: <GhostIcon /> },
]

function App() {
  const [data, setData] = useState(getLocalStorageItem<Item[]>('items') || [])
  const [searchValue, setSearchValue] = useState('')

  // Load data from localStorage only once
  useEffect(() => {
    const storedData = getLocalStorageItem<Item[]>('items')
    if (storedData) {
      setData(storedData)
    } else {
      setLocalStorageItem('items', [])
    }
  }, [])

  // Auto-save to localStorage when data changes
  useEffect(() => {
    setLocalStorageItem('items', data)
  }, [data])

  // Memoize filtered data to prevent unnecessary recalculations
  const filteredData = useMemo(() => {
    if (searchValue.trim() === '') {
      return data
    }

    const searchLower = searchValue.toLowerCase()
    return data.filter((item) => {
      return (
        item.text.toLowerCase().includes(searchLower) ||
        item.startDay.toString().includes(searchLower) ||
        item.endDay.toString().includes(searchLower)
      )
    })
  }, [data, searchValue])

  // Memoize items by status to prevent unnecessary Board re-renders
  const itemsByStatus = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        if (!acc[item.status]) {
          acc[item.status] = []
        }
        acc[item.status].push(item)
        return acc
      },
      {} as Record<Status, Item[]>
    )
  }, [filteredData])

  // Memoize callbacks to prevent child re-renders
  const addItem = useCallback((boardStatus: Status) => {
    const newItem: Item = {
      id: Date.now(),
      status: boardStatus,
      startDay: formatDate(Date.now()),
      endDay: '0',
      text: 'New task',
    }
    setData((prevData) => [newItem, ...prevData])
  }, [])

  const deleteCompletedTasks = useCallback(() => {
    setData((prevData) => prevData.filter((item) => item.status !== 'done'))
  }, [])

  // Memoize saveData to prevent unnecessary re-renders
  const saveData = useCallback((updatedData: Item[]) => {
    setData(updatedData)
    setLocalStorageItem('items', updatedData)
  }, [])

  // Handle drag and drop with useCallback
  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    if (destination.droppableId === 'trash') {
      setData((prevData) =>
        prevData.filter((item) => item.id !== parseInt(result.draggableId))
      )
      return
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    setData((prevData) => {
      const draggedItemId = parseInt(result.draggableId)
      const draggedItem = prevData.find((item) => item.id === draggedItemId)

      if (!draggedItem) return prevData

      const updatedItem: Item = {
        ...draggedItem,
        status: destination.droppableId as Status,
      }

      // Remove the dragged item from the original array
      const withoutDraggedItem = prevData.filter(
        (item) => item.id !== draggedItemId
      )

      // Case 1: Moving within the same board (reordering)
      if (source.droppableId === destination.droppableId) {
        // Get items for this specific board only
        const boardItems = withoutDraggedItem.filter(
          (item) => item.status === (destination.droppableId as Status)
        )
        const otherItems = withoutDraggedItem.filter(
          (item) => item.status !== (destination.droppableId as Status)
        )

        // Insert at the correct position within the board
        boardItems.splice(destination.index, 0, updatedItem)

        // Combine with other items
        return [...otherItems, ...boardItems]
      }

      // Case 2: Moving to a different board
      else {
        // Get items from destination board
        const destinationBoardItems = withoutDraggedItem.filter(
          (item) => item.status === (destination.droppableId as Status)
        )
        const otherItems = withoutDraggedItem.filter(
          (item) => item.status !== (destination.droppableId as Status)
        )

        // Insert at the correct position in the destination board
        destinationBoardItems.splice(destination.index, 0, updatedItem)

        // Combine all items
        return [...otherItems, ...destinationBoardItems]
      }
    })
  }, [])

  // Memoize search input handler
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
    },
    []
  )

  return (
    <div className="min-h-screen w-screen bg-fixed bg-cover bg-center bg-custom-bg p-10">
      <div className="flex justify-between mb-12">
        <Title className="text-primaryColor" text="Your tasks" size="xl" />
        <Input
          type="text"
          className="text-primaryColor"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="поиск..."
          icon={<SearchIcon />}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialBoards.map((board) => (
            <Board
              key={board.status}
              label={board.label}
              boardStatus={board.status}
              boardIcon={board.icon}
              items={itemsByStatus[board.status] || []} // Only pass relevant items
              addItem={addItem}
              deleteCompletedTasks={deleteCompletedTasks}
              saveData={saveData}
            />
          ))}
        </Container>
      </DragDropContext>
    </div>
  )
}

export default App

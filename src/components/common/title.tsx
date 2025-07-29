import React from 'react'
import { cn } from '@/lib/utils'

type TitleSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface Props {
  text: string
  size?: TitleSize
  className?: string
}

export const Title: React.FC<Props> = ({ text, size = 'sm', className }) => {
  const mapTagBySize = {
    none: 'h2',
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
    '2xl': 'h1',
  } as const

  const mapClassNameBySize = {
    none: '',
    xs: 'text-[16px]',
    sm: 'text-[22px]',
    md: 'text-[26px]',
    lg: 'text-[32px]',
    xl: 'text-[40px]',
    '2xl': 'text-[48px]',
  } as const

  return React.createElement(
    mapTagBySize[size],
    { className: cn(mapClassNameBySize[size], className) },
    text
  )
}

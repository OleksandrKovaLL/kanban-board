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
    xs: 'text-[14px] sm:text-[15px] md:text-[16px]',
    sm: 'text-[18px] sm:text-[20px] md:text-[22px]',
    md: 'text-[22px] sm:text-[24px] md:text-[26px]',
    lg: 'text-[26px] sm:text-[28px] md:text-[30px] lg:text-[32px]',
    xl: 'text-[30px] sm:text-[32px] md:text-[36px] lg:text-[40px]',
    '2xl': 'text-[36px] sm:text-[40px] md:text-[44px] lg:text-[48px]',
  } as const

  return React.createElement(
    mapTagBySize[size],
    { className: cn(mapClassNameBySize[size], className) },
    text
  )
}

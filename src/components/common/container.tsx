import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  className?: string
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('mx-auto max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1280px] xl:max-w-[1536px] 2xl:max-w-[1920px] px-0', className)}>{children}</div>
  )
}

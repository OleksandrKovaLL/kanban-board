import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary'
  icon?: ReactNode
  text?: string
  className?: string
}

export const Button: React.FC<Props> = ({
  variant = 'default',
  icon,
  onClick,
  text,
  className,
}) => {
  const buttonClasses = cn(
    variant === 'default'
      ? 'flex items-center p-1 w-32 sm:w-36 md:w-40 h-8 sm:h-9 md:h-10 bg-gray300 text-gray-600 hover:bg-gray100 text-sm sm:text-base'
      : variant === 'primary'
        ? 'flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gray300 text-gray-600 hover:bg-gray100 group transition-colors duration-300 shadow-md'
        : variant === 'secondary'
          ? 'flex items-center justify-center p-1 group transition-colors duration-300 shadow-md'
          : variant === 'tertiary'
            ? 'flex items-center p-1 text-secondaryColor group transition-colors duration-300 shadow-md hover:text-info text-sm sm:text-base'
            : ''
  )

  return (
    <button
      onClick={onClick}
      aria-label={text}
      className={cn(buttonClasses, className)}
    >
      {variant === 'tertiary' && (
        <span className="mr-1 text-sm text-secondaryColor duration-300 group-hover:text-info">
          +
        </span>
      )}

      <span className="icon text-white transition-colors duration-300 group-hover:text-info">
        {icon}
      </span>
      {text}
    </button>
  )
}

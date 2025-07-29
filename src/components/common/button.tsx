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
      ? 'flex items-center p-1 w-40 h-10 bg-gray300 text-gray-600 hover:bg-gray100'
      : variant === 'primary'
        ? 'flex items-center justify-center w-12 h-12 rounded-full bg-gray300 text-gray-600 hover:bg-gray100 group transition-colors duration-300 shadow-md'
        : variant === 'secondary'
          ? 'flex items-center justify-center p-1 group transition-colors duration-300 shadow-md'
          : variant === 'tertiary'
            ? 'flex items-center p-1 text-secondaryColor group transition-colors duration-300 shadow-md hover:text-info'
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

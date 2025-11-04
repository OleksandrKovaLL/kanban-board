import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  placeholder?: string
  type: string
}

export const Input: React.FC<Props> = ({
  variant = 'primary',
  icon,
  placeholder,
  type,
  className,
  ...rest
}) => {
  const inputClasses = cn(
    variant === 'primary'
      ? 'w-full sm:w-[320px] md:w-[380px] lg:w-[420px] xl:w-[430px] h-[36px] sm:h-[38px] md:h-[40px] pl-10 sm:pl-12 md:pl-14 pr-3 sm:pr-4 bg-gray300 ' +
          'text-gray100 border border-gray100 rounded-2xl ' +
          'focus:border-info focus:outline-none hover:border-info ' +
          'focus:ring-[4px] focus:ring-[#0184CF80] focus:ring-opacity-80 ' +
          'group transition-colors duration-300 shadow-md text-sm sm:text-base'
      : variant === 'secondary'
        ? 'text-primaryColor pl-3 sm:pl-4 bg-gray300 border border-secondaryColor ' +
          'focus:border-info focus:outline-none hover:border-info rounded-md text-sm sm:text-base'
        : ''
  )

  return (
    <div className="flex items-center justify-center relative w-full sm:w-auto">
      {icon && <span className="absolute left-3 sm:left-4 text-gray100">{icon}</span>}

      <input
        className={cn(inputClasses, className)}
        type={type}
        placeholder={placeholder}
        aria-label={placeholder}
        {...rest}
      />
    </div>
  )
}

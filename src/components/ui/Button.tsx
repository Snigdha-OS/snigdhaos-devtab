import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'transition-all duration-200 rounded-lg font-medium',
        // Variants
        {
          'bg-[#6495ED] hover:bg-[#6495ED]/90 text-white': variant === 'primary',
          'bg-[#6495ED]/10 hover:bg-[#6495ED]/20 text-[#6495ED]': variant === 'secondary',
          'hover:bg-[#6495ED]/10 text-[#6495ED]': variant === 'ghost',
        },
        // Sizes
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
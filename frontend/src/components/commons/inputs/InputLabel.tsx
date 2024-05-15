import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  sizes?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function InputLabel({
  label,
  sizes = 'md',
  className,
  disabled,
  ...props
}: InputLabelProps) {
  const baseClasses =
    'block w-full rounded-xl px-2 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6';

  let sizeClasses = '';

  switch (sizes) {
    case 'sm':
      sizeClasses = 'py-1';
      break;
    case 'md':
      sizeClasses = 'py-1.5';
      break;
    case 'lg':
      sizeClasses = 'py-2';
      break;
    case 'xl':
      sizeClasses = 'py-2.5';
      break;
    default:
      sizeClasses = 'py-1.5';
  }

  return (
    <div>
      <label
        htmlFor={props.id}
        className='block text-sm font-medium leading-6 text-gray-900 pb-2'
      >
        {label}
      </label>
      <input className={clsx(baseClasses, sizeClasses, className)} {...props} />
    </div>
  );
}

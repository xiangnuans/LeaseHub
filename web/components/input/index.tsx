import React, { forwardRef } from 'react';

const shapes = {
  round: 'rounded-[10px]',
} as const;

const variants = {
  fill: {
    black_900_03: 'bg-black-900_03 text-blue_gray-400',
    gray_900_03: 'bg-gray-900_03 text-white-a700',
    gray_900: 'bg-gray-900 text-white-a700',
  },
} as const;

const sizes = {
  sm: 'h-[64px] px-3.5 text-[20px]',
  xs: 'h-[56px] px-4 text-[20px]',
} as const;

type InputProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'prefix' | 'size'
> &
  Partial<{
    label: string;
    prefix: React.ReactNode;
    suffix: React.ReactNode;
    shape: keyof typeof shapes;
    variant: keyof typeof variants | null;
    size: keyof typeof sizes;
    color: string;
  }>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      name = '',
      placeholder = '',
      type = 'text',
      label = '',
      prefix,
      suffix,
      onChange,
      shape,
      variant = 'fill',
      size = 'xs',
      color = 'gray_900',
      ...restProps
    },
    ref
  ) => {
    return (
      <label
        className={`${className} flex items-center justify-center cursor-text text-[20px] ${
          shape && shapes[shape]
        } ${
          variant &&
          (variants[variant]?.[
            color as keyof (typeof variants)[typeof variant]
          ] ||
            variants[variant])
        } ${size && sizes[size]}`}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...restProps}
        />
        {!!suffix && suffix}
      </label>
    );
  }
);

export { Input };

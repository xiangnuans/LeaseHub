'use client';
import React from 'react';

const shapes = {
  circle: 'rounded-[50%]',
  round: 'rounded-[10px]',
} as const;

const variants = {
  fill: {
    green_900: 'bg-green-900',
    lime_400_23: 'bg-lime-400_23',
  },
  outline: {
    light_blue_A100_01_yellow_A700:
      'border border-solid light_blue_A100_01_yellow_A700_border text_gray_200',
    white_A700: 'border-white-a700 border-[0.5px] border-solid text-white-a700',
    lime_400: 'border-lime-400 border border-solid text-lime-400',
  },
} as const;

const sizes = {
  xs: 'h-[30px] px-1',
  sm: 'h-[32px] px-4 text-[12px]',
  md: 'h-[42px] px-8 text-[16px]',
  lg: 'h-[50px] px-[34px] text-[16px]',
  xl: 'h-[56px] px-[34px] text-[16px]',
  '2xl': 'h-[58px] px-2.5',
} as const;

type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'onClick'
> &
  Partial<{
    className: string;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    color: string;
  }>;

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  className = '',
  children,
  leftIcon,
  rightIcon,
  shape,
  variant = 'fill',
  size = '2xl',
  color = 'lime_400',
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${
        shape && shapes[shape]
      } ${size && sizes[size]} ${
        variant &&
        variants[variant]?.[color as keyof (typeof variants)[typeof variant]]
      }`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export { Button };

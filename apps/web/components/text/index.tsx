'use client';
import React from 'react';

const sizes = {
  textxs: 'text-[10px] font-normal',
  texts: 'text-[14px] font-normal not-italic',
  textmd: 'text-[16px] font-normal not-italic lg:text-[13px]',
  textlg: 'text-[17px] font-normal not-italic lg:text-[14px]',
  textxl: 'text-[20px] font-normal not-italic lg:text-[17px]',
} as const;
export type TextProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = '',
  as,
  size = 'textmd',
  ...restProps
}) => {
  const Component = as || 'p';
  return (
    <Component
      className={`text-white-a700 font-sora ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };

'use client';
import React from 'react';

const sizes = {
  textxs: 'text-[100px] font-medium lg:text-[100px] md:text-[48px]',
  text2xl:
    'text-[36px] font-medium lg:text-[30px] md:text-[34px] sm:text-[32px]',
  headingxs: 'text-[16px] font-semibold lg:text-[13px]',
  headings: 'text-[17px] font-semibold lg:text-[14px]',
  headingmd: 'text-[20px] font-semibold lg:text-[17px]',
  headinglg: 'text-[24px] font-bold lg:text-[22px]',
  headingxl: 'text-[32px] font-bold lg:text-[30px] sm:text-[28px]',
  heading2xl: 'text-[36px] font-bold lg:text-[34px] sm:text-[32px]',
  heading3xl: 'text-[348px] font-bold lg:text-[44px] sm:text-[38px]',
  heading4xl: 'text-[64px] font-bold lg:text-[48px]',
} as const;

export type HeadingProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  children,
  className = '',
  size = 'headings',
  as,
  ...restProps
}) => {
  const Component = as || 'h6';

  return (
    <Component
      className={`text-white-a700 font-poppins ${sizes[size]} ${className} `}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Heading };

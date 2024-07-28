import { FC } from 'react';
import { ReactNode } from 'react';
import style from './centerContainer.module.css';
import clsx from 'clsx';

export type TCenteringContainerUIProps = {
  title?: string;
  textStyle?: string;
  children: ReactNode;
};
export const CenteringContainerUI: FC<TCenteringContainerUIProps> = ({
  title,
  textStyle,
  children
}: TCenteringContainerUIProps) => (
  <div className={style.container}>
    {title && (
      <h2
        className={clsx('text', {
          [`text_type_${textStyle}`]: textStyle,
          [`text_type_main-large`]: !textStyle
        })}
      >
        {title}
      </h2>
    )}
    {children}
  </div>
);

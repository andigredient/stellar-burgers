import { ReactNode } from 'react';
import { FC } from 'react';
import { CenteringContainerUI } from '../ui/centerComponent';

export type TCenteringContainerProps = {
  title?: string;
  textStyle?: string;
  children: ReactNode;
};

export const CenteringContainer: FC<TCenteringContainerProps> = ({
  title,
  textStyle,
  children
}) => (
  <CenteringContainerUI
    title={title}
    textStyle={textStyle}
    children={children}
  />
);

import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { checkUserAuth } from '../../slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(checkUserAuth)?.name;
  return <AppHeaderUI userName={userName} />;
};

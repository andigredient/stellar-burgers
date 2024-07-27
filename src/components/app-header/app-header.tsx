import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userDataSelector } from '../../slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(userDataSelector)?.name;
  return <AppHeaderUI userName={userName} />;
};

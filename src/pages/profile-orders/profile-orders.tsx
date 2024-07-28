import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, getOrdersSelector } from '../../slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const orders = useSelector(getOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};

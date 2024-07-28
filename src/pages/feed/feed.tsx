import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedSelector, getFeeds } from '../../slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, isFeedsLoading } = useSelector(getFeedSelector);
  const dispatch = useDispatch();

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (isFeedsLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};

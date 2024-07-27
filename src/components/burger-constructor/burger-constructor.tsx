import { FC, useMemo, useState, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearConstructor,
  getConstructorSelector
} from '../../slices/constructorSlice';
import {
  orderBurger,
  getBurgerSelector,
  getRequestSelector
} from '../../slices/orderBurgerSlice';
import { userDataSelector } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorSelector);
  const orderRequest = useSelector(getRequestSelector);
  const orderModalData = useSelector(getBurgerSelector).order;
  const user = useSelector(userDataSelector);
  const [modalState, setModalState] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    const orderItems = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id)
    ];
    dispatch(orderBurger(orderItems));
    dispatch(clearConstructor());
  };
  const closeOrderModal = () => {
    setModalState(false);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  useEffect(() => {
    setModalState(true);
  }, [orderRequest]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      modalState={modalState}
      closeOrderModal={closeOrderModal}
    />
  );
};

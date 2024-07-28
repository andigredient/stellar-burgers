import { FC, useMemo, useState, useEffect } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
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
  const user = useSelector(userDataSelector);
  const [orderModalData, setOrderModalState] = useState<TOrder | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [orderRequest || orderModalData]);

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
    dispatch(orderBurger(orderItems))
      .unwrap()
      .then((res) => {
        setOrderModalState(res.order);
        dispatch(clearConstructor());
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const closeOrderModal = () => {
    setOrderModalState(null);
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

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

import { FC, useMemo, useEffect } from 'react';
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
  selectOrder,
  selectRequestInProgress
} from '../../slices/orderBurgerSlice';
import { selectUser } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorSelector);
  const orderRequest = useSelector(selectRequestInProgress);
  const user = useSelector(selectUser);
  const orderModalData = useSelector(selectOrder);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [orderRequest, orderModalData]);

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
        dispatch(clearConstructor());
      })
      .catch((res) => {
        console.error(res);
      });
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) =>
          sum + ingredient.price,
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

import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatchedActions } from '@store-hooks';
import { constructorIngredientActions } from '@slice/constructorIngredients';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const { addIngredient } = useDispatchedActions(
      constructorIngredientActions
    );
    const handleAdd = () => {
      addIngredient(ingredient);
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);

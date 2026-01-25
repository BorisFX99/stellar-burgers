import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { constructorIngredientActions } from '@slice/constructorIngredients';
import { useDispatchedActions } from '@store-hooks';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const { deleteIngredient, moveDownIngredient, moveUpIngredient } =
      useDispatchedActions(constructorIngredientActions);

    const handleMoveDown = () => {
      moveDownIngredient(ingredient.id);
    };

    const handleMoveUp = () => {
      moveUpIngredient(ingredient.id);
    };

    const handleClose = () => {
      deleteIngredient(ingredient.id);
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);

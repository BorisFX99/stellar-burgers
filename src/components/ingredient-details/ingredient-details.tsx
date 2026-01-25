import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams, useLocation } from 'react-router-dom';
import { ingredientsSelectors } from '@slice/ingredients';
import { useAppSelector } from '@store-hooks';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  //Аналогично с заказами - вариантивный рендеринг заголовка.
  const location = useLocation();
  const background: boolean = location.state?.background;
  const title = !background ? 'Детали ингредиента' : '';
  // Берем переменную из стора по id
  const ingredientData = useAppSelector((state) =>
    ingredientsSelectors.selectIngredientById(state, id!)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} title={title} />;
};

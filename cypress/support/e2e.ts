import './commands';

beforeEach(() => {

  cy.clearCookies();
  cy.clearLocalStorage();

  // 1. ПЕРЕХВАТ ЗАПРОСА НА ПОЛУЧЕНИЕ ИНГРЕДИЕНТОВ
  cy.intercept('GET', 'api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');

})

declare namespace Cypress {
  interface Chainable {
    /**
     * Установить успешную авторизацию
     * @example cy.mockAuthSuccess()
     */
    mockAuthSuccess(): Chainable<void>;

    /**
     * Установить неуспешную авторизацию
     * @example cy.mockAuthFailure()
     */
    mockAuthFailure(): Chainable<void>;

     /**
     * Установить успешный запрос ордера
     * @example cy.mockCreateOrder()
     */
    mockCreateOrder(orderNumber?: number, delay?:number): Chainable<void>;
  }
}

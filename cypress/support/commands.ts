

// Установить успешную авторизацию
Cypress.Commands.add('mockAuthSuccess', () => {
  cy.intercept('GET', 'api/auth/user', {
     fixture:'user.json'
  }).as('getUserSuccess');

  // Устанавливаем токены
  cy.setCookie('accessToken', 'mock-access-token');
  cy.window().then((window) => {
    window.localStorage.setItem('refreshToken', 'mock-refresh-token');
  });
});

// Установить неуспешную авторизацию (пользователь не авторизован)
Cypress.Commands.add('mockAuthFailure', () => {
  cy.intercept('GET', 'api/auth/user', {
    statusCode: 401,
    body: {
      success: false,
      message: 'You should be authorised'
    }
  }).as('getUserUnauthorized');

  // Очищаем токены
  cy.clearCookie('accessToken');
  cy.window().then((window) => {
    window.localStorage.removeItem('refreshToken');
  });
});

// Создание заказа
Cypress.Commands.add('mockCreateOrder', (orderNumber = 12345, delay = 3000) => {
  cy.intercept('POST', 'api/orders', {
    delay: delay,
    statusCode: 200,
    body: {
    "success": true,
    "name": "Метеоритный заказ",
    "order": {
        "ingredients": [
            {
                "_id": "643d69a5c3f7b9001cfa093d",
                "name": "Флюоресцентная булка R2-D3",
                "type": "bun",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "price": 988,
                "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                "__v": 0
            },
        ],
        "_id": "697a6",
        "owner": {
          "name": "Сан Саныч",
          "email": "order-test@mail.ru",
          "createdAt": "2026-01-08T10:44:06.276Z",
          "updatedAt": "2026-01-08T20:22:41.901Z"
        },
        "status": "done",
        "name": "Метеоритный био-марсианский бессмертный флюоресцентный люминесцентный бургер",
        "createdAt": "2026-01-28T19:57:48.989Z",
        "updatedAt": "2026-01-28T19:57:49.249Z",
        "number": orderNumber,
        "price": 7725
    }
}
  }).as('createOrder');
});

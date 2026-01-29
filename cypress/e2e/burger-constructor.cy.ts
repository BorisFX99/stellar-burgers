describe('Burger Constructor Page', () => {
  describe('Основной функционал страницы для всех пользователей', () => {
    beforeEach(() => {
      // Посещаем главную страницу всегда
      cy.visit('/');
      // Ждем загрузки ингредиентов
      cy.wait('@getIngredients');

      // ---------------- Ищем общие элементы -------------------------
      cy.get('[data-cy="ingredients-section"]').as('ingredientsSection');

      // Список булок и выбранная булка
      cy.contains('h3', 'Булки').next('ul').as('bunsList');
      cy.get('@bunsList').contains('li', 'Флюоресцентная булка R2-D3').as('bun');

      // Список начинок и выбранные ничинки
      cy.contains('h3', 'Начинки').next('ul').as('fillsList');
      cy.get('@fillsList').contains('li', 'Биокотлета из марсианской Магнолии').as('fill-1')
      cy.get('@fillsList').contains('li', 'Хрустящие минеральные кольца').as('fill-2')

      // Список соусов и выбранный сосус
      cy.contains('h3', 'Соусы').next('ul').as('saucesList');
      cy.get('@saucesList').contains('li', 'Соус Spicy-X').as('sauce')

      // Список начинок в конструкторе
      cy.get('[data-cy="burger-filling-list"]').as('filingList')

      // Кнопка Оформить заказ
      cy.get('[data-cy="order-button-container"]').find('button').as('orderButton')

    });

    describe('Загрузка ингредиентов', () => {

      it('Должен получить ингриденты из моковых данных', () => {

        // Проверяем соответсвие наличия ингридиентов в своей секции
        cy.get('@bunsList').find('li').should('have.length', 2);
        cy.get('@bunsList').contains('Краторная булка N-200i');

        cy.get('@fillsList').find('li').should('have.length', 4);
        cy.get('@fillsList').contains('Биокотлета из марсианской Магнолии');

        cy.get('@saucesList').find('li').should('have.length', 2);
        cy.get('@saucesList').contains('Соус Spicy-X');
        });
    })

    describe('Добавление ингридентов в конструтор', () => {

      it ('Смена значения счетчика булки', ()=>{
          // Выбираем первую булку
          cy.get('@bun').within(() => {cy.get('button').click();
            cy.get('@bun').find('.counter__num').should('have.text', '2');
          });

          // 2. Добавляем вторую булку (должна заменить первую)
          cy.get('@bunsList').contains('li', 'Краторная булка N-200i').as('bun2');
          cy.get('@bun2').within(() => {cy.get('button').click();
            cy.get('.counter__num').should('have.text', '2');
          });
          // 3. Проверяем что у первой булки счетчик удален из DOM
          cy.get('@bun').find('.counter__num').should('not.exist');
      })

      it ('Смена значения счетчика начинки', ()=>{
          // Выбираем первую булку
          cy.get('@fill-1').within(() => {cy.get('button').click();
            cy.get('@fill-1').find('.counter__num').should('have.text', '1');
          });
          cy.get('@fill-1').within(() => {cy.get('button').click();
            cy.get('@fill-1').find('.counter__num').should('have.text', '2');
          });
      })
      it ('Смена значения счетчика соуса', ()=>{
          // Выбираем первую булку
          cy.get('@sauce').within(() => {cy.get('button').click();
            cy.get('@sauce').find('.counter__num').should('have.text', '1');
          });
          cy.get('@sauce').within(() => {cy.get('button').click();
            cy.get('@sauce').find('.counter__num').should('have.text', '2');
          });
      })

      it ('Проверка добавления булок в конструктор', ()=> {
          cy.get('@bun').within(() => {cy.get('button').click()});
          cy.get('[data-cy="bun-top"]').find('.constructor-element__text')
            .should('contain.text', 'Флюоресцентная булка R2-D3');
          cy.get('[data-cy="bun-top-default"]').should('not.exist');

          cy.get('[data-cy="bun-bottom"]').find('.constructor-element__text')
            .should('contain.text', 'Флюоресцентная булка R2-D3');
          cy.get('[data-cy="bun-bottom-default"]').should('not.exist');

      })

      it ('Проверка добавление начинки в конструктор', ()=>{
          cy.get('@fill-1').within(() => {cy.get('button').click()});
          cy.get('@filingList').find('li').eq(0).as('firstLi');
          cy.get('@firstLi').find('.constructor-element__text')
            .should('have.text','Биокотлета из марсианской Магнолии');
            //добавляем второй ингр
          cy.get('@fill-2').within(() => {cy.get('button').click()});
          cy.get('@filingList').find('li').eq(1).as('secondLi');
          cy.get('@secondLi').find('.constructor-element__text')
            .should('have.text','Хрустящие минеральные кольца');
          cy.get('[data-cy="burger-filling-list-default"]').should('not.exist');
      })
    })
    describe('Удаление ингредиента ', () => {
      it ('Проверка удаленияи ингредиента из конструктора', ()=> {
          //выбираем два элемента в конструткор
          cy.get('@fill-1').within(() => {cy.get('button').click()});
          cy.get('@fill-2').within(() => {cy.get('button').click()});

          cy.get('@filingList').find('li').eq(1).as('secondLi');
          cy.get('@secondLi').within(()=>{cy.get('.constructor-element__action').click();})
          cy.get('@filingList').find('li').should('have.length', 1);
          cy.get('@filingList')
            .should('not.contain', 'Хрустящие минеральные кольца');
          cy.get('@fill-2').find('.counter__num').should('not.exist');
      })
    })
    describe('Изменение элементов в "начинке" ', () => {
      it ('Проверка смены порядка  элементов в "начинке"', ()=> {
          //выбираем два элемента в конструткор
          cy.get('@fill-1').within(() => {cy.get('button').click()});
          cy.get('@fill-2').within(() => {cy.get('button').click()});
          cy.get('@sauce').within(() => {cy.get('button').click()});

          cy.get('@filingList').find('li').eq(2).as('sauceIngr');
          cy.get('@sauceIngr').find('button').last().should('be.disabled');
          cy.get('@sauceIngr').find('button').first().click();

          cy.get('@filingList').find('li').eq(0).as('cutletIngr');
          cy.get('@cutletIngr').find('button').first().should('be.disabled');
          cy.get('@cutletIngr').find('button').last().click();

          cy.get('@filingList').find('li').should('have.length', 3);
          cy.get('@filingList').find('li').eq(0)
            .find('.constructor-element__text').should('have.text','Соус Spicy-X');
          cy.get('@filingList').find('li').eq(1)
            .find('.constructor-element__text').should('have.text','Биокотлета из марсианской Магнолии')
          cy.get('@filingList').find('li').eq(2)
            .find('.constructor-element__text').should('have.text','Хрустящие минеральные кольца')
      })
    })
    describe('Открытие/закрытие модалки с ингридиентом ', () => {
      beforeEach(() => {
        // Открываем модалку перед каждым тестом
        cy.get('[data-cy="modal-overlay"]').should('not.exist');
        cy.get('@bun').within(() => { cy.get('a').click() });
        cy.get('[data-cy="modal-overlay"]').should('exist').as('modalOverlay');
      });

      it ('Проверка содержимого модалки', ()=> {
          cy.get('[data-cy="modal-title"]').should('have.text','Детали ингредиента');
          cy.get('[data-cy="modal-content"]').should('contain.text','Флюоресцентная булка R2-D3');
          cy.get('[data-cy="modal-close"]').click();
          cy.get('@modalOverlay').should('not.exist');
      })
      it ('Проверка закрытия модалки по клику на оверлей', ()=> {
          cy.get('@modalOverlay').click({ force: true });
          cy.get('@modalOverlay').should('not.exist');
      })
    })
  })
  describe('Проверяем процесс авторизации', () => {

    beforeEach(() => {
      // принудительная очистка токенов
      cy.clearCookies();
      cy.clearLocalStorage();
      // Проверяем отсутвие токенов наверняка
      cy.getCookie('accessToken').should('not.exist');
      cy.window().then((window) => {
        const refreshToken = window.localStorage.getItem('refreshToken');
        expect(refreshToken).to.not.exist;
      });
      // устанавливаем моки аутентификации
      cy.mockAuthSuccess();
      // Посещаем главную страницу
      cy.visit('/');
    });

    afterEach(() => {
      // Очищаем после теста
      cy.clearCookies();
      cy.clearLocalStorage();
    })

    it('Проверяем что access и refresh токены добавлены и соответствуют моковым значениям', () => {
      // Проверяем cookie с accessToken
      cy.getCookie('accessToken')
        .should('exist')
        .and('have.property', 'value', 'mock-access-token');
      // Проверяем localStorage с refreshToken
      cy.window().then((window) => {
        const refreshToken = window.localStorage.getItem('refreshToken');
        expect(refreshToken).to.equal('mock-refresh-token');
      });
    });
  })
  describe('Оформление заказа', () => {

    describe('Успешное создание заказа для авторизованного пользователя ', () => {
      beforeEach(() => {
        // устанавливаем моки аутентификации и оформления заказа
        cy.mockAuthSuccess();
        // 1 арумент номер заказа, 2 это задержка в млс
        cy.mockCreateOrder(125, 3000);

        // Посещаем главную страницу
        cy.visit('/');
        // Ждем загрузки ингредиентов не опять, а снова...
        cy.wait('@getIngredients');

      // ---------------- Ищем общие элементы -------------------------

          // Список булок и выбранная булка
          cy.contains('h3', 'Булки').next('ul').as('bunsList');
          cy.get('@bunsList').contains('li', 'Флюоресцентная булка R2-D3').as('bun');

          // Список начинок и выбранные ничинки
          cy.contains('h3', 'Начинки').next('ul').as('fillsList');
          cy.get('@fillsList').contains('li', 'Биокотлета из марсианской Магнолии').as('fill-1')

          // Кнопка Оформить заказ
          cy.get('[data-cy="order-button-container"]').find('button').as('orderButton')

      });
      afterEach(() => {
        // Очищаем после КАЖДОГО теста
        cy.clearCookies();
        cy.clearLocalStorage();
      })

      it ('Успешное создание заказа', ()=> {
        // Собираем бургер
        cy.get('@bun').within(() => {cy.get('button').click()});
        cy.get('@fill-1').within(() => {cy.get('button').click()});

        // Нажимаем кнопку «Оформить заказ»
        cy.get('@orderButton').click();

        // Модалка открылась
        cy.get('[data-cy="modal-overlay"]').should('exist');
        cy.get('[data-cy="modal-content"]').should('be.visible');
        // Ждем запрос на создание заказа c номером 125

        // Проверяем что прелоадер виден внутри модалки
        cy.get('[data-cy="preloader"]').should('exist').should('be.visible');
        cy.get('[data-cy="modal-title"]').should('be.visible')
          .should('have.text','Оформляем заказ...');
        cy.wait('@createOrder', { timeout: 5000 });

        // Проверяем что прелоадер скрылся
        cy.get('[data-cy="preloader"]').should('not.exist');
        cy.get('[data-cy="modal-title"]').should('have.text', '')

        // Появление номера заказа вместо прелоадера
        cy.get('[data-cy="modal-content"]').find('h2').and('have.text','125');
        // Закрываем модалку
        cy.get('[data-cy="modal-close"]').click();
        cy.get('[data-cy="modal-overlay"]').should('not.exist');

        //Проверяем дефолтные значения пустого конструкта
        cy.get('[data-cy="bun-top-default"]').should('exist');
        cy.get('[data-cy="burger-filling-list-default"]').should('exist');
        cy.get('[data-cy="bun-bottom-default"]').should('exist');

        // Проверяем что счетчики ингров очистились
        cy.get('@bun').find('.counter__num').should('not.exist');
        cy.get('@fill-1').find('.counter__num').should('not.exist');
      })
    })

    describe('Неуспешное создание заказа (неавторизованный)', () => {
      beforeEach(() => {
        // Мокаем НЕУСПЕШНУЮ авторизацию
        cy.mockAuthFailure();

        // Очищаем ВСЕ токены (на всякий случай, а случай бывает всякий....)
        cy.clearCookies();
        cy.clearLocalStorage();

        // Загружаем страницу
        cy.visit('/');
        cy.wait('@getIngredients');

        // Находим элементы
        cy.contains('h3', 'Булки').next('ul').as('bunsList');
        cy.get('@bunsList').contains('li', 'Флюоресцентная булка R2-D3').as('bun');
        cy.contains('h3', 'Начинки').next('ul').as('fillsList');
        cy.get('@fillsList').contains('li', 'Биокотлета из марсианской Магнолии').as('fill-1');
        cy.get('[data-cy="order-button-container"]').find('button').as('orderButton');
      });

      it('Редирект на страницу логина при попытке создать заказ без авторизации', () => {
        cy.get('@bun').within(() => {cy.get('button').click()});
        cy.get('@fill-1').within(() => {cy.get('button').click()});
        cy.get('@orderButton').click();

        //  Проверяем редирект на /login
        cy.url().should('include', '/login');
        cy.url().should('eq', 'http://localhost:4000/login');//строгая проверка по полному адресу

        // -- Дополнительно можно проверить --
        // Что текущий URL не остался на главной
        cy.url().should('not.eq', 'http://localhost:4000/');
      });
    })
  })
})

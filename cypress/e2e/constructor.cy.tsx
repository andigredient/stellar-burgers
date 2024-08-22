//если вынести селектор в константу на данную сторчку, то выдает ошибку
describe('действия неавторизованного пользователя', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });
  describe('добавление ингредиентов в конструктор', () => {
    it('добавление булок', () => {
      const bunButton = cy.get('[data-cy="643d69a5c3f7b9001cfa093c"] button');
      bunButton.click();
      const buns = cy.get('[data-cy="bun"]');
      buns.should('have.length', 2);
    });
    it('добавление начинки', () => {
      const ingButton = cy.get('[data-cy="643d69a5c3f7b9001cfa0941"] button');
      ingButton.click();
      const ingredients = cy.get('[data-cy="ingredients"]');
      ingredients.children().should('have.length', 1);
    });
  });

  describe('тест модальных окон', () => {
    beforeEach(() => {
      const ingredient = cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]');
      ingredient.click();
    });
    it('открытие', () => {
      const modal = cy.get('[data-cy="modal"]');
      modal.should('exist');
    });
    it('закрытие по клике на крестик', () => {
      const modal = cy.get('[data-cy="modal"]');
      const closeButton = cy.get('[data-cy="close-button"]');
      closeButton.click();
      modal.should('not.exist');
    });
    it('закрытие по клику на оверлей', () => {
      const modal = cy.get('[data-cy="modal"]');
      const overlay = cy.get('[data-cy="modal-overlay"]');
      overlay.click({ force: true });
      modal.should('not.exist');
    });
  });
});

describe('действия авторизованного пользователя', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.setCookie(
      'accessToken',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzE3ZTA1ODU2Nzc3MDAxYmIxYmQxOSIsImlhdCI6MTcxODcxMzg2MSwiZXhwIjoxNzE4NzE1MDYxfQ.sR_uJsvlq4EL72ka0pJ3FTwGzoeVwoj-w_ZSdXz0m3w'
    );
    cy.visit('/');
  });
  describe('тест заказа', () => {
    it('создание заказа', () => {
      const bunButton = cy.get('[data-cy="643d69a5c3f7b9001cfa093c"] button');
      const ingButton = cy.get('[data-cy="643d69a5c3f7b9001cfa0941"] button');
      const orderButton = cy.get('[data-cy="total"] button');
      bunButton.click();
      ingButton.click();
      orderButton.click();

      const orderModal = cy.get('[data-cy="modal"]');
      const orderNumber = cy.get('[data-cy="order-number"]');
      orderModal.should('exist');
      orderNumber.contains('43237');

      const closeButton = cy.get('[data-cy="close-button"]');
      closeButton.click();
      orderModal.should('exist');

      const noIngredients = cy.get('[data-cy="no-ingredients"]');
      noIngredients.should('have.length', 2);
    });
  });
});

/// <reference types="cypress" />

describe('service is available', () => {
  before(function () {
    cy.visit('http://localhost:3000');
    cy.viewport(1280, 720);
  });

  it("Page should contain elements 'Соберите бургер', 'Булки', 'Соусы', 'Начинки', 'Оформить заказ'",
    () => {
      cy.get('main')
        .should('contain', 'Соберите бургер')
        .should('contain', 'Булки')
        .should('contain', 'Соусы')
        .should('contain', 'Начинки')
        .should('contain', 'Оформить заказ')
    });

  it("After click 'Начинки' options should scroll to 'Начинки'", () => {
    cy.get("*[class^='tab_tab__']").contains('Начинки').click();
    cy.get("*[class^='burger-ingredients_options']").should('be.visible');
  });

  it("After click ingredient in options should open modal window with clicked ingredient and closing by clicked close",
  () => {
    cy.get("*[class^='burger-ingredients_ingredient__']")
      .first()
      .as('ingredient');

    cy.get('@ingredient')
      .find("[class^='text text_type_main-default']")
      .invoke('text')
      .as('name')
    
    cy.get('@ingredient').click();
    cy.get("*[class^='modal_modal__']").as('modal');
    cy.get('@modal').should('contain', 'Детали ингредиента');
    cy.get('@name').then( name => {
      cy.get('@modal').find("*[class$='text_type_main-medium']").should('have.text', name)
    });
    cy.get('@modal').find("*[class^='modal_modal-close__']").click();

    cy.get('@modal').should('not.exist');
  });

  it("Should transfer bun to constructor",
  () => {
    cy.get("*[class^='burger-ingredients_ingredient__']")
      .first()
      .trigger("dragstart")
      .trigger("dragleave");

    cy.get("*[class^='burger-constructor_list__']")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend")
  })

  it("Click 'Сделать заказ' should transfer to login page if not auth. After should popup modal window with order number",
  () => {
    const email = 'batis47@yandex.ru';
    const pass = 'зфыыцщкв';

    cy.get('main').contains('Оформить заказ').click();

    cy.url().then( url => {
      if(url.includes('login')){
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type(pass);
        cy.get('button').click();
        cy.get('main').contains('Оформить заказ').click();
      }
    })

    cy.get("*[class^='order-details_order__']").should('exist');
  })  

})
/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
'use strict'
 class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    try {
      if (!element) {
        throw new Error('Элемент не существует!');
      }
      this.element = element;
      this.registerEvents();
    } catch (error) {
      console.error('Error: ', error);
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const newIncomeBtn = document.querySelector('.create-income-button');
    const newExpenseBtn = document.querySelector('.create-expense-button');

    newIncomeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      App.getModal('newIncome').open();
    });

    newExpenseBtn.addEventListener('click', (event) => {
      event.preventDefault();
      App.getModal('newExpense').open();
    });
  }
};
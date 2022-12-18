/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
'use strict'
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    User.login(options, (err, response) => {
      try {
        if (!response.success) {
          throw new Error(`Ошибка входа: ${response.error}`);
        }
        App.setState('user-logged');
        this.element.reset();
        App.getModal('login').close();
      } catch (error) {
        alert('Проверьте логин или пароль!');
      }
    });
  };
};
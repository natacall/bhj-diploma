/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
'use strict'

const createRequest = (options = {}) => {

  const dataList = [];
  const callback = (options.callback) ? options.callback : (f) => f;

  for (const key in options.data) {
    if (options.data.hasOwnProperty(key)) {
      const element = `${key}=${options.data[key]}`;
      dataList.push(element);
    }
  }

  const method = options.method;
  let url = options.url;

  const xhr = new XMLHttpRequest();
  const headers = options.headers;
  for (let header in headers) {
    if (headers.hasOwnProperty(header)) {
      xhr.setRequestHeader(header, headers[header]);
    }
  }

  xhr.responseType = 'json';
  xhr.withCredentials = true;

  if (method == "GET") {
    url = `${url}?${dataList.join('&')}`;
    xhr.open(method, url);
    xhr.send();
  } else {
    const formData = new FormData();
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }

    xhr.open(method, url);
    xhr.send(formData);
  }

  xhr.onload = () => {
    if (xhr.status !== 200) {
      const err = `Ошибка ${xhr.status}: ${xhr.statusText}`;
      callback(err);
    } else {
      const response = xhr.response;
      callback(null, response);
    }
  }

  xhr.onerror = () => {
    const err = 'Ошибка запроса';
    callback(err);
  }
};
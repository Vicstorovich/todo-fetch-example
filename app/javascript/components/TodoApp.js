import React from "react";
import App from "./todo/app";
import SwapiServece from "../services/swapi-service";
import PropTypes from "prop-types";

class TodoApp extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <React.Fragment>
        <h1>Start page Todo application</h1>
        <App items={items} />
      </React.Fragment>
    );
  }
}

export default TodoApp;
//
// const test = new SwapiServece();

// const consolle = () => {
//   let sum = 2 + 2;
//   return console.log(sum);
// };

// // test.postItem({ item: { label: "TEST" } });
// const r() {
// test.putItem(53, { item: { label: "", done: true } };
// }
// test.deleteItem(123);

// const getResources = async url => {
//   const respond = await fetch(url);
//   const body = await respond.json();
//   return body;
// };

// getResources("http://localhost:3000/api/v1/items/43").then(body => {
//   console.log("Fetxh", body);
// });

// post("http://localhost:3000/api/v1/items", { item: { label: "" } }).then(data =>
//   console.log("Type1", data)
// ); // обрабатываем результат вызова response.json()
// .catch(error => console.error("Error", error));

function post(url, data) {
  return fetch(url, {
    credentials: "same-origin", // параметр определяющий передвать ли разные сессионные данные вместе с запросом
    method: "POST", // метод POST
    body: JSON.stringify(data), // типа запрашиаемого документа
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(response => response.json())
    .catch(error => console.error("Error", error)); // возвращаем промис
}

function update(url, data) {
  return fetch(url, {
    credentials: "same-origin", // параметр определяющий передвать ли разные сессионные данные вместе с запросом
    method: "PUT", // метод POST
    body: JSON.stringify(data), // типа запрашиаемого документа
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(response => response.json()); // возвращаем промис
}
// update("http://localhost:3000/api/v1/items/51", {
//   item: { label: "DTF", done: true }
// })
//   .then(data => console.log("Type1", data)) // обрабатываем результат вызова response.json()
//   .catch(error => console.error(error));

function deLete(url) {
  return fetch(url, {
    credentials: "same-origin", // параметр определяющий передвать ли разные сессионные данные вместе с запросом
    method: "DELETE", // метод POST
    // body: JSON.stringify(data), // типа запрашиаемого документа
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
}

// deLete("http://localhost:3000/api/v1/items/61") // обрабатываем результат вызова response.json()
//   .catch(error => console.error(error));

export default class SwapiService {
  _apiBase = "http://localhost:3000/api/v1";

  actionWithResource = async (url, meth, data) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      credentials: "same-origin",
      method: meth,
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }

    return await res.json();
  };

  deleteResource = async url => {
    console.log("url", url);
    const res = await fetch(`${this._apiBase}${url}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });
    if (!res.ok) {
      throw new Error(`Could not delete ${url}` + `, received ${res.status}`);
    }
  };

  postItem = async (data, func) => {
    if (await this.actionWithResource(`/items/`, "POST", data)) {
      func(data.item);
    }
  };

  putItem = async (id, data, func) => {
    if (await this.actionWithResource(`/items/${id}/`, "PUT", data)) {
    }
  };

  deleteItem = async (id, func) => {
    console.log("deleteItem", func);
    if (await this.deleteResource(`/items/${id}/`)) {
      func(id);
    }
  };
}

// document.addEventListener("DOMContentLoaded", () => {
//   const ajaxSend = formData => {
//     fetch("mail.php", {
//       // файл-обработчик
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json" // отправляемые данные
//       },
//       body: JSON.stringify(formData)
//     })
//       .then(response => alert("Сообщение отправлено"))
//       .catch(error => console.error(error));
//   };

//   const forms = document.getElementsByTagName("form");
//   for (let i = 0; i < forms.length; i++) {
//     forms[i].addEventListener("submit", function(e) {
//       e.preventDefault();

//       let formData = new FormData(this);
//       formData = Object.fromEntries(formData);

//       ajaxSend(formData);
//       this.reset();
//     });
//   }
// });

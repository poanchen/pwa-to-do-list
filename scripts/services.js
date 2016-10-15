myApp.services = {
  todos: {
    create: function (data) {
      // this is okay for now, but in the future we need to change this to something else like
      // some kind of hashing
      var todoKey = data.key == null? Math.floor(Math.random()*100000): data.key;
      var todoDescription = data.description;
      var todoCreateDate = data.createDate;
      var flag = data.flag;

      var parentDiv = document.createElement("div");
      parentDiv.classList.add('card');
      parentDiv.classList.add('cardTemplate');
      parentDiv.classList.add('weather-forecast');
      
      var childDiv1 = document.createElement("div");
      childDiv1.classList.add('location');
      var description = document.createTextNode(todoDescription);
      childDiv1.appendChild(description);
      parentDiv.appendChild(childDiv1);
      
      var childDiv2 = document.createElement("div");
      childDiv2.classList.add('date');
      var date = document.createTextNode(todoCreateDate);
      childDiv2.appendChild(date);
      parentDiv.appendChild(childDiv2);

      var main = document.getElementById('main');
      document.querySelector('.main').insertBefore(parentDiv, main.childNodes[0]);
      if (flag) {
        document.querySelector('#myNavigator').popPage();
      }

      var todo = {
        key: todoKey,
        description: todoDescription,
        createDate: todoCreateDate
      };
      myApp.services.listOfTodos.push(todo);
      myApp.services.todos.saveToCache();
    },
    saveToCache: function () {
      // localStorage should not be used as it has performance issue, in production, use indexDB instead
      var listOfTodos = JSON.stringify(myApp.services.listOfTodos);
      localStorage.listOfTodos = listOfTodos;
    },
    getListOfTodosFromCache: function () {
      // localStorage should not be used as it has performance issue, in production, use indexDB instead
      return localStorage.listOfTodos;
    }
  },

  listOfTodos: []
};
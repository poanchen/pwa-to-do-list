window.myApp = {};

document.addEventListener('init', function (event) {
  var page = event.target;

  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  if (page.id === 'menuPage') {
    var todosFromCache = myApp.services.todos.getListOfTodosFromCache();
    if (typeof todosFromCache != 'undefined') {
      JSON.parse(todosFromCache).forEach(function (data) {
        var todo = {
          key: data.key,
          description: data.description,
          createDate: data.createDate,
          flag: false
        };
        myApp.services.todos.create(todo);
      });
    }
  }
});
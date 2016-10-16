window.myApp = {};

document.addEventListener('init', function (event) {
  var page = event.target;

  // set up indexedDB if needed
  myApp.services.db.setUp();

  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  if (page.id === 'menuPage') {
    var todosFromCache = myApp.services.db.getListOfTodosFromCache();
    // this is for localStorage return value, as indexedDB is async, hence,
    // it will be undefined when it gets here.
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
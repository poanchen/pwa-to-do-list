window.myApp = {};

document.addEventListener('init', function (event) {
  var page = event.target;

  // set up indexedDB if needed
  myApp.services.db.setUp();

  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  if (page.id === 'menuPage') {
    var request = new XMLHttpRequest();

    // try to grab all the todos from the api/todos first
    // if the api is not available, then we will try
    // the localStorage/IndexedDB solutions
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var response = JSON.parse(request.response);
          
          response.todos.forEach(function(eachTodo) {
            var todo = {
              key: eachTodo.key.N,
              description: eachTodo.description.S,
              createDate: eachTodo.createDate.S,
              flag: false
            };

            myApp.services.todos.create(todo);
          })
        }
      }
    };
    request.open('GET', "/api/todos", true);
    request.send();
    // // seems like api/todos is not available lets try
    // // the localStorage/IndexedDB solutions instead
    // var todosFromCache = myApp.services.db.getListOfTodosFromCache();
    // // this is for localStorage return value, as indexedDB is async, hence,
    // // it will be undefined when it gets here.
    // if (typeof todosFromCache != 'undefined') {
    //   JSON.parse(todosFromCache).forEach(function (data) {
    //     var todo = {
    //       key: data.key,
    //       description: data.description,
    //       createDate: data.createDate,
    //       flag: false
    //     };
    //     myApp.services.todos.create(todo);
    //   });
    // }
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
     .register('./service-worker.min.js')
     .then(function() { console.log('Service Worker Registered'); });
  }
});

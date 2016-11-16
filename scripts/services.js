myApp.services = {
  db: {
    setUp: function (date) {
      window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
      window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

      var db;
      var objectStore;
      var dbOpenRequest = window.indexedDB.open("newTodoList", 1);

      dbOpenRequest.onsuccess = function(event) {
        db = dbOpenRequest.result;
        console.log("successfully open the newTodoList from indexedDB!");
      };

      dbOpenRequest.onerror = function(event) {
        console.log("sth went wrong when opening indexedDB!");
      };

      dbOpenRequest.onupgradeneeded = function(event) { 
        db = event.target.result;

        db.onerror = function(event) {
          console.log("sth went wrong when opening indexedDB in onupgradeneeded!");
        };

        objectStore = db.createObjectStore("toDoList", { keyPath: "key" });
        console.log("nice, everything went well");
      };
    },
    saveListOfTodosToCache: function (todo) {
      var listOfTodos = JSON.stringify(myApp.services.listOfTodos);
      
      if (!window.indexedDB) {
        localStorage.listOfTodos = listOfTodos;
      }else{
        myApp.services.db.checkIfTodoIsInCacheIfNotThenAdd(todo);
      }
    },
    getListOfTodosFromCache: function () {
      if (!window.indexedDB) {
        return localStorage.listOfTodos;
      }else{
        var dbOpenRequest = window.indexedDB.open("newTodoList", 1);

        dbOpenRequest.onsuccess = function(event) {
          db = dbOpenRequest.result;
          var transaction = db.transaction(["toDoList"], "readonly");

          transaction.oncomplete = function() {
            console.log("oncomplete from getListOfTodosFromCache");
          };

          transaction.onerror = function() {
            console.log("onerror from getListOfTodosFromCache");
          };

          var objectStore = transaction.objectStore("toDoList");

          if ('getAll' in objectStore) {
            objectStore.getAll().onsuccess = function(event) {
              var result = event.target.result;

              result.forEach(function (data) {
                var todo = {
                  key: data.key,
                  description: data.description,
                  createDate: data.createDate,
                  flag: false
                };
                myApp.services.todos.create(todo);
              });
            };
          }else{
            // Fallback to the traditional cursor approach if getAll isn't supported.
            // for ref, go to https://googlechrome.github.io/samples/idb-getall/
            objectStore.openCursor().onsuccess = function(event) {
              var cursor = event.target.result;

              if (cursor) {
                var todo = {
                  key: cursor.value.key,
                  description: cursor.value.description,
                  createDate: cursor.value.createDate,
                  flag: false
                };
                myApp.services.todos.create(todo);
                cursor.continue();
              }
            };
          }
        };
      }
    },
    checkIfTodoIsInCacheIfNotThenAdd: function (todo) {
      var dbOpenRequest = window.indexedDB.open("newTodoList", 1);

      dbOpenRequest.onsuccess = function(event) {
        db = dbOpenRequest.result;
        var transaction = db.transaction(["toDoList"], "readwrite");

        transaction.oncomplete = function() {
          console.log("oncomplete from checkIfTodoIsInCacheIfNotThenAdd");
        };

        transaction.onerror = function() {
          console.log("onerror from checkIfTodoIsInCacheIfNotThenAdd");
        };

        var objectStore = transaction.objectStore("toDoList");

        objectStore.get(todo.key).onsuccess = function(event) {
          var result = event.target.result;

          if (typeof result == 'undefined') {
            objectStore.add(todo).onsuccess = function(event) {
              console.log("nice...from checkIfTodoIsInCacheIfNotThenAdd");
            };
          }else{
            // this usually happen when the web app starts up in the beginning
            console.log("already in the cache, no need to add");
          }
        }
      }
    }
  },

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
      myApp.services.db.saveListOfTodosToCache(todo);
    }
  },

  listOfTodos: []
};
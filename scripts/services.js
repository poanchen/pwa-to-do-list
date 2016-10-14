myApp.services = {
  todos: {
    create: function (data) {
      var parentDiv = document.createElement("div");
      parentDiv.classList.add('card');
      parentDiv.classList.add('cardTemplate');
      parentDiv.classList.add('weather-forecast');
      
      var childDiv1 = document.createElement("div");
      childDiv1.classList.add('location');
      var description = document.createTextNode(data.description);
      childDiv1.appendChild(description);
      parentDiv.appendChild(childDiv1);
      
      var childDiv2 = document.createElement("div");
      childDiv2.classList.add('date');
      var date = document.createTextNode(data.createDate);
      childDiv2.appendChild(date);
      parentDiv.appendChild(childDiv2);

      document.querySelector('.main').appendChild(parentDiv);
      document.querySelector('#myNavigator').popPage();
    }
  }
};
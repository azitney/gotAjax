$(document).ready(function() {
  //Charachters
  let arr = ['583', '1303', '148'];
  for (let i = 0; i < arr.length; i++) {
    addCharacter(arr[i]);
  }

  $('#inputChar').keydown(function(e) {
    if (13 == e.keyCode) {
      let newChar = document.getElementById('inputChar').value;
      arr.push(newChar);
      addCharacter(newChar);
      console.log(arr);
      console.log(newChar);
    }
  });



  function addCharacter(char) {
    $.get(`https://www.anapioficeandfire.com/api/characters/${char}`, function(characters) {
      //creating initital divs
      let divZero = document.createElement('div');
      divZero.className = 'game col s8 m4';
      $('#charRow').append(divZero);

      let div = document.createElement('div');
      div.className = 'card blue-grey darken-2';
      $(divZero).append(div);

      let div1 = document.createElement('div');
      div1.className = 'card-content char-content white-text';
      $(div).append(div1);
      //appending name
      $(div1).append(`<span class="card-title">${characters.name}</span>`);
      //appening titles
      for (let j = 0; j < characters.titles.length; j++) {
        $(div1).append(`<p>${characters.titles[j]}</p>`);
      }
      //appenging spouse ot no spouse
      if (characters.spouse !== "") {

        let div3 = document.createElement('div');
        div3.className = 'card-action';
        $(div).append(div3);

        $.get(characters.spouse, function(spouse) {
          let id = characters.spouse.slice(characters.spouse.lastIndexOf('/')+1,characters.spouse.length);
          $(div3).append(`<a id="${id}" class=" blue-text">${spouse.name}</a>`);
          console.log(id);
          //href=${characters.spouse}
          $(`#${id}`).click(function(e){
            addCharacter(id);
          })
        });
      } else {

        let div3 = document.createElement('div');
        div3.className = 'card-action';
        $(div).append(div3);
        $(div3).append(`<a class="blue-text">No Spouse</a>`);

      }

    });

  }


  let arr2 = ['378', '362', '302'];
  for (let i = 0; i < arr2.length; i++) {
    addHouse(arr2[i]);
  }

  $('#inputHouse').keydown(function(e) {
    if (13 == e.keyCode) {
      let newHouse = document.getElementById('inputHouse').value;
      arr2.push(newHouse);
      addHouse(newHouse);
      console.log(arr2);
      console.log(newHouse);
    }
  });


  function addHouse(newHouse) {
    $.get(`https://www.anapioficeandfire.com/api/houses/${newHouse}`, function(houses) {
      let divZero = document.createElement('div');
      divZero.className = 'house col s8 m4';
      $('#houseRow').append(divZero);

      let div = document.createElement('div');
      div.className = 'card blue-grey darken-2';
      $(divZero).append(div);

      let div1 = document.createElement('div');
      div1.className = 'card-content house-content white-text';
      $(div).append(div1);
      //appending house name
      $(div1).append(`<span class="card-title">${houses.name}</span>`);
      //appending region
      $(div1).append(`<p>${houses.region}</p>`);
      //appending current lord
      if (houses.currentLord !== "") {

        let div3 = document.createElement('div');
        div3.className = 'card-action';
        $(div).append(div3);

        $.get(houses.currentLord, function(lord) {
          let id = houses.currentLord.slice(houses.currentLord.lastIndexOf('/')+1,houses.currentLord.length);
          $(div3).append(`<a id="${id}" class="blue-text" >${lord.name}</a>`);
          $(`#${id}`).click(function(e){
            addCharacter(id);
          })
        });
      } else {

        let div3 = document.createElement('div');
        div3.className = 'card-action';
        $(div).append(div3);
        $(div3).append(`<a class="blue-text">No Leader</a>`);

      }
      //appending heir
      if (houses.heir !== "") {
        $.get(houses.heir, function(heir) {
          let id = houses.heir.slice(houses.heir.lastIndexOf('/')+1,houses.heir.length);
          let div3 = document.createElement('div');
          div3.className = 'card-action';
          $(div).append(div3);
          $(div3).append(`<a id="${id}" class="blue-text" >${heir.name}</a>`);
          $(`#${id}`).click(function(e){
            addCharacter(id);
          })
        });
      } else {

        let div3 = document.createElement('div');
        div3.className = 'card-action';
        $(div).append(div3);
        $(div3).append(`<a class="blue-text">No Heir</a>`);

      }
    });
  }




});

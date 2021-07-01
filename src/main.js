import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {CatService} from './cat-service';

$(document).ready(function() {
  $('.get-button').click(function (event) {
    event.preventDefault();
    const numCats = $('#numCats').val();
    makeApiCall(numCats);
    $('.cat-container').html("");
    $('#numCats').val("");
  });
});

async function makeApiCall(numCats) {
  if (numCats>24) {
    numCats=24;
  }
  for(let i=0; i<numCats; i++) {
    const catPhoto = await CatService.getCatPicture();
    const catFact = await CatService.getCatFact();
    const catName = await CatService.getCatName();
    const catStats = await CatService.getCatStats();
    const catDrink = await CatService.getDrink();
    outputCat(i, catPhoto, catFact, catName, catStats, catDrink);
  }
}
function outputCat(catNum, catPhoto, catFact, catName, catStats, catDrink) {
  
  $('.cat-container').append(`
    <div class="cat-box">
      <div class="cat-liner">
        <div class="card cat">
          <div class="card-img-top" id="cat-image-${catNum}" style="background-image: url('${catPhoto.webpurl}')"></div>
          <div class="card-body">
            <h5 class="card-title" class="cat-name">${catName.results[Math.floor(Math.random()*750)].name.toUpperCase()}</h5>
            <p class="card-text" class="cat-fact"><em>${catFact.fact}</em></p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" id="drink-${catNum}"><strong>Favorite Drink: </strong>${catDrink.drinks[0].strDrink}</li>
            <li class="list-group-item" id="stat1-${catNum}"><strong>Height: </strong>${catStats.height} centimeters</li>
            <li class="list-group-item" id="stat2-${catNum}"><strong>Weight: </strong>${catStats.weight} grams</li>
          </ul>
        </div>
        <div class="card cat-back">
          <div class="card-img-top" id="drink-image-${catNum}" style="background-image: url('${catDrink.drinks[0].strDrinkThumb}')"></div>
          <div class="card-body">
            <h5 class="card-title" class="drink-name">${catDrink.drinks[0].strDrink.toUpperCase()}</h5>
            <p class="card-text" class="cat-fact"><em>${catDrink.drinks[0].strInstructions}</em></p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" id="drink-${catNum}"><strong>CATegory: </strong>${catDrink.drinks[0].strCategory}</li>
            <li class="list-group-item" id="glass-${catNum}"><strong>Glass: </strong>${catDrink.drinks[0].strGlass}</li>
            <li class="list-group-item" id="drink-ingredients-${catNum}"><strong>Ingredients: </strong><ul class="ingredients" id="ingredients-${catNum}"></ul></li>
          </ul>
        </div>
      </div>
    </div>
  `);
  let ingredientArray = [
    catDrink.drinks[0].strIngredient1,
    catDrink.drinks[0].strIngredient2,
    catDrink.drinks[0].strIngredient3,
    catDrink.drinks[0].strIngredient4,
    catDrink.drinks[0].strIngredient5,
    catDrink.drinks[0].strIngredient6,
    catDrink.drinks[0].strIngredient7,
    catDrink.drinks[0].strIngredient8,
    catDrink.drinks[0].strIngredient9,
    catDrink.drinks[0].strIngredient10,
    catDrink.drinks[0].strIngredient11,
    catDrink.drinks[0].strIngredient12,
    catDrink.drinks[0].strIngredient13,
    catDrink.drinks[0].strIngredient14,
    catDrink.drinks[0].strIngredient15
  ];

    let measureArray = [
      catDrink.drinks[0].strMeasure1,
      catDrink.drinks[0].strMeasure2,
      catDrink.drinks[0].strMeasure3,
      catDrink.drinks[0].strMeasure4,
      catDrink.drinks[0].strMeasure5,
      catDrink.drinks[0].strMeasure6,
      catDrink.drinks[0].strMeasure7,
      catDrink.drinks[0].strMeasure8,
      catDrink.drinks[0].strMeasure9,
      catDrink.drinks[0].strMeasure10,
      catDrink.drinks[0].strMeasure11,
      catDrink.drinks[0].strMeasure12,
      catDrink.drinks[0].strMeasure13,
      catDrink.drinks[0].strMeasure14,
      catDrink.drinks[0].strMeasure15
    ];
    let finalArray = [];
    for (let i=0; i<=14; i++) {
      let temp = "";
      if(measureArray[i] !== null) {
        temp = temp + measureArray[i]+" ";
      }
      if(ingredientArray[i] !== null) {
        temp += ingredientArray[i];
      }
      if ((measureArray[i] !== null) && (ingredientArray[i] !== null)) {
        finalArray.push(temp);
      }
    }

    ingredientArray.forEach((element, index) => {
      if (element != null) {
        $(`#ingredients-${catNum}`).append(`<li>${measureArray[index]} ${element}</li>`);
      }
    });
}
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {CatService} from './cat-service';
//import InsultService from './cat-service';

$(document).ready(function() {
    makeApiCall();
    $('.get-button').click(function () {
      makeApiCall();
    });
});


async function makeApiCall() {
  const response = await CatService.getCatPicture();
  display(response);
  const response2 = await CatService.getCatFact();
  display2(response2);
  const catName = await CatService.getCatName();
  displayCatName(catName);
  const catStats = await CatService.getCatStats();
  displayCatStats(catStats);
  const catDrink = await CatService.getDrink();
  displayDrink(catDrink);
}

function display(response) {
  if (response) {
    $('#image1').html(`<img class="card-img-top" id="cat-img" src="${response.webpurl}" alt="Cat Top Image">`);
  } else {
    $('.showErrors').text(`There was an error`);
  }
}

function display2(response) {
  if (response) {
    console.log(response.fact)
    $('#cat-fact').text(response.fact);
  } else {
    $('.showErrors').text(`There was an error`);
  }
}
function displayCatName(response) {
  let max = 750;
  let seed = Math.floor(Math.random() * max);
  console.log(response.results[seed].name);
  if (response) {
    $('#cat-name').text(response.results[seed].name.toUpperCase());
  } else {
    $('.showErrors').text(`There was an error`);
  }
}
function displayCatStats(response) {
  console.log(response.height);
  console.log(response.weight);
  if (response) {
    $('#stat-1').text(`Height: ${response.height} inches`);
    $('#stat-2').text(`Weight: ${response.weight} grams`);
  } else {
    $('.showErrors').text(`There was an error`);
  }
}

function displayDrink(response) {
  if (response) {
    console.log(response);
    $('#drink-1').text(`Favorite drink: ${response.drinks[0].strDrink}`);
  } else {
    $('.showErrors').text(`There was an error`);
  }
}

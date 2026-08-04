import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import View from './views/View.js';

// if(module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function() {
  const id = window.location.hash.slice(1);
  try {
    if(!id) return;

    resultsView.update(model.getSearchResults())

    // 1) loading recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id);    
    
    // 2) rendering the recipe
    recipeView.render(model.state.recipe)
    bookmarksView.update(model.state.bookmarks)
    
  } catch(err) {
    recipeView.renderError()
  }
}

const controlSearchResults = async function() {
  try {
    
    const query = searchView.getQuery();
    if(!query) return;
    resultsView.renderSpinner();
    
    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResults());

    paginationView.render(model.state.search)


  }catch(err) {
    console.error(err);
  }
}

const controlPagination = function(goToPage) {
  resultsView.render(model.getSearchResults(goToPage));
  paginationView.render(model.state.search)
}

const controlServings = function(newServings) {
  model.updateServings(newServings);

  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function() {
  //Add/remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else { model.removeBookmark(model.state.recipe.id)};

  //Update the recipe view
  recipeView.update(model.state.recipe);

  //Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {
  try {
    //show loading spinner
    addRecipeView.renderSpinner();

     await model.uploadRecipe(newRecipe);
     console.log(model.state.recipe);

     //render recipe
     recipeView.render(model.state.recipe);

     //success message
     addRecipeView.renderMessage();

     //render bookmarks
     bookmarksView.render(model.state.bookmarks);

     //change the url
     window.history.pushState(null, '', `#${model.state.recipe.id}`)

     //close form window
     setTimeout(function() {
      addRecipeView.toggleWindow();
     }, MODEL_CLOSE_SEC)

  } catch(err) {
    addRecipeView.renderError(err.message)
  }
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView._addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView._addHandlerUpload(controlAddRecipe);

}

init();




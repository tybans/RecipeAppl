const searchBox = document.querySelector(".searchBox");
const searchButton = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const closeBtn = document.querySelector(".recipe-close-btn");
const recipeDetails = document.querySelector(".recipe-details-content");



//function to get recipies
const fetchRecipe = async (query) =>{
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
        
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        //console.log(response);
        recipeContainer.innerHTML = "";
        response.meals.forEach(meal =>{
            // console.log(meal);
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            
            `

            const button = document.createElement("button");
            button.textContent = "view Recipe";
            recipeDiv.appendChild(button);

            // adding event listener to recipe button
            button.addEventListener("click", ()=>{
                openRecipeModel(meal);
            })

            recipeContainer.appendChild(recipeDiv);
        })
    } catch (error) {
        recipeContainer.innerHTML=`<div class="error" ><h2>Recipe not Found!!!</h2>
        <img src="/404food.jpg"  alt=""> `
    }
}

// function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    // console.log(meal);
    let ingredientLists = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientLists += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientLists;
}

// creating function for model/popup
const openRecipeModel = (meal) =>{
    recipeDetails.innerHTML = `
        <h2 class ="recipe-name">${meal.strMeal}</h2>
        <h3>Ingredients: </h3>
        <ul class ="ingredient-lists">${fetchIngredients(meal)}</ul>
        <div class ="instructions">
            <h3>Instructions: </h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
    recipeDetails.parentElement.style.display = "block";
}


closeBtn.addEventListener("click", () =>{
    recipeDetails.parentElement.style.display = "none";
})


searchButton.addEventListener("click",(e)=>{
    // to prevent auto submit
    e.preventDefault();

    const searchInput = searchBox.value.trim();

    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal you want search!!!</h2>`;
        return;
    }
    fetchRecipe(searchInput);
    // console.log("button clicked");
})
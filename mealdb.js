const alertText = document.getElementById("alert");
const searchFood = () => {
  const inputField = document.getElementById("food-search-input");
  const inputText = inputField.value;
  inputField.value = "";
  if (inputText === "") {
    alertText.style.display = "block";
    alertText.innerText = "please write something";
  } else {
    alertText.style.display = "none";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayFood(data.meals));
    spinnerControl("food-search-input", "keydown", "block");
    spinnerControl("food-search-input", "keyup", "none");
  }
};

const spinnerControl = (idName, eventMethod, DoMethod) => {
  document.getElementById(idName).addEventListener(eventMethod, function () {
    document.getElementById("spinner-control").style.display = DoMethod;
  });
};

const displayFood = (meals) => {
  const mealSearchAdd = document.getElementById("meal-search-add");
  //   mealSearchAdd.innerHTML = "";
  mealSearchAdd.textContent = "";
  document.getElementById("spinner-control").style.display = "none";

  meals.forEach((meal) => {
    // console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div onclick="displayMore('${meal.idMeal}')" class="card h-100">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">
        This is a longer card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
      </p>
    </div>
  </div>
    `;
    mealSearchAdd.appendChild(div);
  });
};

const displayMore = (mealId) => {
  //   console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  //   console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => moreAdd(data.meals));
};
const moreAdd = (meals) => {
  //   console.log(meals);
  const moreAdds = document.getElementById("more-add");
  moreAdds.innerHTML = `
  <img src="${meals[0].strMealThumb}"/>
  <h3>${meals[0].strMeal}</h3>
  <p>${meals[0].strInstructions}</p>
  <a href="${meals[0].strMealThumb}">more</a>
  `;
};

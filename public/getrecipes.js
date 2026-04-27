let allRecipes = [];

async function fetchRecipes() {
    try {
        const response = await fetch('/api');
        allRecipes = await response.json();
        displayRecipes(allRecipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const recipesList = document.getElementById('recipes');
    recipesList.innerHTML = '';
    recipes.forEach(recipe => {
        const li = document.createElement('li');
        li.className = 'bg-white mb-2 p-4 rounded shadow-md flex justify-between items-center';
        li.innerHTML = `
            <div>
                <h3 class="m-0 mb-2">${recipe.food}</h3>
                <p class="m-1"><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            </div>
            <button onclick="deleteRecipe(${recipe.id})" class="bg-red-500 text-white p-2 rounded">Delete</button>
        `;
        recipesList.appendChild(li);
    });
}

function filterRecipes() {
    const query = document.getElementById('search').value.toLowerCase();
    const filtered = allRecipes.filter(recipe =>
        recipe.food.toLowerCase().includes(query) ||
        recipe.ingredients.toLowerCase().includes(query)
    );
    displayRecipes(filtered);
}

async function saveRecipe(event) {
    event.preventDefault();
    const food = document.getElementById('food').value;
    const ingredients = document.getElementById('ingredients').value;
    try {
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-vault-key': '12345'
            },
            body: JSON.stringify({ food, ingredients })
        });
        if (response.ok) {
            document.getElementById('food').value = '';
            document.getElementById('ingredients').value = '';
            fetchRecipes();
        } else {
            alert('Error saving recipe');
        }
    } catch (error) {
        console.error('Error saving recipe:', error);
        alert('Error saving recipe');
    }
}

async function deleteRecipe(id) {
    try {
        const response = await fetch(`/api/${id}`, {
            method: 'DELETE',
            headers: {
                'x-vault-key': '12345'
            }
        });
        if (response.ok) {
            fetchRecipes();
        } else {
            alert('Error deleting recipe');
        }
    } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Error deleting recipe');
    }
}

document.getElementById('addRecipeForm').addEventListener('submit', saveRecipe);

window.onload = fetchRecipes;
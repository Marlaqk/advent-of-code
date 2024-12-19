import { getInput } from "../utils";

let input = getInput();

let allergens = {};
let allIngredients = [];
input.forEach(line => {
  const [ingredients, allergensIn] = line.split(' (contains ');
  const allergenList = allergensIn.slice(0, -1).split(', ');
  const ingredientList = ingredients.split(' ');
  allIngredients = [...allIngredients, ...ingredientList];
  allergenList.forEach((allergen) => {
    if (allergens[allergen]) {
      allergens[allergen] = ingredientList.filter((ingredient) => allergens[allergen].includes(ingredient));
    } else {
      allergens[allergen] = ingredientList;
    }
  });
})

let uniqueAllergens = {};
while (Object.keys(allergens).length > 0) {
  const values = Object.keys(allergens).filter(
    (r) => allergens[r].length === 1
  );

  values.forEach((x) => {
    const newValue = allergens[x][0];
    uniqueAllergens[x] = newValue;
    delete allergens[x];
    Object.keys(allergens).forEach((key) => {
      allergens[key] = allergens[key].filter((t) => t !== newValue);
    });
  });
}

const nonAllergenIngredients = allIngredients.filter(
  (ingredient) => !Object.values(uniqueAllergens).includes(ingredient)
);

console.log(nonAllergenIngredients.length);
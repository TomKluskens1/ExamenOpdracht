import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create a single user
  const user = await prisma.user.create({
    data: {
      username: "chef_master",
      email: "chefmaster@example.com",
      password: "securepassword",
      profile_image: "https://example.com/chef.jpg",
      bio: "Master chef with a passion for diverse cuisines.",
      recipes: {
        create: [
          {
            title: "Spaghetti Bolognese",
            description: "A classic Italian pasta dish with rich meat sauce.",
            ingredients: JSON.stringify([
              { ingredient: "Spaghetti", amount: "200g" },
              { ingredient: "Ground Beef", amount: "150g" },
              { ingredient: "Tomato Sauce", amount: "1 cup" },
            ]),
            instructions: "1. Cook spaghetti. 2. Add sauce. 3. Serve.",
            image_url: "https://example.com/spaghetti.jpg",
          },
          {
            title: "Chicken Alfredo",
            description: "Creamy pasta with grilled chicken and Alfredo sauce.",
            ingredients: JSON.stringify([
              { ingredient: "Pasta", amount: "200g" },
              { ingredient: "Chicken Breast", amount: "150g" },
              { ingredient: "Alfredo Sauce", amount: "1 cup" },
            ]),
            instructions: "1. Grill chicken. 2. Mix with pasta and sauce. 3. Serve.",
            image_url: "https://example.com/chickenalfredo.jpg",
          },
          {
            title: "Tacos",
            description: "Mexican tacos with beef, cheese, and vegetables.",
            ingredients: JSON.stringify([
              { ingredient: "Tortillas", amount: "4" },
              { ingredient: "Ground Beef", amount: "150g" },
              { ingredient: "Cheese", amount: "50g" },
            ]),
            instructions: "1. Cook beef. 2. Assemble tacos. 3. Serve with toppings.",
            image_url: "https://example.com/tacos.jpg",
          },
          {
            title: "Caesar Salad",
            description: "Fresh salad with Caesar dressing and croutons.",
            ingredients: JSON.stringify([
              { ingredient: "Lettuce", amount: "1 cup" },
              { ingredient: "Croutons", amount: "50g" },
              { ingredient: "Caesar Dressing", amount: "1/4 cup" },
            ]),
            instructions: "1. Toss ingredients. 2. Add dressing. 3. Serve chilled.",
            image_url: "https://example.com/caesarsalad.jpg",
          },
          {
            title: "Sushi Rolls",
            description: "Japanese sushi rolls with rice and seafood.",
            ingredients: JSON.stringify([
              { ingredient: "Sushi Rice", amount: "1 cup" },
              { ingredient: "Nori", amount: "2 sheets" },
              { ingredient: "Salmon", amount: "100g" },
            ]),
            instructions: "1. Prepare rice. 2. Roll with ingredients. 3. Slice and serve.",
            image_url: "https://example.com/sushi.jpg",
          },
          {
            title: "Burger",
            description: "Classic cheeseburger with lettuce, tomato, and pickles.",
            ingredients: JSON.stringify([
              { ingredient: "Beef Patty", amount: "150g" },
              { ingredient: "Cheese", amount: "1 slice" },
              { ingredient: "Lettuce", amount: "1 leaf" },
            ]),
            instructions: "1. Grill patty. 2. Assemble burger. 3. Serve with fries.",
            image_url: "https://example.com/burger.jpg",
          },
          {
            title: "Pancakes",
            description: "Fluffy pancakes served with syrup.",
            ingredients: JSON.stringify([
              { ingredient: "Flour", amount: "1 cup" },
              { ingredient: "Milk", amount: "1 cup" },
              { ingredient: "Eggs", amount: "2" },
            ]),
            instructions: "1. Mix ingredients. 2. Cook on griddle. 3. Serve with syrup.",
            image_url: "https://example.com/pancakes.jpg",
          },
          {
            title: "Lasagna",
            description: "Layered pasta with beef, cheese, and tomato sauce.",
            ingredients: JSON.stringify([
              { ingredient: "Lasagna Noodles", amount: "8" },
              { ingredient: "Ground Beef", amount: "200g" },
              { ingredient: "Tomato Sauce", amount: "1 cup" },
            ]),
            instructions: "1. Layer ingredients. 2. Bake. 3. Serve warm.",
            image_url: "https://example.com/lasagna.jpg",
          },
          {
            title: "Chili",
            description: "Spicy chili with beans and beef.",
            ingredients: JSON.stringify([
              { ingredient: "Ground Beef", amount: "200g" },
              { ingredient: "Beans", amount: "1 cup" },
              { ingredient: "Chili Powder", amount: "2 tbsp" },
            ]),
            instructions: "1. Cook beef. 2. Add beans and spices. 3. Simmer and serve.",
            image_url: "https://example.com/chili.jpg",
          },
          {
            title: "Chocolate Cake",
            description: "Rich and moist chocolate cake.",
            ingredients: JSON.stringify([
              { ingredient: "Flour", amount: "2 cups" },
              { ingredient: "Cocoa Powder", amount: "1/2 cup" },
              { ingredient: "Sugar", amount: "1 cup" },
            ]),
            instructions: "1. Mix ingredients. 2. Bake. 3. Frost and serve.",
            image_url: "https://example.com/chocolatecake.jpg",
          },
          {
            title: "Smoothie",
            description: "Refreshing fruit smoothie.",
            ingredients: JSON.stringify([
              { ingredient: "Banana", amount: "1" },
              { ingredient: "Berries", amount: "1 cup" },
              { ingredient: "Yogurt", amount: "1/2 cup" },
            ]),
            instructions: "1. Blend ingredients. 2. Serve chilled.",
            image_url: "https://example.com/smoothie.jpg",
          },
          {
            title: "Pizza Margherita",
            description: "Classic Italian pizza with tomato, mozzarella, and basil.",
            ingredients: JSON.stringify([
              { ingredient: "Pizza Dough", amount: "1" },
              { ingredient: "Tomato Sauce", amount: "1/2 cup" },
              { ingredient: "Mozzarella", amount: "100g" },
            ]),
            instructions: "1. Spread sauce. 2. Add toppings. 3. Bake and serve.",
            image_url: "https://example.com/pizza.jpg",
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

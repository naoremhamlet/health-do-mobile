import { image } from "../constants";
//mimic database
const products = [
    {
        id: "1",
        name: "Avocado Quinoa Power Bowl",
        description: "A nutrient-dense powerhouse featuring fresh Hass avocados, organic tri-color quinoa, roasted sweet potatoes, and organic kale tossed in our house citrus vinaigrette.",
        image: image.salad1,
        category: "Salads",
        price: 299.00,
        originalPrice: 349.00,
        currency: "₹",
        dietaryType: "non-veg",
        tags: ["Non-Veg", "High Protein", "Gluten-Free"],
        rating: 4.8,
        reviewCount: 124,
        preparationTime: "12-15 mins",
        isAvailable: true,
        macros: { calories: 480, protein: "14g", carbs: "52g", fat: "22g" },
        ingredients: ["Avocado", "Quinoa", "Sweet Potato", "Kale", "Citrus Dressing"]
    },
    {
        id: "2",
        name: "Mediterranean Chickpea Salad",
        description: "Crisp cucumbers, juicy cherry tomatoes, kalamata olives, and protein-rich chickpeas tossed with extra virgin olive oil and topped with premium crumbled feta cheese.",
        image: image.salad2,
        category: "Salads",
        price: 249.00,
        originalPrice: 279.00,
        currency: "₹",
        dietaryType: "veg",
        tags: ["Low Carb", "Gluten-Free"],
        rating: 4.6,
        reviewCount: 98,
        preparationTime: "10-12 mins",
        isAvailable: true,
        macros: { calories: 360, protein: "12g", carbs: "28g", fat: "18g" },
        ingredients: ["Chickpeas", "Cucumber", "Feta Cheese", "Olives", "Olive Oil"]
    },
    {
        id: "3",
        name: "Smoked Tofu Crunch Bowl",
        description: "Marinated tofu cubes paired with crunchy red cabbage, shredded carrots, edamame beans, and fresh spinach, served with a signature spicy peanut dressing.",
        image: image.salad3,
        category: "Salads",
        price: 269.00,
        currency: "₹",
        dietaryType: "non-veg",
        tags: ["Non-Veg","High Protein"],
        rating: 4.7,
        reviewCount: 84,
        preparationTime: "15 mins",
        isAvailable: true,
        macros: { calories: 410, protein: "18g", carbs: "32g", fat: "14g" },
        ingredients: ["Smoked Tofu", "Edamame", "Spinach", "Red Cabbage", "Peanut Dressing"]
    },
    {
        id: "4",
        name: "Zesty Pesto Pasta Greens",
        description: "Whole-wheat penne pasta mixed with fresh arugula, broccoli florets, and toasted pine nuts, dressed thoroughly in dynamic house-made basil pesto.",
        image: image.salad4,
        category: "Salads",
        price: 289.00,
        originalPrice: 329.00,
        currency: "₹",
        dietaryType: "veg",
        tags: ["High Fiber"],
        rating: 4.5,
        reviewCount: 112,
        preparationTime: "15-18 mins",
        isAvailable: true,
        macros: { calories: 520, protein: "15g", carbs: "64g", fat: "19g" },
        ingredients: ["Whole-Wheat Pasta", "Broccoli", "Arugula", "Basil Pesto", "Pine Nuts"]
    },
    {
        id: "5",
        name: "Summer Berry Walnut Mix",
        description: "A refreshing sweet and savory blend of mixed baby salad greens, fresh sliced strawberries, wild blueberries, and crunchy glazed walnuts with dynamic balsamic glaze.",
        image: image.salad5,
        category: "Salads",
        price: 319.00,
        currency: "₹",
        dietaryType: "veg",
        tags: ["Vegan", "Antioxidant Rich"],
        rating: 4.9,
        reviewCount: 63,
        preparationTime: "10 mins",
        isAvailable: true,
        macros: { calories: 310, protein: "8g", carbs: "42g", fat: "12g" },
        ingredients: ["Strawberries", "Blueberries", "Walnuts", "Mixed Greens", "Balsamic Glaze"]
    },
    {
        id: "6",
        name: "Tropical Glow Fruit Platter",
        description: "An antioxidant-heavy assortment of freshly sliced premium Alphonso mangoes, sweet papaya, golden pineapple, and kiwi cubes, sprinkled with optional black salt.",
        image: image.fruit1,
        category: "Fruits",
        price: 189.00,
        originalPrice: 219.00,
        currency: "₹",
        dietaryType: "veg",
        tags: ["Vegan", "Gluten-Free", "Detox"],
        rating: 4.8,
        reviewCount: 215,
        preparationTime: "8 mins",
        isAvailable: true,
        macros: { calories: 180, protein: "3g", carbs: "44g", fat: "0.5g" },
        ingredients: ["Mango", "Papaya", "Pineapple", "Kiwi"]
    },
    {
        id: "7",
        name: "High-Fiber Berry Hydration Pack",
        description: "A refreshing bowl consisting of sliced ruby red apples, sweet pomegranate seeds, raspberries, and dark grapes to keep your hydration levels optimal all afternoon.",
        image: image.fruit2,
        category: "Fruits",
        price: 199.00,
        currency: "₹",
        dietaryType: "veg",
        tags: ["Vegan", "High Fiber"],
        rating: 4.7,
        reviewCount: 142,
        preparationTime: "8 mins",
        isAvailable: true,
        macros: { calories: 210, protein: "2.5g", carbs: "49g", fat: "0g" },
        ingredients: ["Red Apple", "Pomegranate", "Raspberries", "Dark Grapes"]
    },
    {
        id: "8",
        name: "Cold-Pressed Green Cleanse",
        description: "Pure, cold-pressed elixir crafted with organic celery, crisp green apples, refreshing cucumber, fresh mint leaves, and a sharp squeeze of fresh lime juice.",
        image: image.drink1,
        category: "Drinks",
        price: 149.00,
        originalPrice: 179.00,
        currency: "₹",
        dietaryType: "veg",
        tags: ["Vegan", "No Added Sugar", "Keto Friendly"],
        rating: 4.6,
        reviewCount: 187,
        preparationTime: "5 mins",
        isAvailable: true,
        macros: { calories: 85, protein: "2g", carbs: "18g", fat: "0g" },
        ingredients: ["Celery", "Green Apple", "Cucumber", "Mint", "Lime"]
    }
]


let myProducts = JSON.parse(JSON.stringify(products))


function getProducts() {
    return myProducts;
}

function sortProducts(type) {
    console.log(type)
    if(type === "Price: Low to High")
        myProducts.sort((a,b) => a.price - b.price);
    if(type === "Price: High to Low")
        myProducts.sort((a,b) => b.price - a.price);
    if(type === "Popular")
        myProducts.sort((a,b) => b.rating - a.rating);
    if(type === "Newest")
        myProducts.sort((a,b) => a.id - b.id);
}

function filterProducts(value) {
    let filterVal = [];

    if(value?.length) {
        value.map(e => {
            filterVal = [...filterVal, ...products.filter(p => p.tags?.includes(e) || p.dietaryType === e)]
        })
    } else {
        filterVal = products;
    }
    
    myProducts = JSON.parse(JSON.stringify(filterVal));
}

function searchProducts(value) {

}

export
{
    getProducts,
    sortProducts,
    filterProducts
};
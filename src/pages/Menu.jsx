import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const foods = [
  {
    id: 1,
    name: "Burger",
    category: "Burger",
    price: 3500,
    image: "/images/burger.jpg",
  },
  {
    id: 2,
    name: "Pizza",
    category: "Pizza",
    price: 5000,
    image: "/images/pizza.jpeg",
  },
  {
    id: 3,
    name: "Fried Chicken",
    category: "Chicken",
    price: 4500,
    image: "/images/chicken.jpeg",
  },
  {
    id: 4,
    name: "Jollof Rice",
    category: "Rice",
    price: 4000,
    image: "/images/jollof.jpg",
  },
  {
    id: 5,
    name: "Shawarma",
    category: "Fast Food",
    price: 3000,
    image: "/images/shawarma.jpeg",
  },
  {
    id: 6,
    name: "Drinks",
    category: "Drinks",
    price: 2000,
    image: "/images/drink.jpeg",
  },
  {
    id: 7,
    name: "Spaghetti",
    category: "Pasta",
    price: 4000,
    image: "/images/spaghetti.jpeg",
  },
  {
    id: 8,
    name: "Ice Cream",
    category: "Dessert",
    price: 1500,
    image: "/images/icecream.jpg",
  },
  {
    id: 9,
    name: "Pepper Soup",
    category: "Soup",
    price: 5200,
    image: "/images/peppersoup.jpg",
  },
  {
    id: 10,
    name: "Yam Porridge",
    category: "Local Meals",
    price: 4500,
    image: "/images/yam.jpg",
  },
  {
    id: 11,
    name: "Rice Chicken",
    category: "Rice",
    price: 3000,
    image: "/images/ricechicken.jpeg",
  },
  {
    id: 12,
    name: "Juice",
    category: "Drinks",
    price: 2000,
    image: "/images/juice.jpeg",
  },
  {
    id: 13,
    name: "Indomie and Egg",
    category: "Pasta",
    price: 4500,
    image: "/images/indomie.jpeg",
  },
  {
    id: 14,
    name: "Arabian Tea",
    category: "Drinks",
    price: 2500,
    image: "/images/arabiantea.jpeg",
  },
  {
    id: 15,
    name: "Plantain Chips",
    category: "Snacks",
    price: 3000,
    image: "/images/plantainchips.jpeg",
  },
  {
    id: 16,
    name: "Roasted Fish",
    category: "Grill",
    price: 6500,
    image: "/images/roastedfish.jpg",
  },
  {
    id: 17,
    name: "Meat Suya",
    category: "Grill",
    price: 1500,
    image: "/images/Suya.jpg",
  },
  {
    id: 18,
    name: "Yogurt Juice",
    category: "Drinks",
    price: 1500,
    image: "/images/yogurt.jpg",
  },
  {
    id: 19,
    name: "Popcorn",
    category: "Snacks",
    price: 1200,
    image: "/images/popcorn.png",
  },
  {
    id: 20,
    name: "Fried Yam",
    category: "Local Meals",
    price: 2500,
    image: "/images/friedyam.jpeg",
  },
];

const categories = [
  { name: "All", icon: "🍽️" },
  { name: "Burger", icon: "🍔" },
  { name: "Pizza", icon: "🍕" },
  { name: "Chicken", icon: "🍗" },
  { name: "Rice", icon: "🍚" },
  { name: "Fast Food", icon: "🌯" },
  { name: "Drinks", icon: "🥤" },
  { name: "Pasta", icon: "🍝" },
  { name: "Dessert", icon: "🍨" },
  { name: "Soup", icon: "🍲" },
  { name: "Local Meals", icon: "🍛" },
  { name: "Grill", icon: "🔥" },
  { name: "Snacks", icon: "🍿" },
];

const Menu = ({ cart, setCart }) => {
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get("table");

  useEffect(() => {
    if (tableNumber) {
      localStorage.setItem("tableNumber", tableNumber);
    }
  }, [tableNumber]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedId, setAddedId] = useState(null);

  const [selectedFood, setSelectedFood] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openFood = (food) => {
    setSelectedFood(food);
    setShowModal(true);
  }

  const addToCart = (food) => {

    const existingItem = cart.find((item) => item.id === food.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }

    setAddedId(food.id);

    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full px-6 md:px-10 lg:px-16 py-8">

      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Our Menu
      </h1>

      <input
        type="text"
        placeholder="Search for food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 mb-8 outline-none focus:ring-2 focus:ring-red-600"
      />

      <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`flex flex-col items-center justify-center min-w-[90px] px-4 py-3 rounded-2xl transition ${selectedCategory === category.name
              ? "bg-red-600 text-white shadow-xl"
              : "bg-white shadow-md hover:shadow-xl"
              }`}
          >
            <span className="text-3xl">{category.icon}</span>

            <span className="text-sm font-semibold mt-2">
              {category.name}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <div
              key={food.id}
              onClick={() => openFood(food)}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">

                <span className="inline-block bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  {food.category}
                </span>

                <h2 className="text-2xl font-bold mb-2">
                  {food.name}
                </h2>

                <p className="text-2xl font-bold text-green-600 mb-4">
                  ₦{food.price.toLocaleString()}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(food);
                  }}
                  className={`w-full py-3 rounded-lg text-white font-bold transition ${addedId === food.id
                    ? "bg-green-600"
                    : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                  {addedId === food.id
                    ? "✔ Added"
                    : "Add to Cart"}
                </button>

              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <h2 className="text-3xl font-bold text-gray-400">
              😔 No food found
            </h2>

            <p className="text-gray-500 mt-3">
              Try searching for another meal or select a different category.
            </p>
          </div>
        )}
      </div>
      {showModal && selectedFood && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >

          <div
            className="bg-white rounded-3xl overflow-hidden max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={selectedFood.image}
              alt={selectedFood.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">

              <h2 className="text-3xl font-bold">
                {selectedFood.name}
              </h2>

              <p className="text-gray-500 mt-2">
                Freshly prepared by our experienced chefs using premium ingredients.
              </p>

              <div className="flex justify-between mt-5">

                <span className="text-green-600 text-2xl font-bold">
                  ₦{selectedFood.price.toLocaleString()}
                </span>

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                  {selectedFood.category}
                </span>

              </div>

              <div className="mt-5 text-yellow-500 text-xl">
                ⭐⭐⭐⭐⭐
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(selectedFood);
                }}
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold"
              >
                Add to Cart
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-3 border border-gray-300 py-3 rounded-lg"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Menu;
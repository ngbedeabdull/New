import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const FoodManagement = () => {
  const [foods, setFoods] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newFood, setNewFood] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    ingredients: [],
  });

  useEffect(() => {
    fetchFoods();
    fetchInventory();
  }, []);

  const fetchFoods = async () => {
    try {
      const snapshot = await getDocs(collection(db, "foods"));

      const foodList = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setFoods(foodList);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const fetchInventory = async () => {
    try {
      const snapshot = await getDocs(collection(db, "inventory"));

      const inventoryList = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setInventory(inventoryList);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    setNewFood({
      ...newFood,
      [e.target.name]: e.target.value,
    });
  };

  const addIngredient = () => {
    setNewFood({
      ...newFood,
      ingredients: [
        ...newFood.ingredients,
        {
          item: "",
          quantity: "",
        },
      ],
    });
  };

  const updateIngredient = (index, field, value) => {
    const updated = [...newFood.ingredients];

    updated[index][field] = value;

    setNewFood({
      ...newFood,
      ingredients: updated,
    });
  };

  const removeIngredient = (index) => {
    const updated = [...newFood.ingredients];

    updated.splice(index, 1);

    setNewFood({
      ...newFood,
      ingredients: updated,
    });
  };

  const editFood = (food) => {
    setNewFood({
      name: food.name,
      category: food.category,
      price: food.price,
      image: food.image,
      ingredients: food.ingredients || [],
    });

    setEditingId(food.id);
    setShowForm(true);
  };

  const addFood = async (e) => {
    e.preventDefault();

    if (
      !newFood.name ||
      !newFood.category ||
      !newFood.price ||
      !newFood.image
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const foodData = {
        name: newFood.name,
        category: newFood.category,
        price: Number(newFood.price),
        image: newFood.image,
        ingredients: newFood.ingredients.map((ingredient) => ({
          item: ingredient.item,
          quantity: Number(ingredient.quantity),
        })),
      };

      if (editingId) {
        await updateDoc(doc(db, "foods", editingId), foodData);
        alert("Food updated successfully!");
      } else {
        await addDoc(collection(db, "foods"), foodData);
        alert("Food added successfully!");
      }

      setNewFood({
        name: "",
        category: "",
        price: "",
        image: "",
        ingredients: [],
      });

      setEditingId(null);
      setShowForm(false);

      fetchFoods();

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const deleteFood = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "foods", id));

      alert("Food deleted successfully!");

      fetchFoods();

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (

    <section className="min-h-screen bg-gray-100 p-10">

  <div className="flex justify-between items-center mb-8">

    <h1 className="text-4xl font-bold">
      🍔 Food Management
    </h1>

    <button
      onClick={() => {
        setShowForm(!showForm);

        if (!showForm) {
          setEditingId(null);

          setNewFood({
            name: "",
            category: "",
            price: "",
            image: "",
            ingredients: [],
          });
        }
      }}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold"
    >
      {showForm ? "Close Form" : "+ Add Food"}
    </button>

  </div>

  {showForm && (

    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">

      <h2 className="text-2xl font-bold mb-6 text-center">

        {editingId
          ? "Edit Food"
          : "Add New Food"}

      </h2>

      <form
        onSubmit={addFood}
        className="grid md:grid-cols-2 gap-5"
      >

        {/* Food Name */}

        <select
          name="name"
          value={newFood.name}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3"
        >

          <option value="">
            Select Food
          </option>

          <option value="Burger">Burger</option>
          <option value="Pizza">Pizza</option>
          <option value="Fried Chicken">Fried Chicken</option>
          <option value="Jollof Rice">Jollof Rice</option>
          <option value="Shawarma">Shawarma</option>
          <option value="Drinks">Drinks</option>
          <option value="Spaghetti">Spaghetti</option>
          <option value="Ice Cream">Ice Cream</option>
          <option value="Pepper Soup">Pepper Soup</option>
          <option value="Yam Porridge">Yam Porridge</option>
          <option value="Rice Chicken">Rice Chicken</option>
          <option value="Juice">Juice</option>
          <option value="Indomie and Egg">Indomie and Egg</option>
          <option value="Arabian Tea">Arabian Tea</option>
          <option value="Plantain Chips">Plantain Chips</option>
          <option value="Roasted Fish">Roasted Fish</option>
          <option value="Meat Suya">Meat Suya</option>
          <option value="Yogurt Juice">Yogurt Juice</option>
          <option value="Popcorn">Popcorn</option>
          <option value="Fried Yam">Fried Yam</option>

        </select>

        {/* Category */}

        <select
          name="category"
          value={newFood.category}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3"
        >

          <option value="">
            Select Category
          </option>

          <option value="Burger">Burger</option>
          <option value="Pizza">Pizza</option>
          <option value="Chicken">Chicken</option>
          <option value="Rice">Rice</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Drinks">Drinks</option>
          <option value="Pasta">Pasta</option>
          <option value="Dessert">Dessert</option>
          <option value="Soup">Soup</option>
          <option value="Local Meals">Local Meals</option>
          <option value="Grill">Grill</option>
          <option value="Snacks">Snacks</option>

        </select>

        {/* Price */}

        <select
          name="price"
          value={newFood.price}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3"
        >

          <option value="">
            Select Price
          </option>

          <option value="1200">₦1,200</option>
          <option value="1500">₦1,500</option>
          <option value="2000">₦2,000</option>
          <option value="2500">₦2,500</option>
          <option value="3000">₦3,000</option>
          <option value="3500">₦3,500</option>
          <option value="4000">₦4,000</option>
          <option value="4500">₦4,500</option>
          <option value="5000">₦5,000</option>
          <option value="5200">₦5,200</option>
          <option value="6500">₦6,500</option>

        </select>

        {/* Image */}

        <select
          name="image"
          value={newFood.image}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3"
        >

          <option value="">Select Image</option>

          <option value="/images/burger.jpg">Burger</option>
          <option value="/images/pizza.jpeg">Pizza</option>
          <option value="/images/chicken.jpeg">Fried Chicken</option>
          <option value="/images/jollof.jpg">Jollof Rice</option>
          <option value="/images/shawarma.jpeg">Shawarma</option>
          <option value="/images/drink.jpeg">Drinks</option>
          <option value="/images/spaghetti.jpeg">Spaghetti</option>
          <option value="/images/icecream.jpg">Ice Cream</option>
          <option value="/images/peppersoup.jpg">Pepper Soup</option>
          <option value="/images/yam.jpg">Yam Porridge</option>
          <option value="/images/ricechicken.jpeg">Rice Chicken</option>
          <option value="/images/juice.jpeg">Juice</option>
          <option value="/images/indomie.jpeg">Indomie and Egg</option>
          <option value="/images/arabiantea.jpeg">Arabian Tea</option>
          <option value="/images/plantainchips.jpeg">Plantain Chips</option>
          <option value="/images/roastedfish.jpg">Roasted Fish</option>
          <option value="/images/Suya.jpg">Meat Suya</option>
          <option value="/images/yogurt.jpg">Yogurt Juice</option>
          <option value="/images/popcorn.png">Popcorn</option>
          <option value="/images/friedyam.jpeg">Fried Yam</option>

        </select>

        {/* Ingredients */}

        <div className="md:col-span-2 mt-8">

          <h3 className="text-2xl font-bold mb-4">
            🥘 Ingredients
          </h3>

          {newFood.ingredients.map((ingredient, index) => (

            <div
              key={index}
              className="grid grid-cols-3 gap-3 mb-3"
            >

              <select
                value={ingredient.item}
                onChange={(e) =>
                  updateIngredient(
                    index,
                    "item",
                    e.target.value
                  )
                }
                className="border rounded-lg px-3 py-2"
              >

                <option value="">
                  Select Ingredient
                </option>

                {inventory.map((item) => (

                  <option
                    key={item.id}
                    value={item.name}
                  >
                    {item.name}
                  </option>

                ))}

              </select>

              <input
                type="number"
                min="1"
                placeholder="Quantity Used"
                value={ingredient.quantity}
                onChange={(e) =>
                  updateIngredient(
                    index,
                    "quantity",
                    e.target.value
                  )
                }
                className="border rounded-lg px-3 py-2"
              />

              <button
                type="button"
                onClick={() =>
                  removeIngredient(index)
                }
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Remove
              </button>

            </div>

          ))}

          <button
            type="button"
            onClick={addIngredient}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg mt-3"
          >
            + Add Ingredient
          </button>

        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg"
        >
          {editingId ? "Update Food" : "Save Food"}
        </button>

      </form>

    </div>

  )}

  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-red-600 text-white">

            <tr>

              <th className="p-4">Image</th>

              <th className="p-4 text-left">
                Food
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Ingredients
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {foods.length > 0 ? (

              foods.map((food) => (

                <tr
                  key={food.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">

                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-16 h-16 object-cover rounded-lg shadow"
                    />

                  </td>

                  <td className="p-4 font-semibold">
                    {food.name}
                  </td>

                  <td className="p-4">
                    {food.category}
                  </td>

                  <td className="p-4 text-green-600 font-bold">
                    ₦{Number(food.price).toLocaleString()}
                  </td>

                  <td className="p-4">

                    {food.ingredients &&
                    food.ingredients.length > 0 ? (

                      <ul className="list-disc list-inside">

                        {food.ingredients.map(
                          (ingredient, index) => (

                            <li key={index}>

                              {ingredient.item}
                              {" - "}
                              {ingredient.quantity}

                            </li>

                          )
                        )}

                      </ul>

                    ) : (

                      <span className="text-gray-500">
                        No Ingredients
                      </span>

                    )}

                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => editFood(food)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteFood(food.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-12 text-gray-500 text-lg"
                >

                  🍽️ No food has been added yet.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default FoodManagement;
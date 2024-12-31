import { useState } from "react";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if image is selected and form is filled
    if (
      !image ||
      !product.name ||
      !product.category ||
      !product.price ||
      !product.quantity ||
      !product.description
    ) {
      setErrorMessage(
        "All fields must be filled and an image must be selected."
      );
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("description", product.description);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/api/products/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setSuccessMessage("Product added successfully!");
        setProduct({
          name: "",
          category: "",
          price: "",
          quantity: "",
          description: "",
        });
        setImage(null);
        setImagePreview(null);
      } else {
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("Error: Unable to submit the form. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg w-[90%] md:w-[50%] p-8">
        <h1 className="text-4xl text-center font-bold text-gray-700 mb-6">
          Add Product
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4 w-full"
          />
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4 w-full"
          >
            <option value="">Select Category</option>
            <option value="fruit_veg">Fruit and Vegetable</option>
            <option value="grocery">Grocery</option>
            <option value="bakery">Bakery</option>
            <option value="personal_care">Personal Care</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="pet_care">Pet Care</option>
            <option value="baby_care">Baby Care</option>
          </select>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4 w-full"
          />
          <input
            type="text"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4 w-full"
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4 w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4 w-full"
          />
          {imagePreview && (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Selected Product"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

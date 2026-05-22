import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    desc: "",
    price: "",
    category: "",
    quantity: "",
    releaseDate: "",
    available: false,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`,
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAvailabilityChange = (e) => {
    setProduct({ ...product, available: e.target.checked });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (image) {
      formData.append("imageFile", image);
    }
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" }),
    );

    axios
      .put(`http://localhost:8080/api/product/${id}`, formData)
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        alert("Product updated successfully");
        navigate(`/product/${id}`);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Error updating product");
      });
  };

  if (loading) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        {error}
      </h2>
    );
  }

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          <h2 className="mb-4">Update Product</h2>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              onChange={handleInputChange}
              value={product.name}
              name="name"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Brand</h6>
            </label>
            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder="Enter your Brand"
              value={product.brand}
              onChange={handleInputChange}
              id="brand"
            />
          </div>

          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Add product description"
              value={product.desc}
              name="desc"
              onChange={handleInputChange}
              id="desc"
            />
          </div>

          <div className="col-5">
            <label className="form-label">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Eg: $1000"
              onChange={handleInputChange}
              value={product.price}
              name="price"
              id="price"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={product.category}
              onChange={handleInputChange}
              name="category"
              id="category"
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Stock Remaining"
              onChange={handleInputChange}
              value={product.quantity}
              name="quantity"
              id="quantity"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Release Date</h6>
            </label>
            <input
              type="date"
              className="form-control"
              value={product.releaseDate}
              name="releaseDate"
              onChange={handleInputChange}
              id="releaseDate"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
            />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="available"
                id="gridCheck"
                checked={product.available}
                onChange={handleAvailabilityChange}
              />
              <label className="form-check-label">Product Available</label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Update Product
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate(`/product/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;

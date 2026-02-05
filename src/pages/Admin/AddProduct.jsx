import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../Features/Products/ProductsThunk';
import { selectProductsLoading } from '../../Features/Products/ProductsSlice';
import Loader from '../../Components/Loader/Loader';

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectProductsLoading);

  const [product, setProduct] = useState({
    title: '',
    price: '',
    imageUrl: '',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    const result = await dispatch(addProduct(product));

    if (addProduct.fulfilled.match(result)) {
      setProduct({
        title: '',
        price: '',
        imageUrl: '',
        category: '',
        description: '',
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-800 px-10 py-10 rounded-xl">
          <div>
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Add Product
            </h1>
          </div>
          <div>
            <input
              type="text"
              value={product.title}
              onChange={handleChange}
              name="title"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product title"
            />
          </div>
          <div>
            <input
              type="text"
              value={product.price}
              onChange={handleChange}
              name="price"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product price"
            />
          </div>
          <div>
            <input
              type="text"
              value={product.imageUrl}
              onChange={handleChange}
              name="imageUrl"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product imageUrl"
            />
          </div>
          <div>
            <input
              type="text"
              value={product.category}
              onChange={handleChange}
              name="category"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product category"
            />
          </div>
          <div>
            <textarea
              cols="30"
              rows="10"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product description"
            ></textarea>
          </div>
          <div className="flex justify-center mb-3">
            <button
              onClick={handleAddProduct}
              disabled={loading}
              className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg hover:bg-yellow-600 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../../Components/Layout/Layout";
import Filter from "../../Components/Product/Filter";
import { useTheme } from "../../Context/ThemeContext";
import {
  selectPaginatedProducts,
  selectCurrentPage,
  selectTotalPages,
  selectTotalFilteredItems,
  setCurrentPage,
  selectFilteredProducts,
  selectProductsLoading,
} from "../../Features/Products/ProductsSlice";
import { addToCart } from "../../Features/Cart/CartSlice";
import Loader from "../../Components/Common/Loader";
import Pagination from "../../Components/Common/Pagination";
import { fetchProducts } from "../../Features/Products/ProductsThunk";
function AllProducts() {
  const { mode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const products = useSelector(selectFilteredProducts);
  // const loading = useSelector(selectProductsLoading);

  const products = useSelector(selectPaginatedProducts);
  const loading = useSelector(selectProductsLoading);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const totalItems = useSelector(selectTotalFilteredItems);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  const handleProductClick = (id) => {
    navigate(`/productinfo/${id}`);
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(fetchProducts());
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {loading && <Loader />}
      <Filter />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1
              className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded"></div>
             {totalItems > 0 && (
              <p
                className="mt-2 text-sm"
                style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}
              >
                Showing {products.length} of {totalItems} products
              </p>
            )}
          </div>

          <div className="flex flex-wrap -m-4">
            {products.length === 0 ? (
              <div className="w-full text-center py-10">
                <p
                  className="text-xl"
                  style={{ color: mode === "dark" ? "white" : "gray" }}
                >
                  No products found
                </p>
              </div>
            ) : (
              products.map((item) => {
                const { title, price, description, imageUrl, id } = item;
                return (
                  <div key={id} className="p-4 md:w-1/4 drop-shadow-lg">
                    <div
                      className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <div
                        className="flex justify-center cursor-pointer"
                        onClick={() => handleProductClick(id)}
                      >
                        <img
                          className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out"
                          src={imageUrl}
                          alt={title}
                        />
                      </div>
                      <div className="p-5 border-t-2">
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          EShop Store
                        </h2>
                        <h1
                          className="title-font text-lg font-medium text-gray-900 mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {title}
                        </h1>
                        <p
                          className="leading-relaxed mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          ₹{price}
                        </p>
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(item);
                            }}
                            className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </Layout>
  );
}

export default AllProducts;

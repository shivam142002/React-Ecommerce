import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Layout from '../../Components/Layout/Layout';
import Modal from '../../Components/Modal/Modal';
import { useTheme } from '../../Context/ThemeContext';
import {
  selectCartItems,
  selectCartTotalAmount,
  deleteFromCart,
  updateQuantity
} from '../../Features/Cart/CartSlice';
import { selectUser } from '../../Features/Auth/AuthSlice';
import { createOrder } from '../../Features/Orders/OrdersThunk';
import { clearCart } from '../../Features/Cart/CartSlice';
import { initiatePayment } from '../../Services/Payment';

function Cart() {
  const { mode } = useTheme();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const shipping = 100;
  const grandTotal = shipping + totalAmount;


  const handleIncrease = (item) => {
    dispatch(updateQuantity({
      id: item.id,
      quantity: (item.quantity || 1) + 1
    }));
  };

  const handleDecrease = (item) => {
    if ((item.quantity || 1) > 1) {
      dispatch(updateQuantity({
        id: item.id,
        quantity: item.quantity - 1
      }));
    }
  };

  const handleDeleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success('Item removed from cart');
  };

  const handleBuyNow = () => {
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error('All fields are required', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
    };

    const orderDetails = {
      grandTotal,
      name,
      addressInfo,
      cartItems,
      email: user?.user?.email || '',
      userid: user?.user?.uid || '',
    };

    initiatePayment(
      orderDetails,
      (orderInfo) => {
        // On payment success
        dispatch(createOrder(orderInfo)).then(() => {
          dispatch(clearCart());
          setName('');
          setAddress('');
          setPincode('');
          setPhoneNumber('');
        });
      },
      (error) => {
        // On payment failure
        console.error('Payment failed:', error);
      }
    );
  };

  return (
    <Layout>
      <div
        className="h-screen bg-gray-100 pt-5 mb-[60%]"
        style={{
          backgroundColor: mode === 'dark' ? '#282c34' : '',
          color: mode === 'dark' ? 'white' : '',
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Itemskk</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.length === 0 ? (
              <div className="text-center py-10">
                <p
                  className="text-xl"
                  style={{ color: mode === 'dark' ? 'white' : 'gray' }}
                >
                  Your cart is empty
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
                const { id, title, price, description, imageUrl } = item;
                return (
                  <div
                    key={id}
                    className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
                    style={{
                      backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '',
                      color: mode === 'dark' ? 'white' : '',
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2
                          className="text-lg font-bold text-gray-900"
                          style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                          {title}
                        </h2>
                        <h2
                          className="text-sm text-gray-900"
                          style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                          {description}
                        </h2>
                        <p
                          className="mt-1 text-xs font-semibold text-gray-700"
                          style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                          ₹{price}
                        </p>
                      </div>



                      <div className="mt-4 sm:mt-0 sm:block">
                        {/* Quantity controls */}
                        <div className="flex items-center mb-3">
                          <button
                            onClick={() => handleDecrease(item)}
                            className="px-3 py-1 border rounded-l text-lg font-bold"
                          >
                            −
                          </button>

                          <span className="px-4 py-1 border-t border-b">
                            {item.quantity || 1}
                          </span>

                          <button
                            onClick={() => handleIncrease(item)}
                            className="px-3 py-1 border rounded-r text-lg font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Delete button */}
                        {/* <div
    onClick={() => handleDeleteCart(item)}
    className="cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79"
      />
    </svg>
  </div> */}
                        {/* </div> */}


                        <div
                          onClick={() => handleDeleteCart(item)}
                          className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </div>





                    </div>
                  </div>
                );
              })
            )}
          </div>

          {cartItems.length > 0 && (
            <div
              className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
              style={{
                backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '',
                color: mode === 'dark' ? 'white' : '',
              }}
            >
              <div className="mb-2 flex justify-between">
                <p
                  className="text-gray-700"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  Subtotal
                </p>
                <p
                  className="text-gray-700"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  ₹{totalAmount}
                </p>
              </div>
              <div className="flex justify-between">
                <p
                  className="text-gray-700"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  Shipping
                </p>
                <p
                  className="text-gray-700"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  ₹{shipping}
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between mb-3">
                <p
                  className="text-lg font-bold"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  Total
                </p>
                <div>
                  <p
                    className="mb-1 text-lg font-bold"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    ₹{grandTotal}
                  </p>
                </div>
              </div>
              <Modal
                name={name}
                address={address}
                pincode={pincode}
                phoneNumber={phoneNumber}
                setName={setName}
                setAddress={setAddress}
                setPincode={setPincode}
                setPhoneNumber={setPhoneNumber}
                buyNow={handleBuyNow}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Cart;

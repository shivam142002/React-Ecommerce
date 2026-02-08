// import React, { useContext } from 'react'
// import myContext from '../../context/data/myContext'
// import Layout from '../../components/layout/Layout'
// import Loader from '../../components/loader/Loader'

// function Order() {
//   const userid = JSON.parse(localStorage.getItem('user')).user.uid
//   const context = useContext(myContext)
//   const { mode, loading, order } = context
//   return (
//     <Layout>
//       {loading && <Loader />}
//       {order.length > 0 ?
//         (<>
//           <div className=" h-full pt-10">
//             {
//               order.filter(obj => obj.userid == userid).map((order) => {
//                 // order.cartItems.map()
//                 return (
//                   <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
//                     {
//                       order.cartItems.map((item) => {
//                         return (
//                           <div className="rounded-lg md:w-2/3">
//                             <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
//                               <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
//                               <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//                                 <div className="mt-5 sm:mt-0">
//                                   <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
//                                   <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
//                                   <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.price}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       })
//                     }
//                   </div>
//                 )
//               })
//             }
//           </div>
//         </>)
//         :
//         (
//           <h2 className=' text-center tex-2xl text-white'>Not Order</h2>
//         )

//       }
//     </Layout>
//   )
// }

// export default Order








import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../Components/Layout/Layout';
import Loader from '../../Components/Common/Loader';
import { useTheme } from '../../Context/ThemeContext';
import { selectUser } from '../../Features/Auth/AuthSlice';
import {
  selectAllOrders,
  selectOrdersLoading,
} from '../../Features/Orders/OrdersSlice';
import { fetchOrders } from '../../Features/Orders/OrdersThunk';

function Order() {
  const { mode } = useTheme();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const orders = useSelector(selectAllOrders);
  const loading = useSelector(selectOrdersLoading);

  const userid = user?.user?.uid;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Filter orders for current user
  const userOrders = orders.filter((order) => order.userid === userid);

  return (
    <Layout>
      {loading && <Loader />}
      {userOrders.length > 0 ? (
        <div className="h-full pt-10 min-h-screen">
          <h1
            className="text-center text-3xl font-bold mb-10"
            style={{ color: mode === 'dark' ? 'white' : '' }}
          >
            Your Orders
          </h1>
          {userOrders.map((order, orderIndex) => (
            <div
              key={orderIndex}
              className="mb-10"
            >
              <div className="mx-auto max-w-5xl px-6">
                <div
                  className="mb-4 p-4 rounded-lg"
                  style={{
                    backgroundColor: mode === 'dark' ? '#282c34' : '#f3f4f6',
                    color: mode === 'dark' ? 'white' : '',
                  }}
                >
                  <p>
                    <strong>Order Date:</strong> {order.date}
                  </p>
                  <p>
                    <strong>Payment ID:</strong> {order.paymentId}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ₹{order.totalAmount || 'N/A'}
                  </p>
                  {order.addressInfo && (
                    <div className="mt-2">
                      <p>
                        <strong>Delivery Address:</strong>
                      </p>
                      <p>{order.addressInfo.name}</p>
                      <p>{order.addressInfo.address}</p>
                      <p>
                        {order.addressInfo.pincode} - {order.addressInfo.phoneNumber}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {order.cartItems.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="rounded-lg"
                    >
                      <div
                        className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                        style={{
                          backgroundColor: mode === 'dark' ? '#282c34' : '',
                          color: mode === 'dark' ? 'white' : '',
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full rounded-lg sm:w-40"
                        />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div className="mt-5 sm:mt-0">
                            <h2
                              className="text-lg font-bold text-gray-900"
                              style={{ color: mode === 'dark' ? 'white' : '' }}
                            >
                              {item.title}
                            </h2>
                            <p
                              className="mt-1 text-xs text-gray-700"
                              style={{ color: mode === 'dark' ? 'white' : '' }}
                            >
                              {item.description}
                            </p>
                            <p
                              className="mt-1 text-sm font-semibold text-gray-700"
                              style={{ color: mode === 'dark' ? 'white' : '' }}
                            >
                              ₹{item.price}
                            </p>
                            {item.quantity && (
                              <p
                                className="mt-1 text-xs text-gray-700"
                                style={{ color: mode === 'dark' ? 'white' : '' }}
                              >
                                Quantity: {item.quantity}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <h2
            className="text-center text-2xl"
            style={{ color: mode === 'dark' ? 'white' : '' }}
          >
            No Orders Yet
          </h2>
        </div>
      )}
    </Layout>
  );
}

export default Order;
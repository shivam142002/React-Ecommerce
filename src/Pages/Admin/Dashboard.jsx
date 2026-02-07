import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserTie } from 'react-icons/fa';
import Layout from '../../Components/Layout/Layout';
import DashboardTab from './DashboardTab';
import { useTheme } from '../../Context/ThemeContext';
import { selectAllProducts } from '../../Features/Products/ProductsSlice';
import { selectAllOrders } from '../../Features/Orders/OrdersSlice';
import { selectAllUsers } from '../../Features/Users/UsersSlice';
import { fetchProducts } from '../../Features/Products/ProductsThunk';
import { fetchOrders } from '../../Features/Orders/OrdersThunk';
import { fetchUsers } from '../../Features/Users/UsersThunk';

function Dashboard() {
  const { mode } = useTheme();
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const orders = useSelector(selectAllOrders);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Products',
      count: products.length,
      color: 'purple',
    },
    {
      title: 'Total Orders',
      count: orders.length,
      color: 'pink',
    },
    {
      title: 'Total Users',
      count: users.length,
      color: 'green',
    },
    {
      title: 'Total Revenue',
      count: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
      color: 'blue',
      prefix: '₹',
    },
  ];

  return (
    <Layout>
      <section className="text-gray-600 body-font mt-10 mb-10">
        <div className="container px-5 mx-auto mb-10">
          <div className="flex flex-wrap -m-4 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div
                  className={`border-2 hover:shadow-${stat.color}-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl`}
                  style={{
                    backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                    color: mode === 'dark' ? 'white' : '',
                  }}
                >
                  <div className={`text-${stat.color}-500 w-12 h-12 mb-3 inline-block`}>
                    <FaUserTie size={50} />
                  </div>
                  <h2
                    className="title-font font-medium text-3xl text-black fonts1"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    {stat.prefix}{stat.count}
                  </h2>
                  <p
                    className={`text-${stat.color}-500 font-bold`}
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    {stat.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DashboardTab />
      </section>
    </Layout>
  );
}

export default Dashboard;
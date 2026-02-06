import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from '../../Components/Layout/Layout';
import HeroSection from '../../Components/Hero/HeroSection';
import Filter from '../../Components/Product/Filter';
import ProductCard from '../../Components/Product/ProductCard';
import Track from '../../Components/Hero/Track';
import Testimonial from '../../Components/Hero/Testimonial';
import { fetchProducts } from '../../Features/Products/ProductsThunk';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard limit={8} />
      <div className="flex justify-center -mt-10 mb-4">
        <Link to="/allproducts">
          <button className="bg-gray-300 px-5 py-2 rounded-xl hover:bg-gray-400 transition-colors">
            See more
          </button>
        </Link>
      </div>
      <Track />
      <Testimonial />
    </Layout>
  );
}

export default Home;
// import React, { useContext } from 'react'
// import Layout from '../../components/layout/Layout'
// import myContext from '../../context/data/myContext'
// import HeroSection from '../../components/heroSection/HeroSection'
// import Filter from '../../components/filter/Filter'
// import ProductCard from '../../components/productCard/ProductCard'
// import Track from '../../components/track/Track'
// import Testimonial from '../../components/testimonial/Testimonial'
// import { Link } from 'react-router-dom'


// function Home() {
//   return (
//     <Layout>
//       <HeroSection />
//       <Filter />
//       <ProductCard />
//       <div className="flex justify-center -mt-10 mb-4">
//         <Link to={'/allproducts'}>
//           <button className=' bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
//         </Link>
//       </div>
//       <Track />
//       <Testimonial />
//     </Layout>
//   )
// }

// export default Home







import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from '../../Components/Layout/Layout';
import HeroSection from '../../components/hero/HeroSection';
import Filter from '../../components/product/Filter';
import ProductCard from '../../components/product/ProductCard';
import Track from '../../components/hero/Track';
import Testimonial from '../../components/hero/Testimonial';
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
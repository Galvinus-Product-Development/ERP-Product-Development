import CategorySection from "./components/CategorySection";
import RecommendedProducts from "./components/RecommendedProducts";
//import ElectronicsItems from './components/ElectronicsItems';
import Hero from "./components/Hero";

//import SmartGadgets from './components/SmartGadgets';
import FeaturedProducts from "./components/FeaturedProducts";
import Newsletter from "./components/Newsletter";
import SuggestedProducts from "./components/SuggestedProducts";
import TopDeals from "./components/TopDeals";

const HomePage = () => (
  <div>
    <Hero />
    <CategorySection />
    <TopDeals />
    <FeaturedProducts />
    <SuggestedProducts />
    <RecommendedProducts />
    <Newsletter />
  </div>
);

export default HomePage;

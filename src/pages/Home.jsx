import Hero from "../components/Hero";
import FeaturedMenu from "../components/FeaturedMenu";
import WhyChooseUs from "../components/WhyChooseUs";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import ReserveTable from "../components/ReserveTable";

const Home = ({ cart, setCart }) => {
  return (
    <div className="pt-24">
  <Hero />

  <div className="mt-20">
    <FeaturedMenu />
  </div>

  <div className="mt-20">
    <WhyChooseUs />
  </div>

  <div className="mt-20">
    <About />
  </div>

<div className="mt-20">
    <Testimonials />
  </div>

  <div className="mt-20">
    <ReserveTable />
  </div>

  <div className="mt-20">
    <Gallery />
  </div>

  <div className="mt-20">
    <Contact />
  </div>


  <div className="mt-20">
    <Footer />
  </div>
</div>
  );
};

export default Home;
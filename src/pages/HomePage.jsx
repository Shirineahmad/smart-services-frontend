import Header from "../components/homeComponent/Header";
import HeroCarousel from "../components/homeComponent/HeroCrousel";
import PaymentSection from "../components/homeComponent/paymentSection";
import SliderServices from "../components/homeComponent/SliderServices";
import Footer from "../components/homeComponent/Footer";
import SectionWeDo from "../components/homeComponent/SectionWeDo";
import SectionWhyShiro from "../components/homeComponent/SectionWhyShiro";
import SliderLogo from "../components/homeComponent/SliderLogo";
const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroCarousel />
      <PaymentSection />
      <SliderServices />
      <SectionWeDo />
      <SectionWhyShiro />
      <SliderLogo/>
      <Footer />
    </div>
  );
};

export default HomePage;

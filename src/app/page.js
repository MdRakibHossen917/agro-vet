import Image from "next/image";
import ProductsSection from "./components/ProductsSection";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import KnowledgeCenter from "./components/KnowledgeCenter";
import SpecialOffers from "./components/SpecialOffers";
import Partners from "./components/Partners";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ ";
import Footer from "@/components/Footer";

 

export default function Home() {
  return (
   <div>
    <HeroSection/>
    <ProductsSection/>
    <Services/>
    <KnowledgeCenter/>
    <SpecialOffers/>
    <FAQ/>
    <Partners/>
    <ContactUs/>
    <Footer/>
  
  
    
    </div>
  );
}

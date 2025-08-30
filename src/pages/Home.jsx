
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedListings from '../components/FeaturedListings';
import FeaturedDevelopments from '../components/FeaturedDevelopments';
import AboutSection from '../components/AboutSection';
import BenMossGroup from '../components/BenMossGroup';
import CTASection from '../components/CTASection';
import LifestyleProperties from '../components/LifestyleProperties';
import FeaturedNeighborhoods from '../components/FeaturedNeighborhoods';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import useScrollAnimation from '../hooks/useScrollAnimation';

function Home() {
  const [featuredListingsRef, featuredListingsVisible] = useScrollAnimation();
  const [featuredDevelopmentsRef, featuredDevelopmentsVisible] = useScrollAnimation();
  const [aboutSectionRef, aboutSectionVisible] = useScrollAnimation();
  const [benMossGroupRef, benMossGroupVisible] = useScrollAnimation();
  const [ctaSectionRef, ctaSectionVisible] = useScrollAnimation();
  const [lifestylePropertiesRef, lifestylePropertiesVisible] = useScrollAnimation();
  const [featuredNeighborhoodsRef, featuredNeighborhoodsVisible] = useScrollAnimation();
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation();

  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        
        <div 
          ref={featuredListingsRef}
          className={`fade-in-up delay-100 ${featuredListingsVisible ? 'animated' : ''}`}
        >
          <FeaturedListings />
        </div>
        
        <div 
          ref={featuredDevelopmentsRef}
          className={`fade-in-up delay-200 ${featuredDevelopmentsVisible ? 'animated' : ''}`}
        >
          <FeaturedDevelopments />
        </div>
        
        <div 
          ref={aboutSectionRef}
          className={`fade-in-left delay-300 ${aboutSectionVisible ? 'animated' : ''}`}
        >
          <AboutSection />
        </div>
        
        <div 
          ref={benMossGroupRef}
          className={`fade-in-right delay-200 ${benMossGroupVisible ? 'animated' : ''}`}
        >
          <BenMossGroup />
        </div>
        
        <div 
          ref={ctaSectionRef}
          className={`scale-in delay-400 ${ctaSectionVisible ? 'animated' : ''}`}
        >
          <CTASection />
        </div>
        
        <div 
          ref={lifestylePropertiesRef}
          className={`fade-in-up delay-300 ${lifestylePropertiesVisible ? 'animated' : ''}`}
        >
          <LifestyleProperties />
        </div>
        
        <div 
          ref={featuredNeighborhoodsRef}
          className={`animate-on-scroll ${featuredNeighborhoodsVisible ? 'fade-in-up delay-200' : ''}`}
        >
          <FeaturedNeighborhoods />
        </div>
        
        <div 
          ref={testimonialsRef}
          className={`animate-on-scroll ${testimonialsVisible ? 'fade-in delay-300' : ''}`}
        >
          <Testimonials />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;

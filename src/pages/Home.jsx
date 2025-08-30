
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
          className={`animate-on-scroll ${featuredListingsVisible ? 'fade-in-up' : ''}`}
        >
          <FeaturedListings />
        </div>
        
        <div 
          ref={featuredDevelopmentsRef}
          className={`animate-on-scroll ${featuredDevelopmentsVisible ? 'fade-in-up delay-100' : ''}`}
        >
          <FeaturedDevelopments />
        </div>
        
        <div 
          ref={aboutSectionRef}
          className={`animate-on-scroll ${aboutSectionVisible ? 'fade-in-left delay-200' : ''}`}
        >
          <AboutSection />
        </div>
        
        <div 
          ref={benMossGroupRef}
          className={`animate-on-scroll ${benMossGroupVisible ? 'fade-in-right delay-100' : ''}`}
        >
          <BenMossGroup />
        </div>
        
        <div 
          ref={ctaSectionRef}
          className={`animate-on-scroll ${ctaSectionVisible ? 'scale-in delay-200' : ''}`}
        >
          <CTASection />
        </div>
        
        <div 
          ref={lifestylePropertiesRef}
          className={`animate-on-scroll ${lifestylePropertiesVisible ? 'fade-in-up delay-100' : ''}`}
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
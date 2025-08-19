
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

function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <FeaturedListings />
        <FeaturedDevelopments />
        <AboutSection />
        <BenMossGroup />
        <CTASection />
        <LifestyleProperties />
        <FeaturedNeighborhoods />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default Home;

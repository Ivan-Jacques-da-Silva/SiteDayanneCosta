
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const Neighborhood = () => {
  const { neighborhoodSlug } = useParams();

  // Validate parameters
  if (!neighborhoodSlug) {
    return (
      <div>
        <Header />
        <div style={{ padding: '50px 20px', textAlign: 'center' }}>
          <h2>Neighborhood not found</h2>
          <p>Please select a valid neighborhood.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Configuration for each neighborhood
  const neighborhoodData = {
    'brickell': {
      title: "Brickell Real Estate",
      subtitle: "Miami's Financial District",
      description: "Discover luxury living in Brickell, Miami's prestigious financial district known for its stunning skyline and upscale lifestyle.",
      heroImage: "/src/assets/img/slide1.jpeg",
      sections: [
        {
          title: "Live in Brickell",
          subtitle: "Miami's Manhattan",
          content: "Brickell offers an urban lifestyle with luxury high-rise condos, fine dining, and proximity to downtown Miami. Experience city living at its finest."
        },
        {
          title: "Brickell Neighborhood Highlights",
          subtitle: "What Makes Brickell Special",
          features: [
            "Walking distance to financial district",
            "Brickell City Centre shopping and dining",
            "Mary Brickell Village entertainment",
            "Metromover and Metrorail access",
            "Biscayne Bay waterfront",
            "High-end restaurants and nightlife",
            "Luxury spa and wellness centers",
            "Cultural attractions nearby"
          ]
        }
      ]
    },
    'edgewater': {
      title: "Edgewater Real Estate",
      subtitle: "Bayfront Living",
      description: "Explore Edgewater's waterfront properties with stunning bay views and a perfect blend of urban convenience and natural beauty.",
      heroImage: "/src/assets/img/slide2.jpeg",
      sections: [
        {
          title: "Edgewater Living",
          subtitle: "Where Bay Meets City",
          content: "Edgewater offers magnificent bayfront living with easy access to downtown Miami, Design District, and Wynwood. Perfect for those seeking waterfront luxury."
        },
        {
          title: "Edgewater Amenities",
          subtitle: "Waterfront Lifestyle Benefits",
          features: [
            "Direct access to Biscayne Bay",
            "Margaret Pace Park waterfront recreation",
            "Close to Design District shopping",
            "Easy access to Miami Beach",
            "Bayside Marketplace nearby",
            "Marina and yacht club access",
            "Waterfront dining options",
            "Scenic jogging and biking paths"
          ]
        }
      ]
    },
    'coconut-grove': {
      title: "Coconut Grove Real Estate",
      subtitle: "Miami's Bohemian Paradise",
      description: "Experience the charm of Coconut Grove, Miami's oldest neighborhood, known for its lush landscapes, artistic culture, and waterfront beauty.",
      heroImage: "/src/assets/img/slide3.jpeg",
      sections: [
        {
          title: "Coconut Grove Lifestyle",
          subtitle: "Art, Nature, and Culture",
          content: "Coconut Grove combines historic charm with modern luxury. From tree-lined streets to waterfront estates, experience Miami's most artistic neighborhood."
        },
        {
          title: "Grove Attractions",
          subtitle: "What Makes The Grove Special",
          features: [
            "CocoWalk outdoor shopping and dining",
            "Vizcaya Museum and Gardens",
            "Peacock Park and waterfront access",
            "Grove Isle private island living",
            "Art galleries and cultural events",
            "Sailing club and marina access",
            "Historic architecture and charm",
            "Farmer's market and local events"
          ]
        }
      ]
    },
    'the-roads': {
      title: "The Roads Real Estate",
      subtitle: "Historic Elegance",
      description: "Discover The Roads, one of Miami's most prestigious historic neighborhoods featuring Mediterranean Revival architecture and tree-lined streets.",
      heroImage: "/src/assets/img/fundoImg.jpeg",
      sections: [
        {
          title: "The Roads Heritage",
          subtitle: "Historic Miami Living",
          content: "The Roads neighborhood offers historic homes with Mediterranean Revival architecture, mature landscaping, and a central location near downtown Miami and Coral Gables."
        },
        {
          title: "The Roads Features",
          subtitle: "Historic Neighborhood Benefits",
          features: [
            "Mediterranean Revival architecture",
            "Historic designation and character",
            "Mature oak trees and landscaping",
            "Close to downtown Miami",
            "Near Coral Gables and Coconut Grove",
            "Quiet residential streets",
            "Architectural diversity and charm",
            "Strong property values"
          ]
        }
      ]
    }
  };

  // Get neighborhood data or default to generic
  const data = neighborhoodData[neighborhoodSlug] || {
    title: "Miami Neighborhood",
    subtitle: "Discover Miami Living",
    description: "Explore this beautiful Miami neighborhood with unique character and lifestyle opportunities.",
    heroImage: "/src/assets/img/testesImagens.jpeg",
    sections: [
      {
        title: "Neighborhood Living",
        subtitle: "Miami Lifestyle",
        content: "Discover the unique character and amenities this neighborhood has to offer."
      }
    ]
  };

  // Format neighborhood name for search params
  const neighborhoodName = neighborhoodSlug 
    ? neighborhoodSlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

  const pageData = {
    ...data,
    searchParams: {
      neighborhood: neighborhoodName || '',
      city: "Miami",
      state: "FL",
      slug: neighborhoodSlug || '',
      type: 'neighborhood'
    }
  };

  return (
    <div>
      <Header />
      <PropertyListing 
        apiEndpoint="/api/properties"
        title={data.title}
        breadcrumbPath={`Neighborhoods / ${neighborhoodName}`}
        filters={pageData.searchParams}
        placeholderImage="/src/assets/img/testesImagens.jpeg"
      />
      <Footer />
    </div>
  );
};

export default Neighborhood;


import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackgroundCarousel from '../components/BackgroundCarousel';
import DevelopmentCarousel from '../components/DevelopmentCarousel';
import slide1 from '../assets/img/slide1.jpeg';
import slide2 from '../assets/img/slide2.jpeg';
import slide3 from '../assets/img/slide3.jpeg';

const Home = () => {
  const carouselImages = [
    "https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/7b925ec55931ef98fce0d25c165842f5-2048x810.jpeg",
    "https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/b7288246d6a8ed5e4588b43b56f52c8f-2048x810.jpeg",
    "https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/d23387e2fb9697ccbeaa2e7c70e8565a-2048x810.jpeg",
    "https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/9aa62a5920716e505049dbe9544f445a-2048x810.jpeg",
    "https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/ceb94adbbb52e807af48ff2bc9ca6e11-2048x810.jpeg"
  ];

  return (
    <div className="ip ip-theme-compass">
      <Header />
      
      <main>
        {/* Hero Section with Background Carousel */}
        <section 
          className="ip-page-section ip-section-home ip-section-height-large content-width-medium vertical-alignment-middle horizontal-alignment-center ms-animate js-section js-section-home"
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <BackgroundCarousel images={carouselImages} interval={5000} />
          </div>
          
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.23)', zIndex: 1 }}></div>
          
          <div className="ip-section-wrapper" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
            <div className="ip-section-content">
              <div className="ip-description ip-my-5 ip-block-content">
                <h4 style={{ fontSize: '36px', fontWeight: '600', marginBottom: '20px', color: 'rgba(255,255,255,1)' }}>
                  <strong>Building Relationships, Building Real Estate Legacies</strong>
                </h4>
                <h5 style={{ fontSize: '36px', fontWeight: 'normal', marginBottom: '30px', color: 'rgba(255,255,255,1)' }}>
                  Dayanne Costa
                </h5>
              </div>
              
              <div className="ip-wrap-btn ip-buttons-2" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                <a 
                  href="/buy/" 
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: 'rgba(237, 237, 237, 0.7)',
                    color: 'rgba(0, 0, 0, 1)',
                    border: '1px solid rgba(255, 255, 255, 1)',
                    textDecoration: 'none',
                    borderRadius: '0',
                    minWidth: '200px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    e.target.style.color = 'rgba(0, 0, 0, 1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(237, 237, 237, 0.7)';
                    e.target.style.color = 'rgba(0, 0, 0, 1)';
                  }}
                >
                  I Want To Buy
                </a>
                <a 
                  href="/sell/" 
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: 'rgba(237, 237, 237, 0.7)',
                    color: 'rgba(0, 0, 0, 1)',
                    border: '1px solid rgba(255, 255, 255, 1)',
                    textDecoration: 'none',
                    borderRadius: '0',
                    minWidth: '200px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    e.target.style.color = 'rgba(0, 0, 0, 1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(237, 237, 237, 0.7)';
                    e.target.style.color = 'rgba(0, 0, 0, 1)';
                  }}
                >
                  I Want To Sell
                </a>
              </div>

              {/* Search Bar */}
              <div className="ip-bubble-search">
                <div className="idx_color_search_bar_background" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', maxWidth: '600px', margin: '0 auto', border: '2px solid #fff' }}>
                  <form style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                    <div style={{ flex: '0 0 auto', minWidth: '120px' }}>
                      <select style={{ width: '100%', padding: '10px', border: '1px solid #ddd', fontSize: '14px', color: '#333' }}>
                        <option value="0">For Sale</option>
                        <option value="1">For Rent</option>
                      </select>
                    </div>
                    <div style={{ flex: '1 1 auto', minWidth: '200px' }}>
                      <input 
                        type="search" 
                        placeholder="Enter an address, city, zip code or MLS number"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', fontSize: '14px', color: '#333' }}
                      />
                    </div>
                    <button 
                      type="submit" 
                      style={{
                        padding: '10px 15px',
                        backgroundColor: '#333',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      🔍
                    </button>
                  </form>
                  <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <a href="/search" style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }}>
                      + Advanced search options
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar Images */}
          <div style={{ position: 'absolute', right: '20px', bottom: '0', zIndex: 2, display: 'block' }}>
            <img 
              src="https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/873e138e5bd56f1faf83943cedd7211b.png" 
              alt="Dayanne Costa" 
              style={{ maxHeight: '80vh', width: 'auto' }}
            />
          </div>

          {/* Scroll Button */}
          <button 
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 2
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '2px', height: '20px', backgroundColor: '#fff', opacity: 0.7 }}></span>
              <span style={{ width: '2px', height: '20px', backgroundColor: '#fff', opacity: 0.5 }}></span>
              <span style={{ width: '2px', height: '20px', backgroundColor: '#fff', opacity: 0.3 }}></span>
            </div>
          </button>
        </section>

        {/* Featured Listings */}
        <section style={{ padding: '60px 0', backgroundColor: 'rgba(85, 83, 83, 0)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <h5 style={{ fontSize: '30px', fontWeight: 'normal', marginBottom: '40px', color: 'rgba(0,0,0,1)' }}>
              FEATURED LISTINGS
            </h5>
            <a 
              href="/brickell-condos-1m/" 
              style={{
                display: 'inline-block',
                padding: '12px 30px',
                backgroundColor: 'transparent',
                color: '#000',
                border: '1px solid #000',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#000';
                e.target.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#000';
              }}
            >
              View All Listings
            </a>
          </div>
        </section>

        {/* Featured New Developments */}
        <section 
          style={{
            padding: '80px 0',
            backgroundImage: 'url(https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/d81c21679f6d011bf9b6cb158b669d40-2048x1059.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            color: '#fff',
            textAlign: 'center'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.63)' }}></div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h6 style={{ fontSize: '20px', fontWeight: 'normal', marginBottom: '10px', color: 'rgba(255,255,255,1)' }}>
              Featured
            </h6>
            <h5 style={{ fontSize: '32px', fontWeight: 'normal', marginBottom: '40px', color: 'rgba(255,255,255,1)' }}>
              New Developments
            </h5>
            
            {/* Development Items */}
            <DevelopmentCarousel developments={[
              { name: 'The Perigon', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/cc02ec61740605b377a36a46a0a43545-640x792.jpg', link: '/building/the-perigon/' },
              { name: 'The Residences at 1428 Brickell', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/3b0991f079a8a8bef15404fc500b4543-640x580.jpg', link: '/building/the-residences-at-1428-brickell/' },
              { name: '72 Park', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/7a91aa6ded4a549ffc193baacd9c5226-640x478.jpg', link: '/building/72-park/' },
              { name: 'Cipriani Residences', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/6b300095489db0620cc66220c79fa143-640x820.jpg', link: '/building/cipriani-residences/' },
              { name: 'St Regis Sunny Isles', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/4d404ec3ecd8348620a403d7babd0793-640x667.jpg', link: '/building/st-regis-sunny-isles/' },
              { name: 'St Regis Residences Miami', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/5fe94a123c8f7afb603dbe7ca14dfcb8-640x473.jpg', link: '/building/st-regis-residences-miami/' }
            ]} />
            
            <a 
              href="/new-developments/" 
              style={{
                display: 'inline-block',
                padding: '12px 30px',
                backgroundColor: 'transparent',
                color: '#fff',
                border: '1px solid #fff',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#fff';
                e.target.style.color = '#000';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#fff';
              }}
            >
              View All
            </a>
          </div>
        </section>

        {/* About Section - Dayanne Costa */}
        <section style={{ padding: '80px 0', backgroundColor: 'rgba(240, 240, 240, 1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              <article>
                <h6 style={{ fontSize: '20px', fontWeight: 'normal', marginBottom: '10px', color: 'rgba(126,126,126,1)' }}>
                  Luxury Real Estate Specialist
                </h6>
                <h3 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '30px', color: 'rgba(0,0,0,1)' }}>
                  Dayanne Costa
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px', color: 'rgba(0,0,0,1)' }}>
                  Dayanne is a dedicated real estate professional with a relentless pursuit of opportunities for her clients, dedicating herself to breaking sales records and turning real estate dreams into reality.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px', color: 'rgba(0,0,0,1)' }}>
                  Starting her real estate journey in Miami and honing her skills in Manhattan over seven years, Dayanne garnered top producer awards, spoke at prestigious seminars in the US and her home country Brazil, and built a reputation for successfully selling properties that had lingered on the market for over a year with other brokerages.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '30px', color: 'rgba(0,0,0,1)' }}>
                  Whether it is a dream home, a lucrative investment, multifamily, or a new development opportunity, she believes that helping clients realize their real estate dreams is a big part of achieving her own. From first-time homebuyers to sophisticated sellers or international real estate developers and everything in between, every client is a VIP, and she treasures each relationship.
                </p>
                <a 
                  href="/about" 
                  style={{
                    display: 'inline-block',
                    padding: '12px 30px',
                    backgroundColor: 'transparent',
                    color: '#000',
                    border: '1px solid #000',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#000';
                    e.target.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#000';
                  }}
                >
                  Read More
                </a>
              </article>
              <div>
                <img 
                  src="https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/596e5a67c1e480d3c005e6282feef4c4-1200x885.jpg" 
                  alt="Dayanne Costa" 
                  style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Ben Moss Group */}
        <section style={{ padding: '80px 0', backgroundColor: 'rgba(240, 240, 240, 1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              <div>
                <img 
                  src="https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/3dbb6a0b076cd7059b4b5d0b6902d7d0-1200x800.jpg" 
                  alt="Ben Moss Group" 
                  style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                />
              </div>
              <article>
                <h3 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '30px', color: 'rgba(0,0,0,1)' }}>
                  Ben Moss Group
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '30px', color: 'rgba(0,0,0,1)' }}>
                  The Ben Moss Group combines individual strengths including negotiation, sales, marketing, and sports to create a strong team approach when servicing the needs of our clients. Through our expertise in sports and entertainment, we also specialize in representing athletes and celebrities with their unique real estate needs around the country. Based in South Florida, and Tampa, we are one of the top teams in the state of Florida. Focusing on building relationships, we have strength within the luxury market but are also able to assist first-time homebuyers and luxury renters.
                </p>
                <a 
                  href="/about-team" 
                  style={{
                    display: 'inline-block',
                    padding: '12px 30px',
                    backgroundColor: 'transparent',
                    color: '#000',
                    border: '1px solid #000',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#000';
                    e.target.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#000';
                  }}
                >
                  Read More
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Selling a Home CTA */}
        <section 
          style={{
            padding: '100px 0',
            backgroundImage: 'url(https://api-cms.idxboost.com/assets/themes/IB001/images/img-bg-text-selling-a-home-2048x714.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            color: '#fff',
            textAlign: 'center'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.59)' }}></div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
            <h1 style={{ fontSize: '62px', fontWeight: 'bold', marginBottom: '20px', color: 'rgba(255,255,255,1)' }}>
              SELLING A HOME?
            </h1>
            <h6 style={{ fontSize: '22px', fontWeight: 'normal', marginBottom: '40px', color: 'rgba(255,255,255,1)' }}>
              Find out the market value of your home.
            </h6>
            <a 
              href="/sell/" 
              style={{
                display: 'inline-block',
                padding: '15px 40px',
                backgroundColor: 'transparent',
                color: '#fff',
                border: '1px solid #fff',
                textDecoration: 'none',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#fff';
                e.target.style.color = '#000';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#fff';
              }}
            >
              I Want To Sell
            </a>
          </div>
        </section>

        {/* Buying a Home CTA */}
        <section 
          style={{
            padding: '100px 0',
            backgroundImage: 'url(https://api-cms.idxboost.com/assets/themes/IB001/images/img-bg-text-buying-a-home-2048x714.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            color: '#fff',
            textAlign: 'center'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)' }}></div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
            <h1 style={{ fontSize: '64px', fontWeight: 'bold', marginBottom: '20px', color: 'rgba(255,255,255,1)' }}>
              BUYING A HOME?
            </h1>
            <h6 style={{ fontSize: '22px', fontWeight: 'normal', marginBottom: '40px', color: 'rgba(255,255,255,1)' }}>
              Explore our gallery of beautiful properties available now!
            </h6>
            <a 
              href="/buy/" 
              style={{
                display: 'inline-block',
                padding: '15px 40px',
                backgroundColor: 'transparent',
                color: '#fff',
                border: '1px solid #fff',
                textDecoration: 'none',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#fff';
                e.target.style.color = '#000';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#fff';
              }}
            >
              I Want To Buy
            </a>
          </div>
        </section>

        {/* Lifestyle Properties */}
        <section style={{ padding: '80px 0', backgroundColor: 'rgba(255, 255, 255, 0.25)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <h6 style={{ fontSize: '20px', fontWeight: 'normal', marginBottom: '5px', color: 'rgba(126,126,126,1)' }}>
              Browse
            </h6>
            <h5 style={{ fontSize: '32px', fontWeight: 'normal', marginBottom: '50px', color: 'rgba(0,0,0,1)' }}>
              LIFESTYLE PROPERTIES
            </h5>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {[
                { name: 'Waterfront Homes', image: 'https://idxboost-spw-assets.idxboost.us/assets/themes/IB001/images/img-neighborhoods-lifestyle-01-640x360.jpeg', link: '/waterfront-homes/' },
                { name: 'Boat Docks', image: 'https://idxboost-spw-assets.idxboost.us/assets/themes/IB001/images/img-neighborhoods-lifestyle-02-640x360.jpeg', link: '/boat-docks/' },
                { name: 'Golf Course', image: 'https://idxboost-spw-assets.idxboost.us/assets/themes/IB001/images/img-neighborhoods-lifestyle-03-640x359.jpeg', link: '/golf-course/' },
                { name: 'Luxury Condos', image: 'https://idxboost-spw-assets.idxboost.us/assets/themes/IB001/images/img-neighborhoods-lifestyle-04-640x360.jpeg', link: '/luxury-condos/' }
              ].map((item, index) => (
                <a key={index} href={item.link} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: '250px' }}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      padding: '15px 25px',
                      textAlign: 'center'
                    }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'normal', color: '#fff', margin: 0 }}>
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Neighborhoods */}
        <section style={{ padding: '80px 0', backgroundColor: 'rgba(255, 255, 255, 0.25)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <h6 style={{ fontSize: '20px', fontWeight: 'normal', marginBottom: '5px', color: 'rgba(126,126,126,1)' }}>
              Explore
            </h6>
            <h5 style={{ fontSize: '30px', fontWeight: 'normal', marginBottom: '50px', color: 'rgba(0,0,0,1)' }}>
              FEATURED NEIGHBORHOODS
            </h5>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
              {[
                { name: 'Brickell', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/e86a8dfcd02e3466c0d5a80420e06a7d-640x360.jpg', link: '/brickell/' },
                { name: 'Coconut Grove', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/3a59fb376c4036324fa545e8bfe6ace1-640x474.jpg', link: '/coconut-grove/' }
              ].map((item, index) => (
                <a key={index} href={item.link} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: '300px' }}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      padding: '20px 30px',
                      textAlign: 'center'
                    }}>
                      <h3 style={{ fontSize: '24px', fontWeight: 'normal', color: '#fff', margin: 0 }}>
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Communities Section */}
        <section style={{ padding: '80px 0', backgroundColor: 'rgba(255, 255, 255, 0.25)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', marginBottom: '40px' }}>
              {[
                { name: 'Edgewater', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/0859fc469a75c1198f1c7f651e0aaca5-640x421.jpg', link: '/edgewater/' },
                { name: 'Cocoplum', image: 'https://api-cms.idxboost.com/assets/themes/IB001/images/img-neighborhoods-communities-02-640x359.jpeg', link: '/cocoplum/' },
                { name: 'Surfside', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/e4b722f3993f9d415133a01f178bc40f-640x356.jpg', link: '/surfside/' },
                { name: 'North Miami Beach', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/29a100521a99c071c1d25715bca59355-640x359.jpg', link: '/north-miami-beach/' },
                { name: 'Miami Beach', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/b2e99914fcc20a182e7a9e3077e79d6d-640x355.jpg', link: '/miami-beach/' },
                { name: 'The Roads', image: 'https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/bc5815af0083a744e85217609f6b622e-640x333.png', link: '/the-roads/' }
              ].map((item, index) => (
                <a key={index} href={item.link} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      padding: '8px 16px',
                      textAlign: 'center',
                      borderRadius: '20px'
                    }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 'normal', color: '#000', margin: 0 }}>
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            <a 
              href="/neighborhoods/" 
              style={{
                display: 'inline-block',
                padding: '12px 30px',
                backgroundColor: 'transparent',
                color: '#000',
                border: '1px solid #000',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#000';
                e.target.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#000';
              }}
            >
              View All
            </a>
          </div>
        </section>

        {/* Recently Sold */}
        <section style={{ padding: '80px 0', backgroundColor: 'rgba(233, 233, 233, 1)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              <article style={{ textAlign: 'center' }}>
                <h6 style={{ fontSize: '20px', fontWeight: 'normal', marginBottom: '10px', color: 'rgba(0,0,0,1)' }}>
                  Recently Sold
                </h6>
                <h6 style={{ fontSize: '58px', fontWeight: 'bold', marginBottom: '15px', color: 'rgba(0,0,0,1)' }}>
                  $ 3,850,000
                </h6>
                <h4 style={{ fontSize: '24px', fontWeight: 'normal', marginBottom: '20px', color: 'rgba(0,0,0,1)' }}>
                  2020 North Bayshore
                </h4>
                <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', color: 'rgba(73,73,73,1)' }}>
                  Welcome to PH1 - This exquisitely designed and turnkey furnished condo offers an impressive 180 degrees of unobstructed water & city views, occupying 5350 SF total, with a Jacuzzi on the terrace. Enter directly from the elevator to the foyer and the expansive open floor plan living room, offering a chef's kitchen with Miele built-in coffee system, Stainless steel Wolf/Sub-Zero appliances with Sub-Zero wine-cooler, and Italian marble floors throughout. Watch the sunrise from the large master which is accompanied by a dramatic glass bathroom well equipped with Toto Japanese toilet with 'Stark and Geesi' accessories. The fourth ensuite bedroom is a servant quarter located outside of the unit and is easily accessed through the service laundry area. Comes with 3 parking spots & 2 storage units.
                </p>
                <h6 style={{ fontSize: '16px', fontWeight: 'normal', marginBottom: '5px', color: 'rgba(0,0,0,1)' }}>
                  Details
                </h6>
                <h6 style={{ fontSize: '16px', fontWeight: 'normal', marginBottom: '30px', color: 'rgba(0,0,0,1)' }}>
                  4 Beds • 4 Baths • 2,932 Sqft
                </h6>
                <a 
                  href="/sold-properties" 
                  style={{
                    display: 'inline-block',
                    padding: '12px 30px',
                    backgroundColor: 'transparent',
                    color: '#000',
                    border: '1px solid #000',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#000';
                    e.target.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#000';
                  }}
                >
                  View All Sold
                </a>
              </article>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', height: '400px' }}>
                <img 
                  src="https://api-cms.idxboost.com/assets/themes/IB001/images/img-recently-sold-01-1200x675.jpeg" 
                  alt="Recently Sold Property" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <img 
                  src="https://api-cms.idxboost.com/assets/themes/IB001/images/img-recently-sold-02-640x533.jpeg" 
                  alt="Recently Sold Property" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: '80px 0', backgroundColor: 'rgba(0, 0, 0, 1)', color: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h6 style={{ fontSize: '20px', fontWeight: 'normal', marginBottom: '10px', color: 'rgba(188,188,188,1)', fontStyle: 'italic' }}>
              Clients
            </h6>
            <h5 style={{ fontSize: '32px', fontWeight: 'normal', marginBottom: '50px', color: 'rgba(255,255,255,1)' }}>
              Testimonials
            </h5>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
              {[
                {
                  quote: "Dayanne has great energy and loves what she does. Which we found important when searching for a home in NYC. She was able to find us exclusive apartments that were fresh to the market and met our requirements. Dayanne was also very human about the process, never too anxious about closing a deal and was very transparent.",
                  author: "Robert"
                },
                {
                  quote: "Dayanne was spectacular from the first time we got in contact. Professional, courteous, kind, fair and knows a lot about the downtown area and the market. I can't say enough good things. This is the agent you want to help you find your dream home!",
                  author: "Ales"
                },
                {
                  quote: "Dayanne was far better than any other broker I have ever worked with. She was quick, responsive and extremely honest. Treated me like a friend and helped me through the whole process much quicker than I thought it was possible. She also got me a much better deal than I would have on my own. In a big city like NYC is very rare to find brokers that actually care. Couldn't be happier, I love my home!",
                  author: "Christina"
                }
              ].map((testimonial, index) => (
                <blockquote key={index} style={{ backgroundColor: 'rgba(44, 45, 48, 1)', padding: '30px', margin: 0 }}>
                  <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px', fontStyle: 'italic' }}>
                    "{testimonial.quote}"
                  </p>
                  <cite style={{ fontSize: '14px', fontWeight: 'bold', fontStyle: 'normal' }}>
                    {testimonial.author}
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

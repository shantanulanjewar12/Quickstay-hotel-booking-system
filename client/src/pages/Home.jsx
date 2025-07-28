import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import FAQS from '../components/Freq'
import RecommendedHotels from '../components/RecommendedHotels'

const Home = () => {
  return (
    <div>
        <Hero/>
        <RecommendedHotels/>
        <FeaturedDestination/>
        <ExclusiveOffers/>
        <Testimonial />
        <Newsletter />
        <FAQS />
    </div>
  )
}

export default Home
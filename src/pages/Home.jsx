import { useState } from "react";

import Hero from '../components/Hero/Hero'
import Features from '../components/Features/Features'
import AIDemo from "../components/AIDemo/AIDemo";
import DashboardPreview from "../components/DashBordPreview/DashboardPreview";
import Footer from "../components/Footer/Footer";

const Home = () => {

  return (
        <>
          <Hero />
          <Features />
          <AIDemo />
          <DashboardPreview />
          <Footer />
        </>
  );
}

export default Home
import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { FeaturedProperties } from './components/sections/FeaturedProperties';
import { Communities } from './components/sections/Communities';
import { WhyManiesta } from './components/sections/WhyManiesta';
import { Investment } from './components/sections/Investment';
import { Contact } from './components/sections/Contact';
import { initialFilters } from './data/site';
import type { FilterState } from './types';

export default function App() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  function scrollToProperties() {
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleSearch(next: FilterState) {
    setFilters({ ...next, sort: 'Featured' });
    scrollToProperties();
  }

  function handleCommunitySelect(location: string) {
    setFilters({ ...initialFilters, location });
    scrollToProperties();
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero onSearch={handleSearch} />
        <FeaturedProperties filters={filters} setFilters={setFilters} />
        <Communities onSelectCommunity={handleCommunitySelect} />
        <WhyManiesta />
        <Investment />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
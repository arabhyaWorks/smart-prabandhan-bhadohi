import React from 'react';
import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { Stats } from '../components/landing/Stats';
import { Steps } from '../components/landing/Steps';
import { Features } from '../components/landing/Features';
import { OngoingProjects } from '../components/landing/OngoingProjects';
import { ProjectGallery } from '../components/landing/ProjectGallery';
import { Footer } from '../components/landing/Footer';

export function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Stats />
      <Steps />
      <Features />
      <OngoingProjects />
      <ProjectGallery />
      <Footer />
    </div>
  );
}
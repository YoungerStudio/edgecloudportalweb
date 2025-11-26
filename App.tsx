import React, { useState } from 'react';
import { ViewState } from './types';
import { ChatBot } from './components/ChatBot';
import { ToolView } from './components/Tools';
import { Globe, ShieldCheck, Zap, Network, ArrowRight, Menu, Search, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data for the layout
  const heroProducts = [
    {
      id: 'ens',
      title: 'ENS',
      subtitle: 'Edge Node Service',
      desc: 'Distributed computing power closer to your users.',
      image: 'https://picsum.photos/800/600?grayscale&blur=2', // Placeholder abstract tech
      bgGradient: 'from-slate-900 to-slate-800'
    },
    {
      id: 'esa',
      title: 'ESA',
      subtitle: 'Edge Security Acceleration',
      desc: 'Unified security and acceleration at the edge.',
      image: 'https://picsum.photos/800/601?grayscale&blur=2',
      bgGradient: 'from-blue-900 to-slate-900'
    },
    {
      id: 'cdn',
      title: 'CDN',
      subtitle: 'Global Content Delivery',
      desc: 'Ultra-low latency content distribution network.',
      image: 'https://picsum.photos/800/602?grayscale&blur=2',
      bgGradient: 'from-slate-800 to-gray-900'
    }
  ];

  const gridTools = [
    {
      id: 'ens-calc',
      title: 'ENS Calculator',
      subtitle: 'Estimate compute costs',
      target: ViewState.TOOL_ENS_CALC,
      image: 'https://picsum.photos/600/400?random=1',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 'esa-calc',
      title: 'ESA Calculator',
      subtitle: 'Security pricing model',
      target: ViewState.TOOL_ESA_CALC,
      image: 'https://picsum.photos/600/400?random=2',
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      id: 'ens-best',
      title: 'Best Practices',
      subtitle: 'Optimization Guide',
      target: ViewState.TOOL_BEST_PRACTICE,
      image: 'https://picsum.photos/600/400?random=3',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'ena-tools',
      title: 'ENA Speed Test',
      subtitle: 'Network diagnostics',
      target: ViewState.TOOL_ENA_SPEED,
      image: 'https://picsum.photos/600/400?random=4',
      icon: <Network className="w-5 h-5" />
    }
  ];

  const navLinks = [
    { name: 'Home', view: ViewState.HOME },
    { name: 'ENS', view: ViewState.HOME }, // Simple anchors for demo
    { name: 'ESA', view: ViewState.HOME },
    { name: 'CDN', view: ViewState.HOME },
    { name: 'ENA', view: ViewState.HOME },
  ];

  if (currentView !== ViewState.HOME) {
    return (
      <div className="font-sans antialiased text-slate-900">
        <ToolView type={currentView} onBack={() => setCurrentView(ViewState.HOME)} />
        <ChatBot />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans antialiased bg-white text-slate-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView(ViewState.HOME)}>
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                 <div className="w-4 h-4 border-2 border-white rounded-full"></div>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">CloudEdge</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => setCurrentView(link.view)}
                  className="text-sm font-medium text-gray-600 hover:text-slate-900 transition-colors uppercase tracking-wide"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-slate-900">
                <Search className="w-5 h-5" />
              </button>
              <button className="hidden md:block bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
                Console
              </button>
              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 py-4 px-4 shadow-xl">
             <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setCurrentView(link.view);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-base font-medium text-gray-700"
                >
                  {link.name}
                </button>
              ))}
             </div>
          </div>
        )}
      </nav>

      {/* Main Content Area - Full Width Grid Layout */}
      <main className="pt-16">
        
        {/* Hero Section - The "Top Row" of the image */}
        {/* We use a grid that collapses on mobile but is 3 columns on desktop */}
        <section className="grid grid-cols-1 lg:grid-cols-3 w-full h-auto lg:h-[85vh]">
          {heroProducts.map((product) => (
            <div key={product.id} className="relative group overflow-hidden h-[60vh] lg:h-full border-b lg:border-b-0 lg:border-r border-gray-100 last:border-r-0">
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                 <img 
                   src={product.image} 
                   alt={product.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 {/* Dark gradient overlay for text readability */}
                 <div className={`absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity bg-gradient-to-b ${product.bgGradient}`}></div>
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>

              {/* Text Content - Positioned top center/left similar to car image */}
              <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-10 flex flex-col items-center text-center pt-20 lg:pt-32">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-md">{product.title}</h2>
                <p className="text-sm md:text-base text-gray-200 font-medium uppercase tracking-widest mb-4">{product.subtitle}</p>
                <p className="text-gray-300 max-w-xs text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 hidden lg:block">
                  {product.desc}
                </p>
              </div>

              {/* Action Button - Bottom Center */}
              <div className="absolute bottom-12 left-0 w-full flex justify-center z-10">
                <button className="bg-white/10 backdrop-blur-md border border-white/40 text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center gap-2 group-hover:w-auto">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Tools Grid - The "Bottom Row" of the image */}
        {/* 4 Columns for tools */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {gridTools.map((tool) => (
            <div 
              key={tool.id} 
              onClick={() => setCurrentView(tool.target)}
              className="relative h-[400px] lg:h-[50vh] border-r border-b border-gray-100 last:border-r-0 group cursor-pointer overflow-hidden bg-gray-50"
            >
              {/* Image Bg */}
              <div className="absolute inset-0">
                <img 
                  src={tool.image} 
                  alt={tool.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:from-black/70 transition-all"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-2 opacity-80 group-hover:opacity-100">
                  <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                    {tool.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">{tool.subtitle}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">{tool.title}</h3>
                <span className="text-sm font-medium border-b border-white/0 group-hover:border-white/100 transition-all inline-block pb-0.5">
                  Launch Tool
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Footer Minimal */}
        <footer className="bg-slate-900 text-gray-400 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm">
              &copy; 2024 CloudEdge Inc. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Status</a>
            </div>
          </div>
        </footer>

      </main>

      {/* Chatbot Integration */}
      <ChatBot />
    </div>
  );
}
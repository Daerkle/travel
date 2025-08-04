'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import TripCard from '@/components/TripCard';
import SearchForm from '@/components/SearchForm';
import { Trip } from '@/types';

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await fetch('/api/trips');
      if (response.ok) {
        const data = await response.json();
        setTrips(data.slice(0, 6)); // Show only first 6 trips on homepage
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            ENTDECKE AFRIKA MIT SOPHIE'S TOURS
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-slide-up">
            Erleben Sie unvergessliche Safari-Abenteuer mit optimaler Gesundheitsvorbereitung
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-xl max-w-4xl mx-auto animate-slide-up">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-night mb-4">Beliebte Reisen</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Entdecken Sie unsere beliebtesten Safari- und Kulturerlebnisse, 
              die darauf ausgelegt sind, bleibende Erinnerungen und persönliche Transformation zu schaffen.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-16 bg-gray-300 rounded mb-4"></div>
                    <div className="h-12 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-6">Momentan sind keine Reisen verfügbar.</p>
              <p className="text-gray-500">Schauen Sie bald wieder vorbei für aufregende neue Abenteuer!</p>
            </div>
          )}

          {trips.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/tours"
                className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary transition-colors"
              >
                Alle Reisen anzeigen
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Zinzino Health Program Section */}
      <section className="py-16 bg-savanna/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              Gesund & Vital auf Safari
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Mit unserem exklusiven Zinzino-Gesundheitsprogramm optimal vorbereitet nach Afrika
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-semibold mb-2">Gesundheitsanalyse</h3>
                <p className="text-gray-600">
                  Individuelle Bluttest-Analyse zur Bestimmung Ihres Omega-6:3-Verhältnisses
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🌿</div>
                <h3 className="text-xl font-semibold mb-2">Balance-Phase</h3>
                <p className="text-gray-600">
                  4-6 Wochen Vorbereitung mit personalisierten Zinzino-Produkten
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-semibold mb-2">Reisebegleitung</h3>
                <p className="text-gray-600">
                  Optimale Unterstützung während Ihrer Safari für mehr Energie und Wohlbefinden
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-night text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sophie's Tours</h3>
                  <p className="text-gray-400">Tours and Travels</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Creating extraordinary travel experiences that transform lives through 
                authentic African adventures and comprehensive wellness programs.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tours" className="hover:text-white transition-colors">Tours</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/zinzino" className="hover:text-white transition-colors">Zinzino Program</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@sophies-tours.com</li>
                <li>Phone: +49 XXX XXXXXXX</li>
                <li>Location: Germany</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sophie's Tours. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

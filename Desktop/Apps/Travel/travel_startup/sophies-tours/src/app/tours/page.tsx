'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TripCard from '@/components/TripCard';
import { Trip } from '@/types';

export default function ToursPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'zinzino'>('all');

  useEffect(() => {
    fetchTrips();
  }, [filter]);

  const fetchTrips = async () => {
    try {
      let url = '/api/trips';
      const params = new URLSearchParams();
      
      if (filter === 'active') {
        params.append('status', 'active');
      } else if (filter === 'zinzino') {
        params.append('includes_zinzino', 'true');
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTrips(data);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrips = trips.filter(trip => {
    if (filter === 'active') return trip.status === 'active';
    if (filter === 'zinzino') return trip.includes_zinzino;
    return true;
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Tours</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover extraordinary journeys through Africa with our carefully curated travel experiences
          </p>
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Tours
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                filter === 'active'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Available Now
            </button>
            <button
              onClick={() => setFilter('zinzino')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                filter === 'zinzino'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              With Zinzino Program
            </button>
          </div>

          {/* Detailed Search Filters */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-accent hover:bg-accent/90 text-white py-2 px-4 rounded-md transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
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
          ) : filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all' 
                  ? 'We are currently preparing amazing new adventures for you!'
                  : `No tours match your selected filter: ${filter === 'active' ? 'Available Now' : 'With Zinzino Program'}`
                }
              </p>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  View All Tours
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-forest to-primary py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We create custom travel experiences tailored to your dreams. 
            Contact us to design your perfect African adventure.
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-savanna transition-colors">
            Contact Us for Custom Tours
          </button>
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
                <li><a href="/tours" className="hover:text-white transition-colors">Tours</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/zinzino" className="hover:text-white transition-colors">Zinzino Program</a></li>
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
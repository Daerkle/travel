'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { Trip } from '@/types';

export default function TripDetailPage() {
  const params = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchTrip();
    }
  }, [params.id]);

  const fetchTrip = async () => {
    try {
      const response = await fetch(`/api/trips/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setTrip(data);
      }
    } catch (error) {
      console.error('Error fetching trip:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Trip not found</h1>
          <Link href="/tours" className="text-primary hover:underline">
            Back to tours
          </Link>
        </div>
      </div>
    );
  }

  const isFullyBooked = trip.current_participants >= trip.max_participants;
  const spotsLeft = trip.max_participants - trip.current_participants;

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Image */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={trip.image_url || '/api/placeholder/800/400'}
          alt={trip.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{trip.title}</h1>
          <p className="text-xl opacity-90">{trip.destination}</p>
        </div>
        <div className="absolute top-8 right-8">
          {trip.includes_zinzino && (
            <span className="bg-forest text-white px-4 py-2 rounded-full text-sm font-medium">
              🌿 Zinzino Program Included
            </span>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-night mb-4">Trip Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{trip.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{trip.duration_days}</div>
                  <div className="text-sm text-gray-600">Days</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{trip.max_participants}</div>
                  <div className="text-sm text-gray-600">Max Participants</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{spotsLeft}</div>
                  <div className="text-sm text-gray-600">Spots Left</div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            {trip.highlights && trip.highlights.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-night mb-4">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {trip.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Zinzino Program */}
            {trip.includes_zinzino && (
              <div className="bg-gradient-to-r from-forest to-primary text-white p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">Zinzino Health Program Included</h2>
                <p className="mb-4">
                  This trip includes our comprehensive health optimization program:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">🔬</span>
                    Pre-trip health analysis and Omega-3 testing
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🌿</span>
                    Personalized supplement regimen preparation
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">💪</span>
                    On-trip wellness support and guidance
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">📊</span>
                    Post-trip follow-up and health assessment
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  €{trip.price.toLocaleString()}
                </div>
                <div className="text-gray-600">per person</div>
              </div>

              {isFullyBooked ? (
                <div className="text-center">
                  <div className="bg-red-100 text-red-800 py-3 px-4 rounded-lg mb-4">
                    <strong>Fully Booked</strong>
                  </div>
                  <Link
                    href="/tours"
                    className="w-full bg-gray-300 text-gray-600 py-3 px-6 rounded-lg text-center block"
                  >
                    View Other Tours
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="bg-green-100 text-green-800 py-2 px-4 rounded-lg mb-4 text-center">
                    <strong>{spotsLeft} spots remaining</strong>
                  </div>
                  <Link
                    href={`/book/${trip.id}`}
                    className="w-full bg-accent hover:bg-orange-600 text-white py-3 px-6 rounded-lg text-center font-semibold block mb-3 transition-colors"
                  >
                    Book This Trip
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full border border-primary text-primary hover:bg-primary hover:text-white py-3 px-6 rounded-lg text-center block transition-colors"
                  >
                    Ask Questions
                  </Link>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-3">Need Help?</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>📞 +49 XXX XXXXXXX</div>
                  <div>✉️ info@sophies-tours.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
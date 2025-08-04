'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Trip } from '@/types';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  participants: number;
  specialRequests: string;
  zinzinoInterest: boolean;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    participants: 1,
    specialRequests: '',
    zinzinoInterest: false,
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: params.id,
          ...formData,
        }),
      });

      if (response.ok) {
        const booking = await response.json();
        router.push(`/booking/confirmation/${booking.confirmationCode}`);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
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
          <button onClick={() => router.back()} className="text-primary hover:underline">
            Go back
          </button>
        </div>
      </div>
    );
  }

  const isFullyBooked = trip.current_participants >= trip.max_participants;
  const totalPrice = trip.price * formData.participants;

  if (isFullyBooked) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Trip is Fully Booked</h1>
          <p className="text-gray-600 mb-6">Unfortunately, this trip is no longer available for booking.</p>
          <button
            onClick={() => router.push('/tours')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
          >
            View Other Tours
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Trip Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={trip.image_url || '/api/placeholder/100/100'}
                alt={trip.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-night mb-1">{trip.title}</h1>
                <p className="text-gray-600">{trip.destination}</p>
                <p className="text-sm text-gray-500">{trip.duration_days} days</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">€{trip.price.toLocaleString()}</div>
                <div className="text-sm text-gray-600">per person</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-night mb-6">Booking Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Participants *
                    </label>
                    <select
                      id="participants"
                      name="participants"
                      value={formData.participants}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {[...Array(Math.min(8, trip.max_participants - trip.current_participants))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i + 1 === 1 ? 'Person' : 'People'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests or Dietary Requirements
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={4}
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Please let us know about any special requirements, dietary restrictions, or other needs..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  {!trip.includes_zinzino && (
                    <div className="bg-forest/10 p-4 rounded-lg">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="zinzinoInterest"
                          checked={formData.zinzinoInterest}
                          onChange={handleInputChange}
                          className="mt-1 mr-3 h-4 w-4 text-forest focus:ring-forest border-gray-300 rounded"
                        />
                        <div>
                          <span className="font-medium text-gray-900">
                            I'm interested in the Zinzino Health Program
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            Add our comprehensive health optimization program to enhance your travel experience.
                            Our team will contact you with more details.
                          </p>
                        </div>
                      </label>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-accent hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Processing...' : `Book Now - €${totalPrice.toLocaleString()}`}
                  </button>
                </form>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h3 className="text-lg font-bold text-night mb-4">Booking Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trip Price</span>
                    <span>€{trip.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Participants</span>
                    <span>{formData.participants}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">€{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {trip.includes_zinzino && (
                  <div className="bg-forest/10 p-3 rounded-lg mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-forest mr-2">🌿</span>
                      <span className="font-medium text-sm">Zinzino Program Included</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Health analysis, personalized supplements, and wellness support included at no extra cost.
                    </p>
                  </div>
                )}

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Booking confirmation will be sent via email</p>
                  <p>• Full payment required to secure your spot</p>
                  <p>• Cancellation policy applies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
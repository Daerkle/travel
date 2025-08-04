'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

interface BookingDetails {
  id: string;
  confirmationCode: string;
  tripId: string;
  tripTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  participants: number;
  totalPrice: number;
  specialRequests: string;
  status: string;
  createdAt: string;
}

export default function BookingConfirmationPage() {
  const params = useParams();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.confirmationCode) {
      fetchBooking();
    }
  }, [params.confirmationCode]);

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/${params.confirmationCode}`);
      if (response.ok) {
        const data = await response.json();
        setBooking(data);
      }
    } catch (error) {
      console.error('Error fetching booking:', error);
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

  if (!booking) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking not found</h1>
          <p className="text-gray-600 mb-6">
            The confirmation code you provided could not be found in our system.
          </p>
          <Link href="/tours" className="text-primary hover:underline">
            Browse available tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-night mb-2">Booking Confirmed!</h1>
              <p className="text-gray-600">
                Thank you for booking with Sophie's Tours. Your adventure awaits!
              </p>
            </div>

            {/* Booking Details */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-night mb-6">Booking Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Confirmation Code
                  </label>
                  <p className="text-lg font-mono font-bold text-primary">{booking.confirmationCode}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Booking Date
                  </label>
                  <p className="text-gray-900">{new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Tour
                  </label>
                  <p className="text-gray-900 font-semibold">{booking.tripTitle}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Participants
                  </label>
                  <p className="text-gray-900">{booking.participants} {booking.participants === 1 ? 'person' : 'people'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Primary Contact
                  </label>
                  <p className="text-gray-900">{booking.firstName} {booking.lastName}</p>
                  <p className="text-gray-600 text-sm">{booking.email}</p>
                  <p className="text-gray-600 text-sm">{booking.phone}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Total Price
                  </label>
                  <p className="text-2xl font-bold text-accent">€{booking.totalPrice.toLocaleString()}</p>
                </div>
              </div>

              {booking.specialRequests && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Special Requests
                  </label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{booking.specialRequests}</p>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-night mb-6">What Happens Next?</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Confirmation Email</h3>
                  <p className="text-gray-600 text-sm">
                    You'll receive a detailed confirmation email within the next few minutes with your booking details.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pre-Trip Consultation</h3>
                  <p className="text-gray-600 text-sm">
                    Our team will contact you within 48 hours to discuss your trip details and any special requirements.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Zinzino Health Program</h3>
                  <p className="text-gray-600 text-sm">
                    If included in your booking, we'll schedule your health analysis and begin your preparation program.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Final Preparations</h3>
                  <p className="text-gray-600 text-sm">
                    2 weeks before departure, we'll send you a comprehensive travel guide and final instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Need Help?</h2>
            <p className="mb-4">
              Our team is here to assist you with any questions about your booking.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Email:</strong> info@sophies-tours.com
              </div>
              <div>
                <strong>Phone:</strong> +49 XXX XXXXXXX
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                href="/tours"
                className="bg-white text-primary px-6 py-3 rounded-lg text-center font-semibold hover:bg-savanna transition-colors"
              >
                Browse More Tours
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
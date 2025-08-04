'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trip } from '@/types';

interface TripCardProps {
  trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const isFullyBooked = trip.current_participants >= trip.max_participants;
  const spotsLeft = trip.max_participants - trip.current_participants;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={trip.image_url || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb'}
          alt={trip.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          {isFullyBooked ? (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Fully Booked
            </span>
          ) : (
            <span className="bg-forest text-white px-3 py-1 rounded-full text-sm font-medium">
              {spotsLeft} spots left
            </span>
          )}
        </div>
        {trip.includes_zinzino && (
          <div className="absolute top-4 left-4">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
              Zinzino Program
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-night group-hover:text-primary transition-colors">
            {trip.title}
          </h3>
          <span className="text-2xl font-bold text-primary">
            €{trip.price.toLocaleString()}
          </span>
        </div>

        <p className="text-earth font-medium mb-2">{trip.destination}</p>
        <p className="text-gray-600 mb-4 line-clamp-3">{trip.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {trip.duration_days} days
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Max {trip.max_participants} people
          </span>
        </div>

        {trip.highlights && trip.highlights.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-night mb-2">Highlights:</h4>
            <ul className="text-sm text-gray-600">
              {trip.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="flex items-center mb-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex space-x-3">
          <Link
            href={`/tours/${trip.id}`}
            className="flex-1 bg-primary text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-secondary transition-colors"
          >
            View Details
          </Link>
          {!isFullyBooked && (
            <Link
              href={`/book/${trip.id}`}
              className="flex-1 bg-accent text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-orange-600 transition-colors"
            >
              Book Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
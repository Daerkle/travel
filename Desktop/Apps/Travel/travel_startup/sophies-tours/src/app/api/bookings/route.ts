import { NextRequest, NextResponse } from 'next/server';
import { Booking, BookingFormData } from '@/types';
import { randomBytes } from 'crypto';

// Mock data for demonstration
const mockBookings: Booking[] = [];

function generateConfirmationCode(): string {
  return randomBytes(4).toString('hex').toUpperCase();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const trip_id = searchParams.get('trip_id');

    let filteredBookings = mockBookings;

    if (status) {
      filteredBookings = filteredBookings.filter(booking => booking.status === status);
    }

    if (trip_id) {
      filteredBookings = filteredBookings.filter(booking => booking.trip_id === trip_id);
    }

    return NextResponse.json(filteredBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingFormData = await request.json();
    
    // Validate required fields
    if (!bookingData.trip_id || !bookingData.guest_email || !bookingData.guest_name || !bookingData.participants) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.guest_email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: Check if trip exists and has available spots
    // For now, we'll assume the trip exists and calculate price
    
    // Mock trip data for price calculation
    const mockTripPrice = 2500; // This would come from database
    const zinzinoAdditionalPrice = 500;
    
    const basePrice = mockTripPrice * bookingData.participants;
    const zinzinoPrice = bookingData.includes_zinzino ? zinzinoAdditionalPrice * bookingData.participants : 0;
    const totalPrice = basePrice + zinzinoPrice;

    // Create new booking
    const newBooking: Booking = {
      id: Date.now().toString(),
      trip_id: bookingData.trip_id,
      booking_date: new Date().toISOString(),
      confirmation_code: generateConfirmationCode(),
      status: 'pending',
      payment_status: 'pending',
      participants: bookingData.participants,
      total_price: totalPrice,
      includes_zinzino: bookingData.includes_zinzino,
      guest_email: bookingData.guest_email,
      guest_name: bookingData.guest_name,
      guest_phone: bookingData.guest_phone,
      special_requests: bookingData.special_requests
    };

    mockBookings.push(newBooking);

    // TODO: Send confirmation email
    // TODO: Update trip participant count
    
    return NextResponse.json({
      message: 'Booking created successfully',
      booking: newBooking,
      confirmation_code: newBooking.confirmation_code
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { Trip } from '@/types';

// This would be replaced with actual database queries
// For now, importing the mock data (in real app, use database)
const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Serengeti Safari Adventure',
    destination: 'Tanzania, East Africa',
    description: 'Experience the Great Migration in the heart of the Serengeti. Witness millions of wildebeest, zebras, and gazelles as they traverse the endless plains in this once-in-a-lifetime safari adventure.',
    price: 3500,
    duration_days: 7,
    max_participants: 12,
    current_participants: 8,
    start_date: '2024-06-15',
    end_date: '2024-06-22',
    includes_zinzino: true,
    zinzino_price: 4200,
    image_url: '/api/placeholder/600/400',
    highlights: [
      'Witness the Great Migration',
      'Big Five wildlife viewing',
      'Luxury tented accommodation',
      'Professional guide included',
      'Traditional Maasai village visit'
    ],
    included: [
      'Airport transfers',
      'All meals during safari',
      'Professional English-speaking guide',
      'Game drives in 4x4 safari vehicle',
      'Park entrance fees',
      'Accommodation (luxury tented camps)',
      'Zinzino health program (if selected)'
    ],
    excluded: [
      'International flights',
      'Visa fees',
      'Personal expenses',
      'Tips for guide and staff',
      'Travel insurance'
    ],
    status: 'active',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T15:30:00Z'
  }
  // Add other trips as needed...
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    const trip = mockTrips.find(t => t.id === resolvedParams.id);
    
    if (!trip) {
      return NextResponse.json(
        { error: 'Trip not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(trip);
  } catch (error) {
    console.error('Error fetching trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    const updates = await request.json();
    const tripIndex = mockTrips.findIndex(t => t.id === resolvedParams.id);
    
    if (tripIndex === -1) {
      return NextResponse.json(
        { error: 'Trip not found' },
        { status: 404 }
      );
    }

    // Update trip (in real app, this would update database)
    mockTrips[tripIndex] = {
      ...mockTrips[tripIndex],
      ...updates,
      updated_at: new Date().toISOString()
    };

    return NextResponse.json(mockTrips[tripIndex]);
  } catch (error) {
    console.error('Error updating trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    const tripIndex = mockTrips.findIndex(t => t.id === resolvedParams.id);
    
    if (tripIndex === -1) {
      return NextResponse.json(
        { error: 'Trip not found' },
        { status: 404 }
      );
    }

    // Remove trip (in real app, this would delete from database)
    mockTrips.splice(tripIndex, 1);

    return NextResponse.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
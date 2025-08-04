import { NextRequest, NextResponse } from 'next/server';
import { Trip } from '@/types';

// Mock data for now - will be replaced with database
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
    image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb',
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
  },
  {
    id: '2',
    title: 'Victoria Falls & Zambezi River',
    destination: 'Zimbabwe & Zambia',
    description: 'Discover the thundering majesty of Victoria Falls and experience the wild beauty of the Zambezi River. Adventure activities, wildlife encounters, and breathtaking scenery await.',
    price: 2800,
    duration_days: 5,
    max_participants: 8,
    current_participants: 3,
    start_date: '2024-07-10',
    end_date: '2024-07-15',
    includes_zinzino: true,
    zinzino_price: 3400,
    image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb',
    highlights: [
      'Victoria Falls helicopter flight',
      'Zambezi River sunset cruise',
      'White water rafting',
      'Wildlife viewing in Chobe National Park',
      'Traditional craft market visit'
    ],
    included: [
      'Airport transfers',
      'All meals',
      'Accommodation (4-star lodge)',
      'All activities mentioned',
      'Professional guide',
      'Park fees',
      'Zinzino health program (if selected)'
    ],
    excluded: [
      'International flights',
      'Visa fees',
      'Personal expenses',
      'Optional activities',
      'Travel insurance'
    ],
    status: 'active',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-18T12:00:00Z'
  },
  {
    id: '3',
    title: 'Cape Town Cultural Experience',
    destination: 'South Africa',
    description: 'Immerse yourself in the vibrant culture of Cape Town. From Table Mountain to wine regions, township tours to penguin colonies, experience the diversity of the Mother City.',
    price: 2200,
    duration_days: 6,
    max_participants: 10,
    current_participants: 10,
    start_date: '2024-05-20',
    end_date: '2024-05-26',
    includes_zinzino: false,
    image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb',
    highlights: [
      'Table Mountain cable car',
      'Cape Winelands tour',
      'Township cultural tour',
      'Penguin colony at Boulders Beach',
      'Robben Island historical tour'
    ],
    included: [
      'Airport transfers',
      'Daily breakfast',
      'Accommodation (boutique hotel)',
      'All mentioned tours',
      'Professional guide',
      'Entrance fees'
    ],
    excluded: [
      'International flights',
      'Lunch and dinner',
      'Personal expenses',
      'Optional activities',
      'Travel insurance'
    ],
    status: 'full',
    created_at: '2024-01-05T08:00:00Z',
    updated_at: '2024-01-25T16:45:00Z'
  },
  {
    id: '4',
    title: 'Madagascar Wildlife Discovery',
    destination: 'Madagascar',
    description: 'Explore the unique biodiversity of Madagascar, home to lemurs, baobab trees, and endemic species found nowhere else on Earth. A true paradise for nature lovers.',
    price: 4200,
    duration_days: 10,
    max_participants: 8,
    current_participants: 2,
    start_date: '2024-08-05',
    end_date: '2024-08-15',
    includes_zinzino: true,
    zinzino_price: 4900,
    image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb',
    highlights: [
      'Ring-tailed lemur encounters',
      'Avenue of the Baobabs sunset',
      'Andasibe-Mantadia National Park',
      'Traditional Malagasy village visits',
      'Unique flora and fauna photography'
    ],
    included: [
      'Airport transfers',
      'All meals',
      'Accommodation (eco-lodges)',
      'All park fees',
      'Professional naturalist guide',
      'Internal flights',
      'Zinzino health program (if selected)'
    ],
    excluded: [
      'International flights',
      'Visa fees',
      'Personal expenses',
      'Tips',
      'Travel insurance'
    ],
    status: 'active',
    created_at: '2024-01-12T11:30:00Z',
    updated_at: '2024-01-22T14:20:00Z'
  },
  {
    id: '5',
    title: 'Kruger National Park Safari',
    destination: 'South Africa',
    description: 'Experience one of Africa\'s most famous game reserves. Home to the Big Five and countless other species, Kruger offers exceptional wildlife viewing opportunities.',
    price: 1800,
    duration_days: 4,
    max_participants: 15,
    current_participants: 6,
    start_date: '2024-09-12',
    end_date: '2024-09-16',
    includes_zinzino: true,
    zinzino_price: 2300,
    image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb',
    highlights: [
      'Big Five wildlife spotting',
      'Early morning and evening game drives',
      'Bush walk with ranger',
      'Traditional boma dinner',
      'Bird watching opportunities'
    ],
    included: [
      'Airport transfers from Johannesburg',
      'All meals',
      'Accommodation (safari lodge)',
      'Game drives',
      'Professional ranger guide',
      'Park entrance fees',
      'Zinzino health program (if selected)'
    ],
    excluded: [
      'Flights to Johannesburg',
      'Personal expenses',
      'Alcoholic beverages',
      'Optional activities',
      'Travel insurance'
    ],
    status: 'active',
    created_at: '2024-01-08T13:15:00Z',
    updated_at: '2024-01-19T10:30:00Z'
  },
  {
    id: '6',
    title: 'Moroccan Imperial Cities',
    destination: 'Morocco, North Africa',
    description: 'Journey through Morocco\'s imperial cities - Marrakech, Fez, Meknes, and Rabat. Experience the rich history, vibrant souks, and architectural wonders of this enchanting kingdom.',
    price: 2600,
    duration_days: 8,
    max_participants: 12,
    current_participants: 9,
    start_date: '2024-10-03',
    end_date: '2024-10-11',
    includes_zinzino: false,
    image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb',
    highlights: [
      'Djemaa el-Fna square in Marrakech',
      'Fez medina and tanneries',
      'Hassan II Mosque in Casablanca',
      'Atlas Mountains excursion',
      'Traditional hammam experience'
    ],
    included: [
      'Airport transfers',
      'Daily breakfast',
      'Accommodation (riads and hotels)',
      'All transportation',
      'Professional guide',
      'Entrance fees to monuments'
    ],
    excluded: [
      'International flights',
      'Lunch and dinner',
      'Personal expenses',
      'Tips for guide and drivers',
      'Travel insurance'
    ],
    status: 'active',
    created_at: '2024-01-07T09:45:00Z',
    updated_at: '2024-01-21T11:15:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination');
    const status = searchParams.get('status');
    const includes_zinzino = searchParams.get('includes_zinzino');

    let filteredTrips = mockTrips;

    // Apply filters
    if (destination) {
      filteredTrips = filteredTrips.filter(trip => 
        trip.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }

    if (status) {
      filteredTrips = filteredTrips.filter(trip => trip.status === status);
    }

    if (includes_zinzino !== null) {
      const includesZinzino = includes_zinzino === 'true';
      filteredTrips = filteredTrips.filter(trip => trip.includes_zinzino === includesZinzino);
    }

    return NextResponse.json(filteredTrips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const trip: Omit<Trip, 'id' | 'created_at' | 'updated_at'> = await request.json();
    
    // Validate required fields
    if (!trip.title || !trip.destination || !trip.price || !trip.duration_days) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new trip (in real app, this would be saved to database)
    const newTrip: Trip = {
      ...trip,
      id: Date.now().toString(), // Simple ID generation for demo
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    mockTrips.push(newTrip);

    return NextResponse.json(newTrip, { status: 201 });
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
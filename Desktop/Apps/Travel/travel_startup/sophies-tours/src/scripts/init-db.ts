#!/usr/bin/env tsx

import { initializeDatabase, query } from '../lib/database';

// Sample data for development
const sampleTrips = [
  {
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
    status: 'active'
  },
  {
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
    image_url: '/api/placeholder/600/400',
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
    status: 'active'
  },
  {
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
    image_url: '/api/placeholder/600/400',
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
    status: 'full'
  }
];

async function initializeWithSampleData() {
  try {
    console.log('🚀 Initializing database...');
    
    // Initialize database schema
    await initializeDatabase();
    
    console.log('📝 Adding sample trip data...');
    
    // Insert sample trips
    for (const trip of sampleTrips) {
      await query(`
        INSERT INTO trips (
          title, destination, description, price, duration_days, max_participants,
          current_participants, start_date, end_date, includes_zinzino, zinzino_price,
          image_url, highlights, included, excluded, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        ON CONFLICT DO NOTHING
      `, [
        trip.title, trip.destination, trip.description, trip.price, trip.duration_days,
        trip.max_participants, trip.current_participants, trip.start_date, trip.end_date,
        trip.includes_zinzino, trip.zinzino_price, trip.image_url, trip.highlights,
        trip.included, trip.excluded, trip.status
      ]);
    }
    
    console.log('✅ Database initialization completed successfully!');
    console.log('\n📊 Summary:');
    console.log('• Database schema created');
    console.log('• Default admin user added (admin@sophies-tours.com)');
    console.log(`• ${sampleTrips.length} sample trips added`);
    console.log('\n🔧 Next steps:');
    console.log('1. Copy .env.example to .env.local');
    console.log('2. Configure your DATABASE_URL in .env.local');
    console.log('3. Configure SMTP settings for email functionality');
    console.log('4. Run: npm run dev');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  initializeWithSampleData();
}

export { initializeWithSampleData };
import { Pool } from 'pg';

// Database configuration
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

// Create a singleton pool instance
let pool: Pool;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool(dbConfig);
    
    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Database pool error:', err);
    });
  }
  
  return pool;
}

// Database query helper
export async function query(text: string, params?: any[]) {
  const client = await getPool().connect();
  
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Initialize database schema
export async function initializeDatabase() {
  try {
    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create trips table
    await query(`
      CREATE TABLE IF NOT EXISTS trips (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        description TEXT,
        itinerary JSONB,
        price DECIMAL(10,2) NOT NULL,
        duration_days INTEGER NOT NULL,
        max_participants INTEGER NOT NULL,
        current_participants INTEGER DEFAULT 0,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        includes_zinzino BOOLEAN DEFAULT FALSE,
        zinzino_price DECIMAL(10,2),
        image_url TEXT,
        highlights TEXT[],
        included TEXT[],
        excluded TEXT[],
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'full', 'cancelled')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create bookings table
    await query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID,
        trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
        booking_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        confirmation_code VARCHAR(10) NOT NULL UNIQUE,
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
        payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
        participants INTEGER NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        includes_zinzino BOOLEAN DEFAULT FALSE,
        guest_email VARCHAR(255),
        guest_name VARCHAR(255),
        guest_phone VARCHAR(20),
        special_requests TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );
    `);

    // Create health_profiles table
    await query(`
      CREATE TABLE IF NOT EXISTS health_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
        omega_ratio DECIMAL(5,2),
        test_date DATE,
        test_status VARCHAR(20) DEFAULT 'pending' CHECK (test_status IN ('pending', 'sent', 'completed')),
        recommendations TEXT,
        follow_up_test_date DATE,
        follow_up_omega_ratio DECIMAL(5,2),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes for better performance
    await query(`
      CREATE INDEX IF NOT EXISTS idx_trips_status ON trips(status);
      CREATE INDEX IF NOT EXISTS idx_trips_start_date ON trips(start_date);
      CREATE INDEX IF NOT EXISTS idx_bookings_trip_id ON bookings(trip_id);
      CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
      CREATE INDEX IF NOT EXISTS idx_bookings_confirmation_code ON bookings(confirmation_code);
    `);

    // Insert default admin user if not exists
    await query(`
      INSERT INTO users (email, first_name, last_name, is_admin)
      VALUES ('admin@sophies-tours.com', 'Admin', 'User', TRUE)
      ON CONFLICT (email) DO NOTHING;
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Close pool connections
export async function closePool() {
  if (pool) {
    await pool.end();
  }
}

export default { query, initializeDatabase, closePool };
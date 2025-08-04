export interface Trip {
  id: string;
  title: string;
  destination: string;
  description: string;
  itinerary?: any;
  price: number;
  duration_days: number;
  max_participants: number;
  current_participants: number;
  start_date: string;
  end_date: string;
  includes_zinzino: boolean;
  zinzino_price?: number;
  image_url?: string;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  status: 'active' | 'full' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id?: string;
  trip_id: string;
  booking_date: string;
  confirmation_code: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  participants: number;
  total_price: number;
  includes_zinzino: boolean;
  guest_email?: string;
  guest_name?: string;
  guest_phone?: string;
  special_requests?: string;
  trip_title?: string;
  destination?: string;
  start_date?: string;
  end_date?: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  is_admin: boolean;
  created_at: string;
}

export interface HealthProfile {
  id: string;
  user_id: string;
  booking_id?: string;
  omega_ratio?: number;
  test_date?: string;
  test_status: 'pending' | 'sent' | 'completed';
  recommendations?: string;
  follow_up_test_date?: string;
  follow_up_omega_ratio?: number;
}

export interface BookingFormData {
  trip_id: string;
  participants: number;
  guest_email: string;
  guest_name: string;
  guest_phone: string;
  includes_zinzino: boolean;
  special_requests?: string;
}
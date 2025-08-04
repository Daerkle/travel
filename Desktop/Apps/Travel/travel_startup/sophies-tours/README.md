# Sophie's Tours - Travel Booking Platform

A modern, full-stack travel booking platform built with Next.js 14, featuring African safari tours with integrated Zinzino health programs.

## 🌟 Features

### Core Functionality
- **Tour Management**: Browse and book African safari and cultural tours
- **Zinzino Integration**: Optional 3-phase health and wellness program
- **Email-based Bookings**: No user registration required for customers
- **Admin Dashboard**: Complete trip and booking management system
- **Responsive Design**: Optimized for all devices with Afrika-inspired styling

### Technical Features
- **Next.js 14**: App Router with TypeScript
- **Database**: PostgreSQL with connection pooling
- **Authentication**: JWT-based admin authentication
- **Email Service**: Automated booking confirmations via Nodemailer
- **API Routes**: RESTful backend built into Next.js
- **Tailwind CSS**: Custom Afrika color palette and responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- SMTP email service (Gmail, SendGrid, etc.)

### Installation

1. **Clone and install dependencies**
   ```bash
   cd sophies-tours
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Configure environment variables**
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/sophies_tours"
   
   # JWT Secret
   JWT_SECRET="your-secure-secret-key"
   
   # Email (optional but recommended)
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   ```

4. **Initialize database** (optional - creates sample data)
   ```bash
   npx tsx src/scripts/init-db.ts
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Homepage: http://localhost:3000
   - Admin: http://localhost:3000/admin
   - Login: admin@sophies-tours.com / password

## 📁 Project Structure

```
sophies-tours/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── admin/          # Admin dashboard
│   │   ├── tours/          # Tours listing
│   │   └── login/          # Authentication
│   ├── components/          # Shared React components
│   ├── lib/                # Utilities and services
│   ├── scripts/            # Database initialization
│   └── types/              # TypeScript definitions
├── public/                 # Static assets
└── docs/                  # Documentation
```

## 🎨 Design System

### Afrika-Inspired Color Palette
- **Primary**: #D2691E (Warm Sienna)
- **Secondary**: #8B4513 (Saddle Brown) 
- **Accent**: #FF6B35 (Sunset Orange)
- **Earth**: #C19A6B (Camel)
- **Savanna**: #F5DEB3 (Wheat)
- **Night**: #2C1810 (Dark Brown)
- **Forest**: #228B22 (Forest Green)

### Typography
- **Font**: Inter (Google Fonts)
- **Responsive**: Mobile-first design approach

## 🔐 Authentication & Security

### Admin Access
- **Email**: admin@sophies-tours.com
- **Password**: password (change in production!)
- **Protected Routes**: All `/admin/*` routes require authentication
- **JWT Tokens**: HTTP-only cookies for security

### Security Features
- JWT token authentication
- Protected API routes
- Input validation
- SQL injection protection via parameterized queries
- CORS configuration for production

## 🗄️ Database Schema

### Tables
- **users**: Admin and customer information
- **trips**: Tour details, pricing, and availability
- **bookings**: Customer bookings and payment status  
- **health_profiles**: Zinzino program data and test results

### Key Relationships
- bookings → trips (many-to-one)
- bookings → users (optional, for registered users)
- health_profiles → users (one-to-many)
- health_profiles → bookings (optional relationship)

## 📧 Email System

### Automated Emails
- **Booking Confirmations**: Sent to customers with trip details
- **Admin Notifications**: New booking alerts for staff
- **Professional Templates**: HTML and plain text versions

### Configuration
Set up SMTP credentials in your `.env.local`:
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"  
SMTP_PASS="your-app-password"
```

## 🌍 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Configure environment variables in Vercel dashboard**
   - DATABASE_URL (use services like Neon, Supabase, or Railway)
   - JWT_SECRET
   - SMTP settings

3. **Database hosting options**
   - [Neon](https://neon.tech) - Serverless PostgreSQL
   - [Supabase](https://supabase.com) - PostgreSQL + additional features
   - [Railway](https://railway.app) - Full-stack platform

### Other Platforms
The app can be deployed to any Node.js hosting platform:
- Netlify Functions
- AWS Lambda
- Google Cloud Run
- Railway
- Heroku

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Management
- Initialize: `npx tsx src/scripts/init-db.ts`
- The app automatically creates tables on first connection
- Sample data included for development

### API Endpoints

#### Public Routes
- `GET /api/trips` - List all trips (with filters)
- `GET /api/trips/[id]` - Get trip details
- `POST /api/bookings` - Create new booking
- `POST /api/auth/login` - Admin login

#### Protected Routes (Admin)
- `PUT /api/trips/[id]` - Update trip
- `DELETE /api/trips/[id]` - Delete trip
- `POST /api/trips` - Create trip
- `GET /api/bookings` - List bookings

## 🧪 Testing

### Manual Testing Checklist
- [ ] Browse tours on homepage and tours page
- [ ] Create a booking (check email confirmation)
- [ ] Admin login with demo credentials
- [ ] Admin dashboard shows trips and bookings
- [ ] Responsive design on mobile/tablet

### Email Testing
Test email configuration:
```javascript
// In browser console on any page
fetch('/api/test-email').then(r => r.json()).then(console.log)
```

## 🔧 Customization

### Adding New Tours
1. Use admin dashboard at `/admin`
2. Or directly via database/API
3. Include Zinzino pricing for health program integration

### Modifying Design
- Colors: Update `tailwind.config.ts`
- Layout: Modify components in `/src/components/`
- Typography: Change font imports in `globals.css`

### Extending Functionality
- Payment integration: Add to booking flow
- User accounts: Extend user system
- Multi-language: Add i18n support
- Advanced filtering: Extend trip search

## 📞 Support & Contact

### Demo Credentials
- **Admin Email**: admin@sophies-tours.com
- **Password**: password

### Project Information
- **Built with**: Next.js 14, TypeScript, Tailwind CSS, PostgreSQL
- **License**: Private Project
- **Contact**: See admin dashboard for business contact details

## 🔄 Migration from Previous Version

This Next.js version replaces the previous React + Express.js architecture:

### Key Improvements
- **Simplified Deployment**: Single application instead of separate frontend/backend
- **Better Performance**: Next.js optimizations and caching
- **Vercel Ready**: Optimized for Vercel deployment
- **Modern Stack**: Latest Next.js 14 with App Router

### Data Migration
If migrating from the previous version:
1. Export data from old PostgreSQL database
2. Run the new database initialization script
3. Import your existing trip and booking data
4. Update any custom configurations

---

**Sophie's Tours** - Creating extraordinary travel experiences that transform lives through authentic African adventures and comprehensive wellness programs.

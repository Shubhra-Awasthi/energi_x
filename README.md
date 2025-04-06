# EnergiX

EnergiX is a modern web application built with React, TypeScript, and Vite, featuring a beautiful UI powered by Tailwind CSS and Radix UI components. It's a comprehensive energy management platform that connects consumers, utilities, and energy providers.

## 🚀 Features

### Core Platform Features
- Modern React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Radix UI components for accessible UI elements
- React Query for data fetching and caching
- React Router for navigation
- Form handling with React Hook Form and Zod validation
- Beautiful charts with Recharts
- Dark mode support with next-themes
- Toast notifications with Sonner
- Google AI integration

### Smart Meter Integration
- Real-time energy consumption monitoring
- Automated meter reading and data collection
- Historical consumption analysis
- Usage pattern detection
- Alert system for unusual consumption patterns
- Integration with multiple meter types and manufacturers

### DISCOM (Distribution Company) Portal
- Comprehensive dashboard for utility management
- Real-time grid monitoring and analytics
- Outage management and reporting
- Customer complaint tracking
- Billing and payment processing
- Regulatory compliance management
- Asset management and maintenance scheduling

### Consumer Dashboard
- Personalized energy consumption insights
- Real-time usage monitoring
- Cost analysis and projections
- Energy-saving recommendations
- Bill payment and history
- Usage comparison with similar households
- Customizable alerts and notifications

### Energy Marketplace
- Peer-to-peer energy trading
- Renewable energy credit trading
- Dynamic pricing based on demand
- Energy auction platform
- Contract management
- Settlement and payment processing
- Market analytics and reporting

### Analytics and Reporting
- Advanced data visualization
- Predictive analytics for consumption
- Cost optimization recommendations
- Carbon footprint tracking
- Regulatory reporting tools
- Custom report generation
- Export capabilities for various formats

### Mobile Responsiveness
- Fully responsive design for all devices
- Progressive Web App (PWA) capabilities
- Offline functionality
- Push notifications
- Mobile-optimized interfaces
- Touch-friendly controls

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn or bun package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/energix.git
cd energix
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run build:dev` - Build the application in development mode
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── pages/         # Page components
├── services/      # API services and external integrations
├── types/         # TypeScript type definitions
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## 🎨 UI Components

The project uses a combination of:
- Radix UI for accessible, unstyled components
- Tailwind CSS for styling
- Custom components built on top of these foundations

## 🔧 Configuration

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration

## 📱 Responsive Design

The application is fully responsive and works well on:
- Desktop
- Tablet
- Mobile devices

## 🌙 Dark Mode

The application supports both light and dark modes using next-themes.

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url
VITE_GOOGLE_AI_KEY=your_google_ai_key
```

## 🧪 Testing

To run tests:

```bash
npm test
# or
yarn test
# or
bun test
```

## 📦 Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
# or
bun run build
```

The build output will be in the `dist` directory.

## 🚀 Deployment

The project is configured for deployment on Vercel. Simply push to your repository and Vercel will automatically deploy your application.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## 🎯 Key Features in Detail

### Smart Meter Management
```typescript
// Example of smart meter data structure
interface SmartMeterData {
  meterId: string;
  timestamp: Date;
  consumption: number;
  voltage: number;
  current: number;
  powerFactor: number;
  status: 'active' | 'inactive' | 'error';
}
```

### DISCOM Dashboard
- **Grid Management**
  - Real-time grid status monitoring
  - Load distribution analysis
  - Fault detection and isolation
  - Maintenance scheduling

- **Customer Management**
  - Customer database
  - Service request tracking
  - Billing management
  - Communication tools

### Consumer Features
- **Energy Monitoring**
  - Real-time usage tracking
  - Historical data analysis
  - Cost calculation
  - Usage alerts

- **Smart Home Integration**
  - Device control
  - Automation rules
  - Energy optimization
  - Schedule management

### Marketplace Features
- **Trading Platform**
  - Order matching
  - Price discovery
  - Settlement processing
  - Contract management

- **Market Analysis**
  - Price trends
  - Demand forecasting
  - Trading volume analysis
  - Market reports

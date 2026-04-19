<!-- CarDecor Website Development Guidelines -->

## Project Overview
CarDecor is a React-based e-commerce website for car decorations and professional car services. Built with Vite for optimal performance and Tailwind CSS for responsive, modern design.

## Technology Stack
- React 18+ with TypeScript
- Vite (fast build tool)
- React Router v6 (client-side routing)
- Tailwind CSS (utility-first styling)
- React Context API (state management)

## Project Structure
- `src/components/` - Reusable UI components (Header, Footer)
- `src/pages/` - Page components (Home, Services, Products, Contact, Cart)
- `src/context/` - React Context for cart state management
- `src/utils/` - Utility functions (optional)
- `public/` - Static assets

## Development Workflow

### Running the Project
1. `npm install` - Install dependencies
2. `npm run dev` - Start dev server at http://localhost:5173
3. `npm run build` - Create production build

### Code Style Guidelines
- Use functional components with React hooks
- Use TypeScript for type safety
- Follow Tailwind CSS utility classes
- Keep component files in appropriate directories
- Use descriptive variable and function names

## Feature Guidelines

### Adding New Pages
1. Create a new file in `src/pages/`
2. Add Route to `App.tsx`
3. Add navigation link in `Header.tsx`

### Adding Products
Edit the products array in `src/pages/Products.tsx`:
- Add `id`, `name`, `price`, `description`, `emoji`

### Adding Services
Edit the services array in `src/pages/Services.tsx`:
- Add `id`, `name`, `description`, `price`, `emoji`

### Styling Guidelines
- Use Tailwind CSS classes for styling
- Custom colors defined in `tailwind.config.js`
- Primary color: #1a73e8 (blue)
- Accent color: #ea4335 (red)
- Secondary color: #34a853 (green)

## Cart State Management
The `CartContext` handles:
- Adding items to cart
- Removing items from cart
- Updating quantities
- Calculating total price
- Clearing cart

Use `useCart()` hook to access cart functionality in components.

## Performance Considerations
- Use React.lazy for code splitting (future enhancement)
- Optimize images with proper formats
- Minimize CSS bundle with Tailwind's purge feature
- Use Vite's HMR for fast development

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment
Ready for deployment to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Traditional hosting with `npm run build`

Build output: `dist/` directory

---

Last Updated: April 19, 2026

# 🛒 TechMart - Modern E-Commerce Store

TechMart is a clean, modern e-commerce web application built with React and Vite. It features a streamlined shopping experience, a responsive design, and a maintainable codebase. The project is designed for learning, rapid prototyping, and as a solid foundation for real-world online stores.

## 📖 Project Overview

TechMart is a comprehensive e-commerce solution that demonstrates modern web development practices. The application focuses on user experience, performance, and code maintainability. It serves as both an educational resource and a production-ready starting point for e-commerce projects.

### 🎯 Key Objectives
- **User-Centric Design**: Clean, intuitive interface that prioritizes user experience
- **Performance**: Fast loading times and smooth interactions
- **Maintainability**: Well-organized code structure for easy development and updates
- **Scalability**: Architecture that can grow with business needs
- **Modern Practices**: Latest React patterns and best practices

## ✨ Features

### 🛍️ Shopping Experience
- **Professional Navbar**: Modern, blurred background with a custom TechMart logo and a circular cart icon with badge
- **Responsive Design**: Fully optimized for all devices (desktop, tablet, mobile)
- **Cart System**: 
  - Add/remove products with quantity controls
  - Automatic total calculation
  - Visual cart badge with item count
  - Persistent cart state across sessions
- **Product Detail Page**: 
  - Focused layout with a single product image
  - Essential product information display
  - Easy add-to-cart functionality
  - Clean, distraction-free design

### 🛠️ Technical Features
- **Error Handling**: Clear error messages and robust navigation (including 404 handling)
- **Consistent UI**: Unified font and button sizes, visually balanced layouts
- **Maintainable Structure**: Organized folders for layout, pages, features, UI components, hooks, and utilities
- **State Management**: Efficient cart state management with Redux Toolkit
- **Data Fetching**: Optimized product data fetching with React Query

## 🛠️ Technologies & Tools

### Frontend Framework
- **React 19** – Modern UI library for building interactive interfaces
  - Functional components with hooks
  - Virtual DOM for efficient rendering
  - Component-based architecture

### Build Tool
- **Vite** – Next-generation frontend build tool
  - Lightning-fast hot module replacement
  - Optimized build process
  - Modern development experience

### State Management
- **Redux Toolkit** – State management for the shopping cart
  - Simplified Redux boilerplate
  - Immutable state updates
  - DevTools integration for debugging
- **React Query** – Efficient data fetching and caching for product data
  - Automatic caching and background updates
  - Optimistic updates
  - Error handling and retry logic

### Routing & Navigation
- **React Router DOM** – Client-side routing and navigation
  - Single Page Application (SPA) routing
  - Dynamic route parameters
  - Programmatic navigation

### UI Framework
- **Bootstrap 5 + React Bootstrap** – Responsive layout and UI components
  - Grid system for responsive layouts
  - Pre-built components (buttons, cards, modals)
  - Utility classes for styling

### Styling
- **SASS** – Advanced CSS preprocessor
  - Variables and mixins for consistent styling
  - Nested rules for better organization
  - Advanced features like functions and operators

### HTTP Client
- **Axios** – HTTP client for API requests
  - Promise-based API
  - Request/response interceptors
  - Automatic JSON parsing

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Modern web browser

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/techmart.git
   cd techmart
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Production Build

To create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with:
- Minified JavaScript and CSS
- Optimized assets
- Static files ready for deployment

### Deployment Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload build files to S3 bucket
- **Traditional hosting**: Upload build files to your web server

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=https://your-api-endpoint.com
VITE_STORAGE_KEY=techmart_cart
```

### Customization
- **Styling**: Modify `src/App.sass` and `src/index.sass` for global styles
- **Components**: Edit components in their respective folders
- **Routing**: Update routes in `App.jsx`
- **State Management**: Modify Redux slices in `src/rtk/`

## 📋 Planned Features

### User Management
- [ ] User authentication (login/register)
- [ ] User profiles and preferences
- [ ] Order history and tracking

### Enhanced Shopping
- [ ] Wishlist/favorites system
- [ ] Product reviews and ratings
- [ ] Product search and filtering
- [ ] Product categories and navigation

### Payment & Checkout
- [ ] Real payment integration (Stripe, PayPal)
- [ ] Multiple payment methods
- [ ] Order confirmation and receipts

### Advanced Features
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] PWA capabilities (offline support)
- [ ] SEO improvements
- [ ] Analytics integration

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests if applicable
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines
- Follow React best practices
- Write clean, readable code
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
```

**Module not found errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Clear build cache
npm run build -- --force
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [Bootstrap](https://getbootstrap.com/) for the UI components
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [React Query](https://tanstack.com/query) for data fetching
- [SASS](https://sass-lang.com/) for advanced styling

---

**Made with ❤️ by the TechMart Team**

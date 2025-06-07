## 🎯 Project Overview

This project is a complete redesign of the skip selection interface, transforming a dark-themed, basic layout into a modern, user-friendly experience while maintaining all original functionality.

## ✨ Key Features

### 🎨 Design Improvements
- **Modern Light Theme**: Clean, professional appearance with better contrast
- **Responsive Grid Layout**: Optimized for mobile, tablet, and desktop
- **Visual Feedback**: Hover states, selection animations, and micro-interactions

### 📱 Mobile-First Design
- **Touch-Friendly Interface**: Larger tap targets and optimized spacing
- **Responsive Breakpoints**
- 
### 🚀 Technical Features
- **API Integration**: Real-time data fetching from We Want Waste API
- **Error Handling**: Graceful fallbacks and user-friendly error messages
- **Loading States**: Skeleton components for better perceived performance
- **Type Safety**: Full TypeScript implementation
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation

## 🛠 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Eljyoussef/Rewaste-design
   cd Rewaste-design
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 📁 Project Structure

```
Rewaste-design/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main skip selection page
├── components/
│   └── ui/                  # Reusable UI components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── skeleton.tsx
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

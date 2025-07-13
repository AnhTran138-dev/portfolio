# Frontend Developer Portfolio

A modern, responsive portfolio website built with Next.js 14 (App Router), TypeScript, TailwindCSS, and Framer Motion.

## Features

- ✨ **Modern Design**: Clean, professional layout with smooth animations
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🎨 **Atomic Design**: Well-organized component structure
- ⚡ **Performance**: Optimized with Next.js App Router
- 🎭 **Animations**: Smooth interactions with Framer Motion
- 🎯 **SEO Ready**: Meta tags, OpenGraph, and structured data
- 🌟 **Interactive**: Hover effects, smooth scrolling, and dynamic navigation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **UI Components**: Custom components with Radix UI primitives

## Project Structure

```
components/
├── atoms/          # Basic building blocks
├── molecules/      # Simple combinations of atoms
├── organisms/      # Complex UI components
├── templates/      # Page-level layouts
└── ui/            # Base UI components
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd stella
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## Customization

### Personal Information

Edit the `portfolioData` object in `app/page.tsx` to customize:

- Personal details (name, title, description)
- Skills and technologies
- Work experience
- Projects
- Education and certifications
- Contact information

### Styling

- Update colors and theme in `app/globals.css`
- Customize component styles in individual component files
- TailwindCSS configuration in `tailwind.config.js`

### Images

- Add your avatar image to the `public` folder
- Update project images in the `public` folder
- Configure image domains in `next.config.ts` for external images

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Build for Production

```bash
npm run build
npm start
```

## SEO Optimization

The portfolio includes:

- Meta tags and OpenGraph data
- JSON-LD structured data
- Optimized images with Next.js Image component
- Semantic HTML structure
- Responsive design

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!

## Contact

For questions or suggestions, reach out via the contact information in the portfolio.

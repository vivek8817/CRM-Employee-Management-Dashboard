/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      // 1. COLORS
      colors: {
        brand: {
          DEFAULT: '#b5f82a', // Your lime green highlight
          dark: '#111111',    // Your high-contrast dark text/active state
        },
        surface: {
          DEFAULT: '#ffffff', // Card backgrounds
          muted: '#fafafa',   // Main content area background
        }
      },
      
      // 2. BORDER RADIUS
      borderRadius: {
        'card': '1.5rem',   // Replaces rounded-[1.5rem]
        'layout': '2.5rem', // Replaces rounded-[2.5rem]
      },

      // 3. SHADOWS
      boxShadow: {
        'ambient': '0 32px 64px -12px rgba(0,0,0,0.08)', // Replaces your custom shadow
      },

      // 4. SPACING (The 8-Point Grid)
      // Enforcing a strict mathematical grid ensures perfect visual rhythm 
      // without relying on arbitrary pixel values.
      spacing: {
        '2': '2px',
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
      }
    },
    // 5. TYPOGRAPHY
    // Overriding the base font sizes to guarantee strict accessibility.
    // This ensures your text never drops below highly readable thresholds.
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'], // Base readable standard
      lg: ['18px', '28px'],
      xl: ['20px', '28px'],
      '2xl': ['24px', '32px'],
      '3xl': ['32px', '40px'],
    }
  },
  plugins: [],
}
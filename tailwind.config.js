/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // Brand specific
        cream: '#F8F6F2',
        charcoal: '#111111',
        'warm-gray': '#666666',
        'border-luxury': '#E8E8E8',
        gold: '#C9A36A',
        'gold-light': '#E8D5B4',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background, 0 0% 98%))',
          foreground: 'hsl(var(--sidebar-foreground, 240 5.3% 26.1%))',
          primary: 'hsl(var(--sidebar-primary, 240 5.9% 10%))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground, 0 0% 98%))',
          accent: 'hsl(var(--sidebar-accent, 240 4.8% 95.9%))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground, 240 5.9% 10%))',
          border: 'hsl(var(--sidebar-border, 220 13% 91%))',
          ring: 'hsl(var(--sidebar-ring, 35 42% 60%))',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Times New Roman', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Cormorant Garamond', 'Times New Roman', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'var(--radius)',
        sm: 'var(--radius)',
      },
      letterSpacing: {
        'widest-2': '0.2em',
        'widest-3': '0.3em',
        'widest-4': '0.4em',
      },
      lineHeight: {
        'none-tight': '0.9',
        'hero': '0.93',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'loader-progress': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'loader-progress': 'loader-progress 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

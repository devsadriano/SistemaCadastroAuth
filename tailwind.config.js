/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        // Cores Primárias - Tons de Laranja
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Laranja principal
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        // Cores Secundárias - Tons de Preto/Cinza
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Cores de Background
        background: {
          primary: '#0a0a0a', // Preto principal
          secondary: '#111111',
          tertiary: '#1a1a1a',
          light: '#f8fafc',
          dark: '#020617',
        },
        // Cores de Superfície/Cards
        surface: {
          primary: '#1f1f1f',
          secondary: '#2a2a2a',
          tertiary: '#333333',
          hover: '#404040',
          light: '#ffffff',
          dark: '#0f0f0f',
        },
        // Cores de Texto
        text: {
          primary: '#ffffff',
          secondary: '#e2e8f0',
          tertiary: '#94a3b8',
          muted: '#64748b',
          inverse: '#0f172a',
          accent: '#f97316',
        },
        // Cores de Status
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fefce8',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Cores de Accent
        accent: {
          orange: '#f97316',
          'orange-light': '#fb923c',
          'orange-dark': '#c2410c',
          black: '#0a0a0a',
          'black-light': '#1f1f1f',
          'black-dark': '#000000',
        },
      },
      // Background Images personalizadas
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 100%)',
        'gradient-orange': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'gradient-dark': 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1f1f1f 100%)',
        'gradient-surface': 'linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0a0a0a 0%, #f97316 50%, #ea580c 100%)',
        'gradient-card': 'linear-gradient(145deg, #1f1f1f 0%, #2a2a2a 100%)',
      },
      // Box Shadows personalizadas
      boxShadow: {
        'primary': '0 4px 20px rgba(249, 115, 22, 0.3)',
        'surface': '0 4px 15px rgba(0, 0, 0, 0.3)',
        'card': '0 8px 25px rgba(0, 0, 0, 0.4)',
        'hover': '0 12px 35px rgba(249, 115, 22, 0.4)',
        'glow': '0 0 20px rgba(249, 115, 22, 0.5)',
        'dark': '0 4px 20px rgba(0, 0, 0, 0.6)',
        'inner-glow': 'inset 0 1px 0 rgba(249, 115, 22, 0.2)',
      },
      // Border Colors personalizadas
      borderColor: {
        'primary': '#f97316',
        'secondary': '#334155',
        'surface': '#2a2a2a',
        'accent': '#f97316',
        'muted': '#475569',
      },
      // Ring Colors personalizadas
      ringColor: {
        'primary': '#f97316',
        'secondary': '#64748b',
        'accent': '#f97316',
      },
      // Animation personalizada
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // Keyframes personalizada
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(249, 115, 22, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}


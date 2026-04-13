/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors (GitHub-inspired)
        primary: {
          50: '#f6f8fa',
          100: '#eaeef2',
          200: '#d0d7de',
          300: '#afb8c1',
          400: '#8c959f',
          500: '#6e7681',
          600: '#57606a',
          700: '#444c56',
          800: '#30363d',
          900: '#1c2128',
          950: '#010409',
        },
        // Accent blue (GitHub brand)
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0969da', // GitHub blue
          800: '#075985',
          900: '#0c3b66',
          950: '#051e3e',
        },
        // Semantic colors
        success: '#1a7f0f',
        warning: '#bf8700',
        error: '#da3633',
        info: '#0969da',
      },
      textColor: {
        DEFAULT: 'var(--text)',
        muted: 'var(--text-muted)',
      },
      backgroundColor: {
        DEFAULT: 'var(--bg)',
        secondary: 'var(--bg-secondary)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
    },
  },
  plugins: [],
}

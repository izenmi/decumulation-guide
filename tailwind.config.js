/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Hiragino Sans"',
          '"BIZ UDPGothic"',
          'Meiryo',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1f2937',
            lineHeight: '1.85',
            fontSize: '1.05rem',
            p: {
              marginBottom: '1.4em',
            },
            h1: {
              fontWeight: '800',
              letterSpacing: '-0.02em',
            },
            h2: {
              fontWeight: '700',
              letterSpacing: '-0.01em',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '0.4em',
              marginTop: '2.4em',
              marginBottom: '0.8em',
            },
            h3: {
              fontWeight: '600',
              marginTop: '1.8em',
              marginBottom: '0.6em',
            },
            code: {
              fontWeight: '500',
              borderRadius: '0.25rem',
              padding: '0.15rem 0.35rem',
            },
          },
        },
        invert: {
          css: {
            color: '#d1d5db',
            h2: {
              borderBottomColor: '#374151',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

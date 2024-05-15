/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        // maxWidth: {
        //   DEFAULT: '100%',
        //   sm: '640px',
        //   lg: '768px',
        //   lg: '768px',
        //   xl: '1024px',
        //   '2xl': '1044px',
        // },
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '2rem',
          xl: '0rem',
          '2xl': '0rem',
        },
        margin: {
          DEFAULT: '0px auto'
        }
      },
      colors: {
        'primary': '#614ab3',
        'acent': '#ff5e4e',
        // 'acent': '#ff7e47',
        // 'acent': '#38bdf8',
        'extralightacent': '#d7f2fe',
        'riskpage-container': '#f8f9fd',
        'gray': '#f2f2f2',
        'border-gray': '#d1d5db',
        'hover-back': '#eeeff4',
        'dark-gray': '#7f7f7f',
        'light-gray': '#ebebeb',
        'blue': '#0076e1',
        'extra-light-gray': '#cccccc',
        'yellow': '#fbbf24',
        'red': '#dc2626',
        'green': '#15803d',
        'lightGreen': '#dcfce7',
        'rose': '#e11d48',
        'lightRose': "#ffe4e6",
        'orange': '#fb923c',
        'lightOrange': '#ffedd5',
      },
      boxShadow: {
        'theme': '0px 0px 15px 1px rgba(0,0,0,0.1)',
      },
    },
    backgroundImage: {
      'header-menu-items': "linear-gradient(90deg,rgba(255,255,255,.05),rgba(255,255,255,.1) 50%,rgba(255,255,255,.05))",
      'hero-section': "url('https://assets-global.website-files.com/633d92770fc68548a10ca623/65a7c4df41cfc072e497da15_NOISE%20\(lower%20opacity\).webp'),linear-gradient(to bottom,var(--gradient--midnight--1)15%,var(--gradient--midnight--2)75%,var(--gradient--midnight--3))"
      // 'ticket-svg': "url('./src/assets/images/svg/ticket.svg')",
    }
  },
  plugins: [],
}


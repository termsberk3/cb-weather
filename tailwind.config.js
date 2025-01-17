/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'system-ui', 'sans-serif'],  
      'serif': ['Georgia', 'serif'],
      'mono': ['Menlo', 'monospace'],
    },
    extend:{
      colors: {
        'Rebecca': '#663399', 
        'gradient-pink-purple': 'linear-gradient(#e66465, #9198e5)',
        'default': '#ffffff',
      },
      
    }
  },
  plugins: [],
};
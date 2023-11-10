/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,tsx,ts}"],
    darkMode: false,
    theme: {
        colors: {
      //some colors
      primaryBg: "#ECE3CE",
      secondary:"#739072",
      primary:"#4F6F52",
      darkest:"#3A4D39"
        },
        extend: {
            animation: {
                bounce200: 'bounce 1s infinite 200ms',
                bounce400: 'bounce 1s infinite 400ms',
            },
        },
    },
    plugins: [],
  }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx, html}",
  ],
  theme: {
    // fontFamily: {'sans' : ['Courier New'] },
    extend: {
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },

          "100%": {
            width: "100%",
            visibility: "visible",
            borderColor: "transparent"
          }  

        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "transparent"
          }  
        }
      },
      animation: {
        typing: "typing 3s steps(20) 1 forwards", 
        blink: "blink .7s"
      }
    }
  },
  plugins: [],
}


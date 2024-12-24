/** @type {import('tailwindcss').Config} */
export default {
  // The `content` key specifies where Tailwind should look for class names to purge.
  // It includes all HTML and JS/TS files in the `src` folder.
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // The `theme` key is where you can customize Tailwind's default styles.
  theme: {
    extend: {
      // Custom font family definition. In this case, you're adding "Poppins" font.
      fontFamily: {
        poppins: "Poppins", // Adds the "Poppins" font to your Tailwind config.
      },

      // Custom screen breakpoints (responsive design).
      // You can add your custom breakpoints here, and the class names will adjust accordingly.
      screens: {
        sm: "0px", // "sm" breakpoint starts at 0px (for mobile-first design)
        md: "768px", // "md" breakpoint starts at 768px (tablet screen sizes)
        lg: "1324px", // "lg" breakpoint starts at 1324px (for large screens)
      },
    },
  },

  // Plugins are used to add extra functionality to Tailwind.
  // Here, the `plugins` array is empty, but you can add custom plugins in the future if needed.
  plugins: [],
};

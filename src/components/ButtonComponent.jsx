// ButtonComponent: A simple button component that takes `title` and `onClick` as props
const ButtonComponent = ({ title, onClick }) => {
  return (
    // The button element with the provided classes for styling and interaction
    <button
      className="p-2 border-2 border-teal-400 rounded-xl hover:bg-black hover:text-teal-400 hover:border-black" // Tailwind CSS classes for styling
      onClick={onClick} // Event handler passed down as a prop to handle button click
    >
      {title} {/* Button text, provided as the `title` prop */}
    </button>
  );
};

export default ButtonComponent; // Exporting the ButtonComponent for use in other parts of the app

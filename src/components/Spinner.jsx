import { LoadingOutlined } from "@ant-design/icons"; // Import the LoadingOutlined icon from Ant Design icons
import { Flex, Spin } from "antd"; // Import the Flex and Spin components from Ant Design

// Spinner: A component that displays a loading spinner with some text
const Spinner = () => {
  return (
    // Main wrapper div that takes the full height of the viewport (h-lvh) and centers content
    <div className="h-lvh flex justify-center items-center gap-5">
      {/* Text message to indicate loading */}
      Loading...Please Wait....
      {/* Flex container to center the loading spinner */}
      <Flex align="center" gap="middle">
        {/* Spin component shows the loading spinner with a custom icon */}
        <Spin indicator={<LoadingOutlined style={{ fontSize: 68 }} spin />} />
      </Flex>
    </div>
  );
};

export default Spinner; // Export the Spinner component for use in other parts of the application

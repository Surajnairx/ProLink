import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const Spinner = () => {
  return (
    <div className="h-lvh flex justify-center items-center gap-5">
      Loading...Please Wait....
      <Flex align="center" gap="middle">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 68 }} spin />} />
      </Flex>
    </div>
  );
};

export default Spinner;

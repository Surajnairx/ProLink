import Navbar from "./NavbarComponent";
import PostComponent from "./PostComponent";

const HomeComponent = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <PostComponent />
    </div>
  );
};

export default HomeComponent;

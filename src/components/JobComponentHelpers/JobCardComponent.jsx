/* eslint-disable react/prop-types */
const JobCardComponent = (props) => {
  return (
    <div className="flex justify-center ">
      <div className="flex  justify-between  w-2/3 bg-white p-3 rounded-sm hover:shadow-2xl hover:border-l-8 hover:border-l-teal-400 ease-in duration-100 ">
        <div className="flex flex-col items-center gap-2">
          <h1 className="p-3 font-semibold">{props.title}</h1>
          <button className="bg-teal-400 text-black font-semibold py-3 px-4 rounded-md">
            {" "}
            {props.companyName}
          </button>
        </div>

        <div className="flex flex-col justify-evenly items-center p-4">
          <h1 className="font-medium pb-5">Skills</h1>
          <ul className="flex justify-center items-center gap-5">
            {props.skills?.map((skill) => (
              <li className="bg-black text-white p-2 rounded-lg" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-2 px-10 ">
          <h1 className="p-3 font-semibold ">Posted On</h1>
          <button className=" border-2 bg-black text-white font-semibold py-3 px-4 rounded-full">
            Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCardComponent;

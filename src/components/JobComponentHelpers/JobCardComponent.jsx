const JobCardComponent = () => {
  return (
    <div className="flex justify-center">
      <div className="flex  justify-between  w-2/3 bg-slate-500 p-3 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <h1 className="p-3 font-semibold">Frontend Developer </h1>
          <button className="bg-teal-400 text-black font-semibold py-3 px-4 rounded-md">
            {" "}
            Google
          </button>
        </div>

        <div className="flex flex-col justify-evenly items-center p-4">
          <h1>Skills</h1>
          <ul className="flex justify-center items-center gap-5">
            <li>Javascript</li>
            <li>React</li>
            <li>Vue</li>
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-2 px-10">
          <h1 className="p-3 font-semibold">Posted On</h1>
          <button className="bg-teal-400 text-black font-semibold py-3 px-4 rounded-md">
            Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCardComponent;

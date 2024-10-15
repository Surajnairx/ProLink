const PostCardComponent = ({ post }) => {
  return (
    <div className=" w-2/3  min-h-fit  mt-[30px] border-2 pb-8 bg-white rounded-lg flex flex-col    ">
      <p className="pt-3 pl-3 text-slate-400">{post.timeStamp}</p>
      <p className=" pt-3 pl-3 text-[14px] font-bold text-black">{post.post}</p>
    </div>
  );
};

export default PostCardComponent;

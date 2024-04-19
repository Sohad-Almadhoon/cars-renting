import React from "react";

const Title = ({ text }: { text: string }) => {
  return <h1 className="text-center text-2xl my-5 font-bold">{text} </h1>;
};

export default Title;

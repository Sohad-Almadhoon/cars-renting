"use client"
import React from 'react'
import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="bg-slate-100 w-full h-full flex items-center justify-center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
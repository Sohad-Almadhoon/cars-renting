import React from 'react'
import { FidgetSpinner } from 'react-loader-spinner';

const SubmitButton = ({ text, loader }: { text: string; loader: boolean }) => {
  
  return (
    <button
      type="submit"
      disabled={loader}
      className="bg-main mt-4 disabled:bg-slate-300 disabled:text-black disabled:cursor-not-allowed text-white  p-2 rounded-md cursor-pointer w-full">
      {loader ? "إرسال..." : text}
    </button>
  );
};

export default SubmitButton
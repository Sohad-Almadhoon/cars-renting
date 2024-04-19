"use client";
import { NextPageContext } from "next";
import React from "react";

const Error = ({ statusCode }: { statusCode?: number }) => {
  return (
    <div className="container mx-auto py-8 text-center">
      {statusCode ? (
        <h1 className="text-3xl font-semibold mb-4 text-red-500">
          {statusCode} - An error occurred on server
        </h1>
      ) : (
        <h1 className="text-3xl font-semibold mb-4 text-red-500">
          حدث خطأ ما...
        </h1>
      )}
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

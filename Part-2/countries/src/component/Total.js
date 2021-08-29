import React from "react";

const Total = ({ parts }) => {
  console.log(parts)
  const arr = parts.map((part) => part.exercises);
  const total = arr.reduce((res, current) => res + current);
  return <p>total of {total} exercises</p>;
};

export default Total

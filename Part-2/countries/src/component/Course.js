import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ items }) => {
  return (
    <>
      {items.map((item) => {
        return (
            <div key={item.id}>
                <Header text={item.name} />
                <Content parts={item.parts}/>
                <Total parts={item.parts}/>
            </div>
        )
      })}
    </>
  );
};

export default Course;

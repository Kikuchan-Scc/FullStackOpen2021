  import React from "react";
  import Part from './Part'


  const Content = ({parts}) => {
      console.log(parts)
      return(
          <>
            {parts.map((part) => {
                return(
                    <div key={part.id}>
                        <Part text={part.name} num={part.exercises}/>
                    </div>
                )
            })}
          </>
      )
  }

  export default Content


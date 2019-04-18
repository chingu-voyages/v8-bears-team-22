import React from 'react';


const CurriculumSubTask = (props) => {
  const {title, url, isCompleted} = props.subTask;
  return (
    <div>
      <p>Sub-task title: {title} </p>
      <p>Sub-task url: {url ? url : "No url for this task"}</p>
      <p>Completed: {isCompleted ? "yes" : "no"}</p>
    </div>
  )
}

export default CurriculumSubTask;
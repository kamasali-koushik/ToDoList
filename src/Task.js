import Checkbox from "./checkbox";

const Task = ({ name, done, onToggle }) => {
  return (
    <div className={"task"+(done?"done":"")}>
      <Checkbox checked={done} onClick={() => onToggle(!done)} />
      <div className="formtaskname">{name}</div>
    </div>
  );
};

export default Task;

import { useState } from "react";

const Taskform = ({ onAdd }) => {
  const [taskval, setTaskval] = useState("");
  const handleSubmit = (ev) => {
    ev.preventDefault();
    onAdd(taskval);
    setTaskval("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <button>+</button>
      <input
        type="text"
        value={taskval}
        onChange={(ev) => setTaskval(ev.target.value)}
        placeholder="enter new task...."
      />
    </form>
  );
};

export default Taskform;

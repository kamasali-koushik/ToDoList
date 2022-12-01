import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Task";
import Taskform from "./Taskform";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    setTasks(tasks);
  }, []);

  const addTask = (name) => {
    setTasks((prev) => {
      return [...prev, { name: name, done: false }];
    });
  };

  const updateTaskDone = (taskIndex, newDone) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  };
  const updateName = (taskIndex, newName) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].name = newName;
      return newTasks;
    });
  };
  const updateTaskDelete = (taskIndex) => {
    const newTasks = tasks.filter((t, ind) => ind != taskIndex);
    console.log(newTasks);
    setTasks(newTasks);
  };
  const numberComplete = tasks.filter((t) => t.done).length;

  const taskLength = tasks.length;

  const getMessage = () => {
    const percentage =
      taskLength === 0 ? 0 : (numberComplete / taskLength) * 100;

    if (taskLength == 0) return "Add tasks to begin the day! 🌅";

    if (percentage === 0) {
      return "try do atleast one! 🔔";
    }

    if (percentage === 100) {
      return "nice job for today! 💪";
    }
    return "keep it going ! ⏩";
  };

  return (
    <div className="App">
      {taskLength != 0 && (
        <h1>
          {numberComplete}/{taskLength} Complete
        </h1>
      )}
      <h2>{getMessage()}</h2>
      <Taskform onAdd={addTask} />
      {tasks.map((task, index) => {
        return (
          <Task
            {...task}
            key={`task-${index}`}
            onRename={(newName) => updateName(index, newName)}
            onToggle={(done) => updateTaskDone(index, done)}
            onDelete={() => updateTaskDelete(index)}
          />
        );
      })}
    </div>
  );
}

export default App;

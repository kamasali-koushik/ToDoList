import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Task";
import Taskform from "./Taskform";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
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

  const numberComplete = tasks.filter((t) => t.done).length;

  const taskLength = tasks.length;

  const getMessage = () => {
    const percentage = (numberComplete / taskLength) * 100;
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
      <h1>
        {numberComplete}/{taskLength} Complete
      </h1>
      <h2>{getMessage()}</h2>
      <Taskform onAdd={addTask} />
      {tasks.map((task, index) => {
        console.log({ ...task });
        return (
          <Task {...task} onToggle={(done) => updateTaskDone(index, done)} />
        );
      })}
    </div>
  );
}

export default App;

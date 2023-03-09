import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SiTask } from "react-icons/si";
import "./App.css";
import { Form } from "./components/Layout/Form";
import { Header } from "./components/Layout/Header";
import { Todos } from "./components/Todos/Todos";
import { Task } from "./types";

function App() {
  const { register, handleSubmit } = useForm();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Load tasks from local storage on mount
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      console.log("Load tasks");
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const onSubmit = (data: any) => {
    const newTask: Task = { name: data.todoName, body: data.todoBody };
    setTasks([...tasks, newTask]);

    // Save tasks to local storage whenever a task is added
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  return (
    <div className="app">
      <Header icon={<SiTask />} />
      <Form register={register} onSubmit={handleSubmit(onSubmit)} />
      <Todos tasks={tasks} />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { MdTaskAlt } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import { CreateButton } from "./components/Layout/CreateButton";
import { Form } from "./components/Layout/Form";
import { Header } from "./components/Layout/Header";
import { Todos } from "./components/Todos/Todos";
import { Task } from "./types";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { register, handleSubmit } = useForm();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      console.log("Load tasks");
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleOpen = (): void => {
    setShowForm(true);
  };

  const handleClose = (): void => {
    setShowForm(false);
  };

  const handleNewTask = (data: Record<string, string>) => {
    setShowForm(false);

    const formatDate = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    const newTask: Task = {
      name: data.todoName,
      body: data.todoBody,
      tag: data.todoTag,
      date: formatDate,
    };

    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  const handleEdit = (id: number, name: string) => {
    console.log(`Edit clicked on ${id} ${name}`);
  };

  const handleComplete = (id: number, name: string) => {
    console.log(`Complete clicked on ${id} ${name}`);
  };

  const handleDelete = (id: number, name: string) => {
    console.log(`Delete clicked on ${id} ${name}`);

    const updatedTasks = tasks.filter((task, index) => index !== id);

    if (confirm(`Are you sure you want to delete todo: ${name}`)) {
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      toast.error(`Deleted todo: ${name}!`, {
        theme: "dark",
        position: "top-center",
        draggable: false,
        pauseOnHover: false,
        autoClose: 6000,
      });
    }
  };

  return (
    <div className="app">
      <Header icon={<MdTaskAlt />} />
      <CreateButton icon={<FiExternalLink />} handleOpen={handleOpen} />
      <div className={`form-container ${showForm ? "open" : ""}`}>
        {showForm && (
          <Form
            onSubmit={handleSubmit(handleNewTask)}
            register={register}
            handleClose={handleClose}
          />
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Todos
        tasks={tasks}
        handleEdit={handleEdit}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />
      <ToastContainer />
    </div>
  );
}

export default App;

import { useState } from "react";
import styles from "./styles/AddForm.module.css";

const AddForm = ({ register, onSubmit, onClose }) => {
  const [wordCount, setWordCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    const data = {
      id: Date.now(),
      created: now,
      list: e.target.list.value,
      title: e.target.title.value,
      description: e.target.description.value,
      priority: e.target.priority.value,
    };

    onSubmit(data);
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2>Add new Issue</h2>
        <button onClick={onClose}>&#10005;</button>
      </div>
      <div className={styles.body}>
        <div className={styles.field}>
          <label>Summary</label>
          <input type="text" {...register("title")} required />
        </div>
        <div className={styles.field}>
          <label>Description ({wordCount} words)</label>
          <textarea
            {...register("description")}
            rows="4"
            cols="50"
            required
            onChange={(e) =>
              setWordCount(e.target.value.trim().split(/\s+/).length)
            }
          />
        </div>
        <div className={styles.field}>
          <label>Issue priority</label>
          <select {...register("priority")} required>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Issue List</label>
          <select {...register("list")} required>
            <option value="backlog">Backlog</option>
            <option value="todos">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="inreview">In Review</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
      <div className={styles.submit}>
        <input type="submit" value="Add" />
      </div>
    </form>
  );
};

export default AddForm;

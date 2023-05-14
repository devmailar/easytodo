import { useState } from "react";
import styles from "./styles/Form.module.css";

const Form = ({
  formType,
  register,
  onSubmit,
  onClose,
  issueId,
  setPrevList,
}) => {
  const [wordCount, setWordCount] = useState(0);

  const countWords = (e) => {
    setWordCount(e.target.value.trim().split(/\s+/).length);
  };

  const savePrevList = (e) => {
    if (formType === "edit") {
      setPrevList(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    const issue = {
      id: formType === "add" ? Date.now() : issueId,
      created: now,
      list: e.target.list.value,
      title: e.target.title.value.trim().replace(/\s\s+/g, " "),
      description: e.target.description.value.trim().replace(/\s\s+/g, " "),
      priority: e.target.priority.value,
    };

    onSubmit(issue);
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2>{formType === "add" ? "Add new Issue" : "Edit current Issue"}</h2>
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
            onChange={countWords}
          />
        </div>
        <div className={styles.field}>
          <label>Select Priority</label>
          <select {...register("priority")} required>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Select List</label>
          <select {...register("list")} required onFocus={savePrevList}>
            <option value="backlog">Backlog</option>
            <option value="todos">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="inreview">In Review</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
      <div className={styles.submit}>
        <input type="submit" value={formType === "add" ? "Add" : "Edit"} />
      </div>
    </form>
  );
};

export default Form;

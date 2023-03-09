import { FC } from "react";
import { Task } from "../../types";

type TodosProps = {
  tasks: Task[];
};

export const Todos: FC<TodosProps> = ({ tasks }) => (
  <div className="todos">
    {tasks.map((task: Task, index: number) => {
      const limitedBody =
        task.body.length > 200 ? `${task.body.slice(0, 200)}...` : task.body;

      return (
        <div key={index} className="task">
          <h1 className="title">{task.name}</h1>
          <p className="body">{limitedBody}</p>
        </div>
      );
    })}
  </div>
);

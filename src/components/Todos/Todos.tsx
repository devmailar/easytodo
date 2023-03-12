import { FC } from "react";
import { Task } from "../../types";
import { BsClockHistory } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPen } from "react-icons/bs";

type TodosProps = {
  tasks: Task[];
  handleEdit: (id: number, name: string) => void;
  handleComplete: (id: number, name: string) => void;
  handleDelete: (id: number, name: string) => void;
};

export const Todos: FC<TodosProps> = ({
  tasks,
  handleEdit,
  handleComplete,
  handleDelete,
}) => {
  return (
    <div className="todos">
      {tasks.map((task: Task, index: number) => {
        const limitedBody =
          task.body.length > 200 ? `${task.body.slice(0, 200)}...` : task.body;

        return (
          <div key={index} className="task">
            <div className="title-wrapper">
              <h1 className="title">{task.name}</h1>
              <div className="actions">
                <BsPen onClick={() => handleEdit(index, task.name)} />
                <GiCheckMark onClick={() => handleComplete(index, task.name)} />
                <AiOutlineDelete
                  onClick={() => handleDelete(index, task.name)}
                />
              </div>
            </div>

            <div className="body-wrapper">
              <p className="body">{limitedBody}</p>
            </div>

            <div className="footer-wrapper">
              <p className="tag">{task.tag}</p>
              <div className="date-wrapper">
                <BsClockHistory />
                <p className="date">{task.date}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

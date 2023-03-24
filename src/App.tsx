import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoPlus } from 'react-icons/go';
import { MdTaskAlt } from 'react-icons/md';
import './App.css';
import { AddForm } from './components/layout/AddForm/AddForm';
import { Button } from './components/layout/Button';
import { EditForm } from './components/layout/EditForm/EditForm';
import { Header } from './components/layout/Header';
import { Todos } from './components/layout/Todos/Todos';
import { TodoProps } from './types';

function App() {
  const { register, handleSubmit } = useForm();
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [completedTodo, setCompletedTodo] = useState(false);

  /**
   * This effect hook retrieves stored todos from local storage and updates state
   * when the component mounts, running once due to an empty dependency array.
   */
  useEffect(() => {
    const todos = localStorage.getItem('todos');
    todos && setTodos(JSON.parse(todos));
  }, []);

  /**
   * This function sets the values of showAddForm and showEditForm based on the value of the type argument
   * If the value is 'add', it sets showAddForm to true and showEditForm to false.
   * If the value is 'edit', it sets showAddForm to false and showEditForm to true.
   * Otherwise, it sets both values to false.
   * @param type An optional string parameter that specifies the type of form to show {'add' or 'edit'}
   * @returns Nothing
   */
  const formHandler = (type: 'add' | 'edit' | undefined = undefined): void => {
    if (type === 'add') {
      setShowAddForm(true);
      setShowEditForm(false);
    } else if (type === 'edit') {
      setShowAddForm(false);
      setShowEditForm(true);
    } else {
      setShowAddForm(false);
      setShowEditForm(false);
    }
  };

  const form = {
    addSubmit: (data: Record<string, string>) => {
      try {
        const now = {
          getDate: () =>
            new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }),
        };

        const newTodo: TodoProps = {
          name: data.todoName,
          description: data.todoDescription,
          priority: data.todoPriority,
          date: now.getDate(),
        };

        setTodos([...todos, newTodo]);
        localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));

        formHandler(); // closes form if no parameter set
      } catch (exception) {
        console.error(exception);
      }
    },
    editSubmit: (data: Record<string, string>) => {
      try {
        alert(JSON.stringify(data));
      } catch (exception) {
        console.error(exception);
      }
    },
  };

  const todo = {
    editTodo: (id: number, name: string) => {
      console.log(`edit button clicked on ${id} ${name}`);

      formHandler('edit');
    },
    completeTodo: (id: number, name: string) => {
      console.log(`complete button clicked on ${id} ${name}`);

      const ticket = document.getElementById(`ticket-${id}`);

      if (ticket) {
        if (!completedTodo) {
          ticket.style.opacity = '0.8';
          ticket.style.backgroundColor = '#1A2A21'; //greenish color code
        } else {
          ticket.style.opacity = '1';
          ticket.style.backgroundColor = '#1a1e23';
        }
        setCompletedTodo(!completedTodo);
      }
    },
    deleteTodo: (id: number, name: string) => {
      console.log(`delete button clicked on ${id} ${name}`);

      try {
        const updatedTodos = todos.filter((_todo, index) => index !== id);

        if (confirm(`Are you sure you want to delete todo: ${name}`)) {
          setTodos(updatedTodos);
          localStorage.setItem('todos', JSON.stringify(updatedTodos));
        }
      } catch (exception) {
        console.log(exception);
      }
    },
  };

  return (
    <div className="app">
      <Header icon={<MdTaskAlt />} />
      <Button icon={<GoPlus />} handleClick={() => formHandler('add')} />
      {showAddForm && (
        <AddForm onSubmit={handleSubmit(form.addSubmit)} register={register} handleClose={() => formHandler()} />
      )}
      {showEditForm && (
        <EditForm onSubmit={handleSubmit(form.editSubmit)} register={register} handleClose={() => formHandler()} />
      )}
      <Todos
        todos={todos}
        handleEditClick={(id: number, name: string) => todo.editTodo(id, name)}
        handleCompleteClick={(id: number, name: string) => todo.completeTodo(id, name)}
        handleDeleteClick={(id: number, name: string) => todo.deleteTodo(id, name)}
      />
    </div>
  );
}

export default App;

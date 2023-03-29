import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillFilter } from 'react-icons/ai';
import { FaHandSparkles } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { MdTaskAlt } from 'react-icons/md';
import './App.css';
import { AddForm } from './components/AddForm/AddForm';
import { EditForm } from './components/EditForm/EditForm';
import { FormControl } from './components/FormControl/FormControl';
import { Header } from './components/Header/Header';
import { Todos } from './components/Todos/Todos';
import { TodoProps } from './types';

function App() {
  const { register, handleSubmit, setValue } = useForm();
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [completedTodo, setCompletedTodo] = useState(false);
  const [todoId, setTodoId] = useState(0);

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
  const formHandler = (type: 'add' | 'edit' | undefined = undefined, id?: number): void => {
    setShowAddForm(type === 'add');
    setShowEditForm(type === 'edit');
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

        localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
        setTodos(prevTodos => [...prevTodos, newTodo]);
        setValue('todoName', '');
        setValue('todoDescription', '');
        setValue('todoPriority', '');
        formHandler();
      } catch (exception) {
        console.error(exception);
      }
    },
    editSubmit: (data: Record<string, string>) => {
      try {
        const storedTodos = localStorage.getItem('todos');
        if (!storedTodos) return;

        const todos = JSON.parse(storedTodos);
        const index = todoId;

        todos[index].name = data.todoName;
        todos[index].description = data.todoDescription;
        todos[index].priority = data.todoPriority;

        localStorage.setItem('todos', JSON.stringify(todos));
        setTodos(todos);
        formHandler();
      } catch (exception) {
        console.error(exception);
      }
    },
  };

  const todo = {
    editTodo: (id: number, name: string, description: string, priority: string) => {
      console.log({ id, name, description, priority });

      formHandler('edit');
      setTodoId(id);
      setValue('todoName', name);
      setValue('todoDescription', description);
      setValue('todoPriority', priority);
    },
    completeTodo: (id: number, name: string) => {
      console.log(`complete button clicked on ${id} ${name}`);

      const ticket = document.getElementById(`ticket-${id}`);
      if (ticket) {
        if (!completedTodo) {
          ticket.style.opacity = '0.8';
          ticket.style.backgroundColor = '#1A2A21'; //greenish color code
        } else {
          setCompletedTodo(false);
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
          formHandler();
        }
      } catch (exception) {
        console.log(exception);
      }
    },
  };

  return (
    <div className="app">
      <Header icon={<MdTaskAlt />} paragraphIcon={<FaHandSparkles />} />
      <FormControl
        addIcon={<GoPlus />}
        filterIcon={<AiFillFilter />}
        handleAddClick={() => formHandler('add')}
        handleFilterClick={() => formHandler()}
      />
      {showAddForm && (
        <AddForm onSubmit={handleSubmit(form.addSubmit)} register={register} handleClose={() => formHandler()} />
      )}
      {showEditForm && (
        <EditForm onSubmit={handleSubmit(form.editSubmit)} register={register} handleClose={() => formHandler()} />
      )}
      <Todos
        todos={todos}
        handleEditClick={(id: number, name: string, description: string, priority: string) =>
          todo.editTodo(id, name, description, priority)
        }
        handleCompleteClick={(id: number, name: string) => todo.completeTodo(id, name)}
        handleDeleteClick={(id: number, name: string) => todo.deleteTodo(id, name)}
      />
    </div>
  );
}

export default App;

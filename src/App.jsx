import Category from '@Components/Category';
import Form from '@Components/Form';
import Issues from '@Components/Issues';
import Navbar from '@Components/Navbar';
import Popup from '@Components/Popup';

import { createStorage } from '@Hooks/storage';

import Board from '@Pages/Board';
import Statics from '@Pages/Statics';

import { handleForm } from '@Utils/form';
import { add, complete, edit, remove } from '@Utils/issue';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.scss';

function App() {
  const { register, setValue, getValues } = useForm();

  const [backlog, setBacklog] = createStorage('backlog', []);
  const [todos, setTodos] = createStorage('todos', []);
  const [inprogress, setInProgress] = createStorage('inprogress', []);
  const [inreview, setInReview] = createStorage('inreview', []);
  const [done, setDone] = createStorage('done', []);

  const [showBoard, setShowBoard] = useState(true);
  const [showStatics, setShowStatics] = useState(false);

  const [formType, setFormType] = useState('');

  const [prevCategory, setPrevCategory] = useState(null);

  /**
   * Each property represents a category of tasks and consists of two sub-properties: items and setter.
   * items property stores the corresponding task items, while the setter property refers to the setter function used to update the task items for that category.
   */
  const categories = {
    backlog: {
      items: backlog,
      setter: setBacklog,
    },
    todos: {
      items: todos,
      setter: setTodos,
    },
    inprogress: {
      items: inprogress,
      setter: setInProgress,
    },
    inreview: {
      items: inreview,
      setter: setInReview,
    },
    done: {
      items: done,
      setter: setDone,
    },
  };

  return (
    <div className="app">
      <Navbar
        createIssue={() => {
          handleForm('OPEN_ADD_FORM', {}, setFormType, setValue);
        }}
        showBoard={() => {
          setShowBoard(true);
          setShowStatics(false);
        }}
        showStatics={() => {
          setShowBoard(false);
          setShowStatics(true);
        }}
      />

      <Popup>
        {formType === 'ADD' && (
          <Form
            formType="ADD"
            register={register}
            getValues={getValues}
            onSubmit={(data) => {
              add(data, categories);
            }}
            onClose={() => setFormType('close')}
          />
        )}

        {formType === 'EDIT' && (
          <Form
            formType="EDIT"
            register={register}
            getValues={getValues}
            onSubmit={(data) => {
              edit(data, categories, prevCategory);
            }}
            onClose={() => setFormType('close')}
            setPrevCategory={setPrevCategory}
          />
        )}
      </Popup>

      {showStatics && <Statics />}
      {showBoard && (
        <Board>
          <Category>
            <p>BACKLOG</p>
            <Issues
              content={backlog}
              editIssue={(data) => {
                handleForm('OPEN_EDIT_FORM', data, setFormType, setValue);
              }}
              completeIssue={(data) => {
                complete(data, categories);
              }}
              deleteIssue={(data) => {
                remove(data, categories);
              }}
            />
          </Category>
          <Category>
            <p>TO DO</p>
            <Issues
              content={todos}
              editIssue={(data) => {
                handleForm('OPEN_EDIT_FORM', data, setFormType, setValue);
              }}
              completeIssue={(data) => {
                complete(data, categories);
              }}
              deleteIssue={(data) => {
                remove(data, categories);
              }}
            />
          </Category>
          <Category>
            <p>IN PROGRESS</p>
            <Issues
              content={inprogress}
              editIssue={(data) => {
                handleForm('OPEN_EDIT_FORM', data, setFormType, setValue);
              }}
              completeIssue={(data) => {
                complete(data, categories);
              }}
              deleteIssue={(data) => {
                remove(data, categories);
              }}
            />
          </Category>
          <Category>
            <p>IN REVIEW</p>
            <Issues
              content={inreview}
              editIssue={(data) => {
                handleForm('OPEN_EDIT_FORM', data, setFormType, setValue);
              }}
              completeIssue={(data) => {
                complete(data, categories);
              }}
              deleteIssue={(data) => {
                remove(data, categories);
              }}
            />
          </Category>
          <Category>
            <p>DONE</p>
            <Issues
              content={done}
              editIssue={(data) => {
                handleForm('OPEN_EDIT_FORM', data, setFormType, setValue);
              }}
              completeIssue={() => {
                alert('Issue cant be marked as done again!');
              }}
              deleteIssue={(data) => {
                remove(data, categories);
              }}
            />
          </Category>
        </Board>
      )}
    </div>
  );
}

export default App;

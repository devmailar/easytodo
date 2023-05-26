import Category from '@Components/Category';
import Form from '@Components/Form';
import Issues from '@Components/Issues';
import Navbar from '@Components/Navbar';
import Popup from '@Components/Popup';

import { createStorage } from '@Hooks/storage';

import Board from '@Pages/Board';
import Statics from '@Pages/Statics';

import { form } from '@Utils/form';
import { issue } from '@Utils/issue';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.scss';

function App() {
  const { register, setValue } = useForm();

  const [backlog, setBacklog] = createStorage('backlog', []);
  const [todos, setTodos] = createStorage('todos', []);
  const [inprogress, setInProgress] = createStorage('inprogress', []);
  const [inreview, setInReview] = createStorage('inreview', []);
  const [done, setDone] = createStorage('done', []);

  const [showBoard, setShowBoard] = useState(true);
  const [showStatics, setShowStatics] = useState(false);

  const [formType, setFormType] = useState('');

  const [issueId, setIssueId] = useState(null);
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
          form.method.handleForm('OPEN_ADD_FORM', {}, setFormType, setValue);
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
            onSubmit={(data) => {
              issue.method.add(data, categories, setIssueId);
            }}
            onClose={() => {
              form.method.handleForm(
                'CLOSE_ANY_FORM',
                {},
                setFormType,
                setValue
              );
            }}
          />
        )}

        {formType === 'EDIT' && (
          <Form
            formType="EDIT"
            register={register}
            onSubmit={(data) => {
              issue.method.edit(data, categories, prevCategory);
            }}
            onClose={() => {
              form.method.handleForm(
                'CLOSE_ANY_FORM',
                {},
                setFormType,
                setValue
              );
            }}
            issueId={issueId}
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
                form.method.handleForm(
                  'OPEN_EDIT_FORM',
                  data,
                  setFormType,
                  setValue
                );
              }}
              completeIssue={(data) => {
                issue.method.complete(data, categories);
              }}
              deleteIssue={(data) => {
                issue.method.remove(data, categories);
              }}
            />
          </Category>
          <Category>
            <p>TO DO</p>
            <Issues
              content={todos}
              editIssue={(data) => {
                form.method.handleForm(
                  'OPEN_EDIT_FORM',
                  data,
                  setFormType,
                  setValue
                );
              }}
              completeIssue={(data) => {
                issue.method.complete(data, categories);
              }}
              deleteIssue={(data) => {
                issue.method.remove(data, categories);
              }}
            />
          </Category>
          <Category>
            <p>IN PROGRESS</p>
            <Issues
              content={inprogress}
              editIssue={(data) => {
                form.method.handleForm(
                  'OPEN_EDIT_FORM',
                  data,
                  setFormType,
                  setValue
                );
              }}
              completeIssue={(data) => {
                issue.method.complete(data, categories);
              }}
              deleteIssue={(data) => {
                issue.method.remove(data, categories);
              }}
            />
          </Category>
          <Category>
            <p>IN REVIEW</p>
            <Issues
              content={inreview}
              editIssue={(data) => {
                form.method.handleForm(
                  'OPEN_EDIT_FORM',
                  data,
                  setFormType,
                  setValue
                );
              }}
              completeIssue={(data) => {
                issue.method.complete(data, categories);
              }}
              deleteIssue={(data) => {
                issue.method.remove(data, categories);
              }}
            />
          </Category>
          <Category>
            <p>DONE</p>
            <Issues
              content={done}
              editIssue={(data) => {
                form.method.handleForm(
                  'OPEN_EDIT_FORM',
                  data,
                  setFormType,
                  setValue
                );
              }}
              completeIssue={() => {
                alert('Issue cant be marked as done again!');
              }}
              deleteIssue={(data) => {
                issue.method.remove(data, categories);
              }}
            />
          </Category>
        </Board>
      )}
    </div>
  );
}

export default App;

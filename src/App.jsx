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
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import './App.scss';

function App() {
  const { register, setValue, getValues } = useForm();

  // This is hooks "createStorage"
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
    backlog: { items: backlog, setter: setBacklog },
    todos: { items: todos, setter: setTodos },
    inprogress: { items: inprogress, setter: setInProgress },
    inreview: { items: inreview, setter: setInReview },
    done: { items: done, setter: setDone },
  };

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === 'category') {
      const reorderedItems = [...categories[source.droppableId].items];
      const [removedIssue] = reorderedItems.splice(source.index, 1);

      reorderedItems.splice(destination.index, 0, removedIssue);

      console.log(destination);

      switch (source.droppableId) {
        case 'backlog':
          console.info('Dragged droppable at backlog');
          categories.backlog.setter(reorderedItems);
          break;
        case 'todos':
          console.info('Dragged droppable at todos');
          categories.todos.setter(reorderedItems);
          break;
        case 'inprogress':
          console.info('Dragged droppable at inprogress');
          categories.inprogress.setter(reorderedItems);
          break;
        case 'inreview':
          console.info('Dragged droppable at review');
          categories.inreview.setter(reorderedItems);
          break;
        case 'done':
          console.info('Dragged droppable at done');
          categories.done.setter(reorderedItems);
          break;
      }
    }
  };

  return (
    <div className="flex flex-col">
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
          <DragDropContext onDragEnd={handleDragDrop}>
            <Droppable droppableId="backlog" type="category">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="material flex flex-col gap-6 w-full h-screen p-4 overflow-y-auto"
                >
                  <p className="font-bold text-base text-[#747474]">BACKLOG</p>
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
                  {/* Will not cause laggy user experience */}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="todos" type="category">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="material flex flex-col gap-6 w-full h-screen p-4 overflow-y-auto"
                >
                  <p className="font-bold text-base text-[#747474]">TO DO</p>
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
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="inprogress" type="category">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="material flex flex-col gap-6 w-full h-screen p-4 overflow-y-auto"
                >
                  <p className="font-bold text-base text-[#747474]">
                    IN PROGRESS
                  </p>
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
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="inreview" type="category">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="material flex flex-col gap-6 w-full h-screen p-4 overflow-y-auto"
                >
                  <p className="font-bold text-base text-[#747474]">
                    IN REVIEW
                  </p>
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
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="done" type="category">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="material flex flex-col gap-6 w-full h-screen p-4 overflow-y-auto"
                >
                  <p className="font-bold text-base text-[#747474]">DONE</p>
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
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Board>
      )}
    </div>
  );
}

export default App;

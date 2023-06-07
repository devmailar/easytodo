import Form from '@Components/Form';
import Issues from '@Components/Issues';
import Navbar from '@Components/Navbar';
import Popup from '@Components/Popup';

import Board from '@Pages/Board';
import Statics from '@Pages/Statics';

import { createStorage } from '@Hooks/storage';

import { handle } from '@Services/form';
import { add, complete, edit, remove } from '@Services/issue';

import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import './App.scss';

export default function App() {
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

    const sourceCategory = source.droppableId;
    const destinationCategory = destination.droppableId;
    const destinationTodoIndex = destination.index;

    if (type === 'category') {
      const reorderedItems = [...categories[source.droppableId].items];
      const [removedIssue] = reorderedItems.splice(source.index, 1);

      reorderedItems.splice(destinationTodoIndex, 0, removedIssue);

      switch (sourceCategory) {
        case 'backlog':
          console.info('Moved droppable in backlog category');
          categories.backlog.setter(reorderedItems);
          break;
        case 'todos':
          console.info('Moved droppable in todos category');
          categories.todos.setter(reorderedItems);
          break;
        case 'inprogress':
          console.info('Moved droppable in inprogress category');
          categories.inprogress.setter(reorderedItems);
          break;
        case 'inreview':
          console.info('Moved droppable in inreview category');
          categories.inreview.setter(reorderedItems);
          break;
        case 'done':
          console.info('Moved droppable in done category');
          categories.done.setter(reorderedItems);
          break;
      }
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar
        createIssue={() => {
          handle('OPEN_ADD_FORM', {}, setFormType, setValue);
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
                      handle('OPEN_EDIT_FORM', data, setFormType, setValue);
                    }}
                    completeIssue={(data) => {
                      complete(data, categories);
                    }}
                    deleteIssue={(data) => {
                      remove(data.title, data.id, data.category, categories);
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
                      handle('OPEN_EDIT_FORM', data, setFormType, setValue);
                    }}
                    completeIssue={(data) => {
                      complete(data, categories);
                    }}
                    deleteIssue={(data) => {
                      remove(data.title, data.id, data.category, categories);
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
                      handle('OPEN_EDIT_FORM', data, setFormType, setValue);
                    }}
                    completeIssue={(data) => {
                      complete(data, categories);
                    }}
                    deleteIssue={(data) => {
                      remove(data.title, data.id, data.category, categories);
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
                      handle('OPEN_EDIT_FORM', data, setFormType, setValue);
                    }}
                    completeIssue={(data) => {
                      complete(data, categories);
                    }}
                    deleteIssue={(data) => {
                      remove(data.title, data.id, data.category, categories);
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
                      handle('OPEN_EDIT_FORM', data, setFormType, setValue);
                    }}
                    completeIssue={() => {
                      alert('Issue cant be marked as done again!');
                    }}
                    deleteIssue={(data) => {
                      remove(data.title, data.id, data.category, categories);
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

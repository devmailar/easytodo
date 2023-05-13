import Form from "@Components/Form";
import Issues from "@Components/Issues";
import List from "@Components/List";
import Navbar from "@Components/Navbar";
import Popup from "@Components/Popup";
import { useLocalStorage } from "@Hooks/useLocalStorage";
import Board from "@Pages/Board";
import { form } from "@Utils/form";
import { issue } from "@Utils/issue";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const { register, setValue } = useForm();
  const [formType, setFormType] = useState(null);

  const [backlog, setBacklog] = useLocalStorage("backlog", []);
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [inProgress, setInProgress] = useLocalStorage("inprogress", []);
  const [inReview, setInReview] = useLocalStorage("inreview", []);
  const [done, setDone] = useLocalStorage("done", []);

  const [issueId, setIssueId] = useState(null);
  const [prevList, setPrevList] = useState(null);

  const lists = {
    backlog: { items: backlog, setter: setBacklog },
    todos: { items: todos, setter: setTodos },
    inprogress: { items: inProgress, setter: setInProgress },
    inreview: { items: inReview, setter: setInReview },
    done: { items: done, setter: setDone },
  };

  return (
    <div className="app">
      <Navbar
        createIssue={() => {
          form.method.handleForm("OPEN_ADD_FORM", {}, setFormType, setValue);
        }}
      />
      <Popup>
        {formType === "add" && (
          <Form
            formType="add"
            register={register}
            onSubmit={(data) => {
              issue.method.add(data, lists, setIssueId);
            }}
            onClose={() => {
              form.method.handleForm(
                "CLOSE_ANY_FORM",
                {},
                setFormType,
                setValue
              );
            }}
          />
        )}

        {formType === "edit" && (
          <Form
            formType="edit"
            register={register}
            onSubmit={(data) => {
              issue.method.edit(data, lists, prevList);
            }}
            onClose={() => {
              form.method.handleForm(
                "CLOSE_ANY_FORM",
                {},
                setFormType,
                setValue
              );
            }}
            issueId={issueId}
            setPrevList={setPrevList}
          />
        )}
      </Popup>
      <Board>
        <List>
          <p>BACKLOG</p>
          <Issues
            content={backlog}
            editIssue={(data) => {
              form.method.handleForm(
                "OPEN_EDIT_FORM",
                data,
                setFormType,
                setValue
              );
            }}
            completeIssue={(data) => {
              issue.method.complete(data, lists);
            }}
            deleteIssue={(data) => {
              issue.method.remove(data, lists);
            }}
          />
        </List>
        <List>
          <p>TO DO</p>
          <Issues
            content={todos}
            editIssue={(data) => {
              form.method.handleForm(
                "OPEN_EDIT_FORM",
                data,
                setFormType,
                setValue
              );
            }}
            completeIssue={(data) => {
              issue.method.complete(data, lists);
            }}
            deleteIssue={(data) => {
              issue.method.remove(data, lists);
            }}
          />
        </List>
        <List>
          <p>IN PROGRESS</p>
          <Issues
            content={inProgress}
            editIssue={(data) => {
              form.method.handleForm(
                "OPEN_EDIT_FORM",
                data,
                setFormType,
                setValue
              );
            }}
            completeIssue={(data) => {
              issue.method.complete(data, lists);
            }}
            deleteIssue={(data) => {
              issue.method.remove(data, lists);
            }}
          />
        </List>
        <List>
          <p>IN REVIEW</p>
          <Issues
            content={inReview}
            editIssue={(data) => {
              form.method.handleForm(
                "OPEN_EDIT_FORM",
                data,
                setFormType,
                setValue
              );
            }}
            completeIssue={(data) => {
              issue.method.complete(data, lists);
            }}
            deleteIssue={(data) => {
              issue.method.remove(data, lists);
            }}
          />
        </List>
        <List>
          <p>DONE</p>
          <Issues
            content={done}
            editIssue={() => alert("Issue cant be edited!")}
            completeIssue={() => alert("Issue cant be marked as done again!")}
            deleteIssue={() => alert("Issue cant be deleted because its done!")}
          />
        </List>
      </Board>
    </div>
  );
}

export default App;

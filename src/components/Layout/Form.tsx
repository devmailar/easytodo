interface Form {
  onSubmit: any;
  register: any;
  handleClose: () => void;
}

export const Form = ({ onSubmit, register, handleClose }: Form) => {
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      todoName: { value: string };
      todoBody: { value: string };
    };

    const formData = {
      todoName: target.todoName.value,
      todoBody: target.todoBody.value,
    };

    onSubmit(formData);
  };

  const handleFormClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    handleClose();
  };

  return (
    <form className="form" onSubmit={handleAdd}>
      <div className="input-text">
        <label>
          Task name
          <input type="text" {...register("todoName")} required />
        </label>
      </div>

      <div className="input-text">
        <label>
          Task description
          <textarea {...register("todoBody")} rows="4" cols="50" required />
        </label>
      </div>

      <div className="input-submit">
        <input type="submit" value="Add" />
        <button onClick={handleFormClose}>Close</button>
      </div>
    </form>
  );
};

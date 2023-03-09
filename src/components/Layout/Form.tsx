interface Form {
  onSubmit: any;
  register: any;
}

export const Form = ({ register, onSubmit }: Form) => (
  <form className="form" onSubmit={onSubmit}>
    <div className="input">
      <label>
        Todo Name
        <input type="text" {...register("todoName")} required />
      </label>
    </div>

    <div className="input">
      <label>
        Todo Description
        <input type="text" {...register("todoBody")} required />
      </label>
    </div>

    <div className="input">
      <label>
        Design
        <input type="radio" {...register("todoDesign")} />
      </label>
    </div>

    <div className="input">
      <label>
        Development
        <input type="radio" {...register("todoDevelopment")} />
      </label>
    </div>

    <div className="input">
      <input type="submit" value="submit" />
    </div>
  </form>
);

const handleForm = (type, data, setFormType, setValue) => {
  console.log(type, data);

  switch (type) {
    case "OPEN_ADD_FORM":
      setFormType("add");
      setValue("title", "");
      setValue("description", "");
      setValue("priority", "");
      setValue("list", "");
      break;
    case "OPEN_EDIT_FORM":
      setFormType("edit");
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("priority", data.priority);
      setValue("list", data.list);
      break;
    case "CLOSE_ANY_FORM":
      setFormType("close");
      break;
    default:
      break;
  }
};

export const form = {
  method: {
    handleForm,
  },
};
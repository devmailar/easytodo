const handleForm = (type, data, setFormType, setValue) => {
  console.log(type, data);

  switch (type) {
    case 'OPEN_ADD_FORM':
      setFormType('ADD');
      setValue('id', '');
      setValue('title', '');
      setValue('description', '');
      setValue('priority', '');
      setValue('category', '');
      break;
    case 'OPEN_EDIT_FORM':
      setFormType('EDIT');
      setValue('id', data.id);
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('priority', data.priority);
      setValue('category', data.category);
      break;
    default:
      break;
  }
};

export { handleForm };

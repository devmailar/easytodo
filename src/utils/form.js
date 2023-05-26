const handleForm = (type, data, setFormType, setValue) => {
  console.log(type, data);

  switch (type) {
    case 'OPEN_ADD_FORM':
      setFormType('ADD');
      setValue('title', '');
      setValue('description', '');
      setValue('priority', '');
      setValue('category', '');
      break;
    case 'OPEN_EDIT_FORM':
      setFormType('EDIT');
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('priority', data.priority);
      setValue('category', data.category);
      break;
    case 'CLOSE_ANY_FORM':
      setFormType('close');
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

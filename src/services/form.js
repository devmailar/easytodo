export const handle = (type, data, setFormType, setValue) => {
  const { id, title, description, priority, category } = data;

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
      setValue('id', id);
      setValue('title', title);
      setValue('description', description);
      setValue('priority', priority);
      setValue('category', category);
      break;
    default:
      break;
  }
};

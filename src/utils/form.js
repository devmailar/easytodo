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

const handleAdd = (data, lists, setIssueId) => {
  const newItem = {
    id: data.id,
    created: data.created,
    list: data.list,
    title: data.title,
    description: data.description,
    priority: data.priority,
  };

  console.log("newItem:", newItem);

  const setList = lists[newItem.list].setter;
  const listItems = lists[newItem.list].items;

  setIssueId(newItem.id);
  setList([...listItems, newItem]);
};

const handleEdit = (data, lists, prevList) => {
  const editedItem = {
    id: data.id,
    created: data.created,
    list: data.list,
    title: data.title,
    description: data.description,
    priority: data.priority,
  };

  console.log("editedItem:", editedItem);

  const itemsInPrevList = lists[prevList].items;
  const itemsInNewList = lists[editedItem.list].items;

  const updatedItemsInPrevList = itemsInPrevList.filter((item) => {
    return item.id !== editedItem.id;
  });

  lists[prevList].setter(updatedItemsInPrevList);
  lists[editedItem.list].setter([...itemsInNewList, editedItem]);
};

export const form = {
  method: {
    handleForm,
    handleAdd,
    handleEdit,
  },
};

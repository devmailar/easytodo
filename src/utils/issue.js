const add = (data, lists, setIssueId) => {
  const newItem = {
    id: data.id,
    created: data.created,
    list: data.list,
    title: data.title,
    description: data.description,
    priority: data.priority,
  };

  const setList = lists[newItem.list].setter;
  const listItems = lists[newItem.list].items;

  setIssueId(newItem.id);
  setList([...listItems, newItem]);
};

const edit = (data, lists, prevList) => {
  const editedItem = {
    id: data.id,
    created: data.created,
    list: data.list,
    title: data.title,
    description: data.description,
    priority: data.priority,
  };

  const itemsInPrevList = lists[prevList].items;
  const itemsInNewList = lists[editedItem.list].items;

  const updatedItemsInPrevList = itemsInPrevList.filter((item) => {
    return item.id !== editedItem.id;
  });

  lists[prevList].setter(updatedItemsInPrevList);
  lists[editedItem.list].setter([...itemsInNewList, editedItem]);
};

const complete = (data, lists) => {
  const prevlist = data.list;
  const issue = {
    id: data.id,
    created: data.created,
    list: 'done',
    title: data.title,
    description: data.description,
    priority: data.priority,
  };

  const itemsInPrevList = lists[prevlist].items;
  const itemsInNewList = lists[issue.list].items;

  const updatedItemsInPrevList = itemsInPrevList.filter((item) => {
    return item.id !== issue.id;
  });

  lists[prevlist].setter(updatedItemsInPrevList);
  lists[issue.list].setter([...itemsInNewList, issue]);
};

const remove = (data, lists) => {
  if (!window.confirm('Are you sure you want to delete issue: ' + data.title)) {
    return;
  }

  const list = lists[data.list];
  const issues = list.items;
  const updatedIssues = issues.filter((item) => item.id !== data.id);

  list.setter(updatedIssues);
};

export const issue = {
  method: {
    add,
    edit,
    complete,
    remove,
  },
};

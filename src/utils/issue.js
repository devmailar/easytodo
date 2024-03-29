const add = (data, categories) => {
  const newItem = {
    id: data.id,
    created: data.created,
    category: data.category,
    title: data.title,
    description: data.description,
    priority: data.priority,
  };

  const setCategory = categories[newItem.category].setter;
  const categoryItems = categories[newItem.category].items;

  setCategory([...categoryItems, newItem]);
};

const edit = (data, categories, prevCategory) => {
  if (!data.id) {
    console.error('Error: Item ID is null');
    return;
  }

  const { id, created, category, title, description, priority } = data;

  const editItem = {
    id,
    created,
    category,
    title,
    description,
    priority,
  };

  const itemsInPrevCategory = categories[prevCategory].items;
  const itemsInNewCategory = categories[editItem.category].items;

  const existingItemIndex = itemsInNewCategory.findIndex((item) => {
    return item.id === editItem.id;
  });

  if (existingItemIndex !== -1) {
    itemsInNewCategory[existingItemIndex] = editItem;
  } else {
    const updatedItemsInPrevCategory = itemsInPrevCategory.filter((item) => {
      return item.id !== editItem.id;
    });

    categories[prevCategory].setter(updatedItemsInPrevCategory);
    categories[editItem.category].setter([...itemsInNewCategory, editItem]);
  }
};

const complete = (data, categories) => {
  const newItem = {
    id: data.id,
    created: data.created,
    category: 'done',
    title: data.title,
    description: data.description,
    priority: data.priority,
  };

  const prevCategory = data.category;

  const itemsInPrevCategory = categories[prevCategory].items;
  const itemsInNewCategory = categories[newItem.category].items;

  const updatedItemsInPrevCategory = itemsInPrevCategory.filter((item) => {
    return item.id !== newItem.id;
  });

  categories[prevCategory].setter(updatedItemsInPrevCategory);
  categories[newItem.category].setter([...itemsInNewCategory, newItem]);
};

const remove = (data, categories) => {
  if (!window.confirm('Are you sure you want to delete issue: ' + data.title)) {
    return;
  }

  const category = categories[data.category];
  const issues = category.items;
  const updatedIssues = issues.filter((item) => item.id !== data.id);

  category.setter(updatedIssues);
};

export { add, edit, complete, remove };

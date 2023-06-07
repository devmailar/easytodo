export const add = (data, categories) => {
  const { id, created, category, title, description, priority } = data;

  const newItem = {
    id: id,
    created: created,
    category: category,
    title: title,
    description: description,
    priority: priority,
  };

  const setCategory = categories[newItem.category].setter;
  const categoryItems = categories[newItem.category].items;

  setCategory([...categoryItems, newItem]);
};

export const edit = (data, categories, prevCategory) => {
  const { id, created, category, title, description, priority } = data;

  if (!id) {
    console.error('Error: ID is null');
    return;
  }

  const editItem = { id, created, category, title, description, priority };

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

export const complete = (data, categories) => {
  const { id, created, category, title, description, priority } = data;

  const newItem = {
    id: id,
    created: created,
    category: 'done',
    title: title,
    description: description,
    priority: priority,
  };

  const prevCategory = category;

  const itemsInPrevCategory = categories[prevCategory].items;
  const itemsInNewCategory = categories[newItem.category].items;

  const updatedItemsInPrevCategory = itemsInPrevCategory.filter((item) => {
    return item.id !== newItem.id;
  });

  categories[prevCategory].setter(updatedItemsInPrevCategory);
  categories[newItem.category].setter([...itemsInNewCategory, newItem]);
};

export const remove = (title, id, currentCategory, categories) => {
  if (!window.confirm(`Are you sure you want to delete issue: ${title}?`)) {
    return;
  }

  const category = categories[currentCategory];
  const issues = category.items;
  const updatedIssues = issues.filter((item) => item.id !== id);

  category.setter(updatedIssues);
};

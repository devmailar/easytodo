export type TodoProps = {
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | string;
  date: string;
};

export type TodosProps = {
  todos: TodoProps[];
  handleEditClick: (id: number, name: string) => void;
  handleCompleteClick: (id: number, name: string) => void;
  handleDeleteClick: (id: number, name: string) => void;
};

export type FormProps = {
  onSubmit: any;
  register: any;
  handleClose: () => void;
};

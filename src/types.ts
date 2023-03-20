export type TodoProps = {
  name: string;
  description: string;
  priority: string;
  date: string;
};

export type FormProps = {
  onSubmit: any;
  register: any;
  handleClose: () => void;
};

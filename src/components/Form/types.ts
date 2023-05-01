export type TFormData = {
  name: string;
  description: string;
  priority: string;
  list: string;
};

export type TFormProps = {
  type: string;
  title: string;
  buttonLabel: string;
  onSubmit: any;
  onClose: () => void;
  register: any;
};

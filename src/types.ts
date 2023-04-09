export type IssuesState = {
  backlog: Issue[];
  todo: Issue[];
  inProgress: Issue[];
  inReview: Issue[];
  done: Issue[];
};

export type Issue = {
  id?: number;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | string;
  date: string;
  edit?: (id: number, name: string, description: string, priority: string) => void;
  complete?: (id: number, name: string) => void;
  delete?: (id: number, name: string) => void;
};

export type FormProps = {
  onSubmit: any;
  register: any;
  handleClose: () => void;
};

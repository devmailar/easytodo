export type TIssuesState = {
  backlog: TIssue[];
  todo: TIssue[];
  inProgress: TIssue[];
  inReview: TIssue[];
  done: TIssue[];
};

export type TIssue = {
  id: number;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | string;
  date: string;
  edit?: (id: number, name: string, description: string, priority: string) => void;
  complete?: (id: number, name: string) => void;
  delete?: (id: number, name: string) => void;
};

export type TFormProps = {
  name: string;
  submitName: string;
  theme: string;

  onSubmit: any;
  register: any;
  handleClose: () => void;
};

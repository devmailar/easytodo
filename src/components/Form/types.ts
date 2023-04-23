export type TForm = {
    type: string;
    title: string;
    buttonLabel: string;
    onSubmit: (data: any) => void;
    handleClose: () => void;
    register: any;
};

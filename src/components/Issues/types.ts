import { TIssue } from '../../types';

export type THeader = {
    name: string;
};

export type TBody = {
    description: string;
};

export type TFooter = {
    index: number;
    color: string;
    issue: TIssue;
    handleEdit: (id: number, name: string, description: string, priority: string) => void;
    handleComplete: (id: number, name: string) => void;
    handleDelete: (id: number, name: string, createdDate: string) => void;
};

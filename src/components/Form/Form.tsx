import React from 'react';
import { MdDescription } from 'react-icons/md';
import { TForm } from './types';
import styles from './Form.module.css';

export default function Form({ type, title, buttonLabel, onSubmit, handleClose, register }: TForm) {
    const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            issueName: { value: string };
            issueDescription: { value: string };
            issuePriority: { value: string };
            issueList: { value: string };
        };

        const formData = {
            issueName: target.issueName.value,
            issueDescription: target.issueDescription.value,
            issuePriority: target.issuePriority.value,
            issueList: target.issueList.value,
        };

        onSubmit(formData);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmission}>
            <div className={styles.header}>
                <h2>{title}</h2>
                <button onClick={handleClose}>&#10005;</button>
            </div>
            <div className={styles.body}>
                <div className={styles.field}>
                    <label>
                        <MdDescription /> Issue Name
                    </label>
                    <input type="text" {...register('issueName')} placeholder="Name for this issue..." required />
                </div>
                <div className={styles.field}>
                    <label>
                        <MdDescription /> Issue Description
                    </label>
                    <textarea
                        {...register('issueDescription')}
                        placeholder="Description for this issue..."
                        rows="4"
                        cols="50"
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label>
                        <MdDescription /> Issue Priority
                    </label>
                    <select {...register('issuePriority')} required>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className={styles.field}>
                    <label>
                        <MdDescription /> Issue List
                    </label>
                    <select {...register('issueList')} required>
                        <option value="backlog">Backlog</option>
                        <option value="todo">To Do</option>
                        <option value="inprogress">In Progress</option>
                        <option value="inreview">In Review</option>
                        <option value="done">Done</option>
                    </select>
                </div>
            </div>
            <div className={`${styles.submit} ${type === 'add' ? 'add' : type === 'edit' ? 'edit' : ''}`}>
                <button type="submit">{buttonLabel}</button>
            </div>
        </form>
    );
}

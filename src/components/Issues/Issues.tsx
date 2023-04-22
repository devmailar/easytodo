import React, { FC } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCalendar2Week, BsPen } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import { GoIssueOpened } from 'react-icons/go';
import { GrTextAlignFull } from 'react-icons/gr';
import { TIssue } from '../../types';
import styles from './Issues.module.css';
import { TBody, TFooter, THeader } from './types';

const Header: FC<THeader> = props => (
    <div className={styles.header}>
        <div className={styles.textWrapper}>
            <h2>{props.name}</h2>
        </div>
    </div>
);

const Body: FC<TBody> = props => (
    <div className={styles.body}>
        <div className={styles.textWrapper}>
            <p>{props.description.length > 200 ? `${props.description.slice(0, 200)} ...` : props.description}</p>
        </div>
    </div>
);

const Footer: FC<TFooter> = props => (
    <div className={styles.footer}>
        <div className={styles.row}>
            <div className={styles.infoWrapper}>
                <p>Bug-{props.index}</p>
                <GrTextAlignFull />
                <BsCalendar2Week />
                <p>{props.issue.createdDate}</p>
                <GoIssueOpened color={props.color} />
            </div>
            <div className={styles.controlWrapper}>
                <BsPen
                    onClick={() =>
                        props.handleEdit(
                            props.issue.id,
                            props.issue.name,
                            props.issue.description,
                            props.issue.priority
                        )
                    }
                />
                <GiCheckMark onClick={() => props.handleComplete(props.issue.id, props.issue.name)} />
                <AiOutlineDelete
                    onClick={() => props.handleDelete(props.issue.id, props.issue.name, props.issue.createdDate)}
                />
            </div>
        </div>
    </div>
);

export default function Issues({ content, edit, complete, remove }: any) {
    const returnIssues = () =>
        content &&
        content.map((issueProps: TIssue, index: number) => {
            let color;
            switch (issueProps.priority) {
                case 'high':
                    color = '#b07a83';
                    break;
                case 'medium':
                    color = '#f7e3af';
                    break;
                default:
                    color = '#a3b09a';
            }

            return (
                <li key={issueProps.id} className={styles.issue}>
                    <Header name={issueProps.name} />
                    <Body description={issueProps.description} />
                    <Footer
                        index={index}
                        color={color}
                        issue={issueProps}
                        handleEdit={edit}
                        handleComplete={complete}
                        handleDelete={remove}
                    />
                </li>
            );
        });

    return returnIssues();
}

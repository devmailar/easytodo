import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCalendar2Week, BsPen } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { GoIssueOpened } from "react-icons/go";
import { GrTextAlignFull } from "react-icons/gr";
import styles from "./styles/Issues.module.css";

const Header = (props) => (
  <div className={styles.header}>
    <h2>{props.title}</h2>
  </div>
);

const Body = ({ description }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const shortDescription = description.slice(0, 200);
  const showButton = description.length > 200;

  return (
    <div className={styles.body}>
      <p>
        {showFullDescription ? description : shortDescription}

        {showButton && (
          <button onClick={() => setShowFullDescription(!showFullDescription)}>
            {showFullDescription ? "show less" : "show more"}
          </button>
        )}
      </p>
    </div>
  );
};

const Footer = (props) => (
  <div className={styles.footer}>
    <div className={styles.row}>
      <div className={styles.infoWrapper}>
        <p>Bug {props.index}</p>
        <GrTextAlignFull />
        <BsCalendar2Week />
        <p>{props.issue.created}</p>
        <GoIssueOpened color={props.color} />
      </div>
      <div className={styles.controlWrapper}>
        <BsPen onClick={() => props.handleEdit(props.issue)} />
        <GiCheckMark onClick={() => props.handleComplete(props.issue)} />
        <AiOutlineDelete onClick={() => props.handleDelete(props.issue)} />
      </div>
    </div>
  </div>
);

export default function Issues({
  content,
  editIssue,
  completeIssue,
  deleteIssue,
}) {
  const returnIssues = () =>
    content &&
    content.map((issueProps, index) => {
      let color;
      switch (issueProps.priority) {
        case "high":
          color = "#b07a83";
          break;
        case "medium":
          color = "#f7e3af";
          break;
        default:
          color = "#a3b09a";
      }

      return (
        <li key={index} className={styles.issue}>
          <Header title={issueProps.title} />
          <Body description={issueProps.description} />
          <Footer
            index={index}
            color={color}
            issue={issueProps}
            handleEdit={(d) => {
              editIssue(d);
            }}
            handleComplete={completeIssue}
            handleDelete={deleteIssue}
          />
        </li>
      );
    });

  return returnIssues();
}

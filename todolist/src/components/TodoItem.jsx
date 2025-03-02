import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import "./TodoItem.css";

const TodoItem = ({
  id,
  isDone,
  content,
  date,
  onUpdate,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const inputRef = useRef(null);

  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onRightClickDelete = (e) => {
    e.preventDefault();
    onDelete(id);
  };

  const onChangeEditContent = (e) => {
    setEditContent(e.target.value);
  };

  const onToggleEdit = () => {
    if (isEditing && editContent.trim() !== "") {
      onEdit(id, editContent);
    }
    setIsEditing(!isEditing);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onToggleEdit();
    }
  };

  const onBlur = () => {
    if (isEditing) {
      onToggleEdit();
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="todoItem" onContextMenu={onRightClickDelete}>
      {isEditing ? (
        <input
          className="editing"
          ref={inputRef}
          type="text"
          value={editContent}
          onChange={onChangeEditContent}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      ) : (
        <div
          className={isDone ? "content done" : "content"}
          onClick={onChangeCheckbox}
        >
          {content}
        </div>
      )}

      <div className="date">{new Date(date).toLocaleDateString()}</div>

      <button onClick={onToggleEdit}>
        <FontAwesomeIcon icon={isEditing ? faCircleCheck : faPen} />
      </button>
    </div>
  );
};

export default TodoItem;

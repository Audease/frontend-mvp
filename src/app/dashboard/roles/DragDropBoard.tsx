import React from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

export default function DragDropBoard() {
  const todoItems = [
    "Schedule perm",
    "Rewind VHS tapes",
    "Make change for the arcade",
    "Get disposable camera developed",
    "Learn C++",
    "Return Nintendo Power Glove",
  ];

  const doneItems = [];

  const [todoList, todos] = useDragAndDrop<HTMLUListElement, string>(todoItems, {
    group: "todoList",
  });

  const [doneList, dones] = useDragAndDrop<HTMLUListElement, string>(doneItems, {
    group: "todoList",
  });

  return (
    <div className="kanban-board" style={styles.board}>
      <div className="kanban-column" style={styles.column}>
        <h2>Todo</h2>
        <ul ref={todoList} style={styles.list}>
          {todos.map((todo) => (
            <li className="kanban-item" key={todo} style={styles.card}>
              {todo}
            </li>
          ))}
        </ul>
      </div>
      <div className="kanban-column" style={styles.column}>
        <h2>Done</h2>
        <ul ref={doneList} style={styles.list}>
          {dones.map((done) => (
            <li className="kanban-item" key={done} style={styles.card}>
              {done}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  board: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  column: {
    flex: 1,
    margin: '0 10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  card: {
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  },
};

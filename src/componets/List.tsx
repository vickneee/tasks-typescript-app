import {type Task} from "../types";

type ListProps = {
    tasks: Task[];
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
};

function List({tasks, toggleTask, deleteTask}: ListProps) {
    return (
        <ul className="list">
            {tasks.map((task) => (
                <li key={task.id} className="list-item">
                <span className={task.isCompleted ? "completed" : ""}>
                    {task.description}
                </span>
                    <div className="sub-list">
                        <input type="checkbox"
                               checked={task.isCompleted}
                               onChange={() => toggleTask(task.id)}/>
                        <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default List;
import {useState, useEffect} from 'react'
import Form from "./componets/Form.tsx";
import List from "./componets/List.tsx";
import {type Task} from "./types.ts";

function loadTasks(): Task[] {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function updateStorage(tasks: Task[]) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function App() {
    const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
    };

    const toggleTask = (id: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? {...task, isCompleted: !task.isCompleted} : task
            )
        );
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", JSON.stringify(newMode));
        if (newMode) {
            document.body.style.backgroundColor = "#333";
        } else {
            document.body.style.backgroundColor = "#fff";
        }
    }

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    useEffect(() => {
        updateStorage(tasks);
    }, [tasks]);

    return (
        <section>
            <button className="btn-dark" onClick={toggleDarkMode}>
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <Form addTask={addTask}/>
            <List tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask}/>
        </section>
    )
}

export default App

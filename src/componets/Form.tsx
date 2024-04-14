import React, {useState} from "react";
import {type Task} from "../types";

// Define the props for the Form component
type FormProps = {
    addTask: (task: Task) => void;
};

function Form( {addTask}: FormProps) {
    const [text, setText] = useState<string>("");

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text) {
            alert("Please enter a task")
            return;
        }
        // Add task
        addTask({
            id: new Date().getTime().toString(),
            description: text,
            isCompleted: false
        });
        setText("");
        // console.log(text)
    };

    return (
        <form className="form task-form mt-9" onSubmit={handleSubmit}>
            <input type="text"
                   className="form-input"
                   value={text}
                   onChange={(e) => setText(e.target.value)}/>
            <button type='submit' className='btn'>
                add task
            </button>
        </form>
    )
}

export default Form;
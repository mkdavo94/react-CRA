import React, { useState, useEffect } from 'react'
import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'
import { ITodo } from '../interfaces'

declare var confirm: (question: string) => boolean

export const TodosPage: React.FC = () => {
    console.log(555);
    const [todos, setTodos] = useState<ITodo[]>(() => {
        console.log(666);
        return JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
    });


    useEffect(() => {
        console.log(444, todos && JSON.stringify(todos));
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);

    const addHandler = (title: string) => {
        const newTodo: ITodo = {
            title: title,
            id: Date.now(),
            completed: false
        };
        // setTodos([newTodo, ...todos])
        setTodos(prev => [newTodo, ...prev])
    };

    // const toggleHandler = (id: number) => {
    //     setTodos(prev =>
    //         prev.map(todo => {
    //             if (todo.id === id) {
    //                 todo.completed = !todo.completed
    //             }
    //             console.log(777, JSON.stringify(todo));
    //             return {...todo}
    //         })
    //     )
    // };
    const toggleHandler = (id: number) => {
        setTodos(prev =>
            prev.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo
            }))
    }
    const removeHandler = (id: number) => {
        const shoudRemove = confirm('Вы уверены, что хотите удалить элемент?')
        if (shoudRemove) {
            setTodos(prev => prev.filter(todo => todo.id !== id))
        }
    };

    return (
        <React.Fragment>
            <TodoForm onAdd={addHandler} />

            <TodoList
                todos={todos}
                onToggle={toggleHandler}
                onRemove={removeHandler}
            />
        </React.Fragment>
    )
}
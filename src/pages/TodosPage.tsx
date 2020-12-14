import React, {useState, useEffect} from 'react'
import {TodoForm} from '../components/TodoForm'
import {TodoList} from '../components/TodoList'
import {ITodo} from '../interfaces'
import useLocalStorage from '../hooks/useLocalStorage'

declare var confirm: (question: string) => boolean

export const TodosPage: React.FC = () => {
    console.log(555);
    const [todos, setTodos] = useLocalStorage<ITodo[]>('todos', []);


    const addHandler = (title: string) => {
        const newTodo: ITodo = {
            title: title,
            id: Date.now(),
            completed: false
        };
        setTodos((prev: ITodo[]) => [newTodo, ...prev])
    };
    const toggleHandler = (id: number) => {
        setTodos((prev: ITodo[]) =>
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
            setTodos((prev: ITodo[]) => prev.filter(todo => todo.id !== id))
        }
    };

    return (
        <React.Fragment>
            <TodoForm onAdd={addHandler}/>

            <TodoList
                todos={todos}
                onToggle={toggleHandler}
                onRemove={removeHandler}
            />
        </React.Fragment>
    )
}
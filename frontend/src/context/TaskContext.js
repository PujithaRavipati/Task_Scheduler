import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import taskReducer from '../reducers/taskReducer';


export const TaskContext = createContext();

const initialState = {
  tasks: [],
  currentTask: null,
  loading: true,
  error: null
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const getTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');

      dispatch({
        type: 'GET_TASKS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response.data.message
      });
    }
  };

  const getTask = async (id) => {
    try {
      const res = await axios.get(`/api/tasks/${id}`);

      dispatch({
        type: 'GET_TASK',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response.data.message
      });
    }
  };

  const createTask = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/tasks', formData, config);

      dispatch({
        type: 'CREATE_TASK',
        payload: res.data.data
      });

      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response.data.message
      });
      throw err;
    }
  };
  const updateTask = async (id, formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/tasks/${id}`, formData, config);

      dispatch({
        type: 'UPDATE_TASK',
        payload: res.data.data
      });

      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response.data.message
      });
      throw err;
    }
  };

  const updateTaskStatus = async (id, status) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/tasks/${id}/status`, { status }, config);

      dispatch({
        type: 'UPDATE_TASK',
        payload: res.data.data
      });

      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response.data.message
      });
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);

      dispatch({
        type: 'DELETE_TASK',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Error deleting task'
      });
      throw err;
    }
  };

  const clearCurrentTask = () => {
    dispatch({ type: 'CLEAR_CURRENT_TASK' });
  };

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        currentTask: state.currentTask,
        loading: state.loading,
        error: state.error,
        getTasks,
        getTask,
        createTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
        clearCurrentTask,
        clearErrors
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
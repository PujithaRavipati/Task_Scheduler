import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TaskContext } from '../context/TaskContext';
import { toast } from 'react-toastify';

const TaskForm = () => {
  const { createTask, updateTask, getTask, currentTask, clearCurrentTask, error } = useContext(TaskContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium',
    status: 'pending',
    reminder: null
  });

  useEffect(() => {
    if (isEditMode) {
      getTask(id);
    } else {
      clearCurrentTask();
    }

    return () => clearCurrentTask();
  }, [id]);

  useEffect(() => {
    if (currentTask && isEditMode) {
      setFormData({
        title: currentTask.title,
        description: currentTask.description || '',
        dueDate: new Date(currentTask.dueDate),
        priority: currentTask.priority,
        status: currentTask.status,
        reminder: currentTask.reminder ? new Date(currentTask.reminder) : null
      });
    }
  }, [currentTask, isEditMode]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const { title, description, dueDate, priority, status, reminder } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!title || !dueDate) {
      toast.error('Please provide a title and due date');
      return;
    }

    const taskData = {
      title,
      description,
      dueDate,
      priority,
      status,
      reminder
    };

    if (isEditMode) {
      updateTask(id, taskData)
        .then(() => {
          toast.success('Task updated successfully');
          navigate('/');
        })
        .catch(() => {});
    } else {
      createTask(taskData)
        .then(() => {
          toast.success('Task created successfully');
          navigate('/');
        })
        .catch(() => {});
    }
  };

  return (
    <div className="task-form-container">
      <h1 className="page-title">
        {isEditMode ? (
          <>
            <FaEdit className="icon" /> Edit Task
          </>
        ) : (
          <>
            <FaPlus className="icon" /> Create New Task
          </>
        )}
      </h1>

      <form onSubmit={onSubmit}>
        <div className="task-form-group">
          <label htmlFor="title" className="task-form-label">
            Title *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={onChange}
            required
            className="task-form-input"
            placeholder="Enter task title"
          />
        </div>

        <div className="task-form-group">
          <label htmlFor="description" className="task-form-label">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={onChange}
            className="task-form-textarea"
            placeholder="Enter task description"
          ></textarea>
        </div>

        <div className="grid">
          <div className="task-form-group">
            <label htmlFor="dueDate" className="task-form-label">
              Due Date *
            </label>
            <DatePicker
              selected={dueDate}
              onChange={date => onDateChange(date, 'dueDate')}
              className="task-form-input"
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
              required
            />
          </div>

          <div className="task-form-group">
            <label htmlFor="reminder" className="task-form-label">
              Reminder (Optional)
            </label>
            <DatePicker
              selected={reminder}
              onChange={date => onDateChange(date, 'reminder')}
              className="task-form-input"
              dateFormat="MMMM d, yyyy h:mm aa"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              minDate={new Date()}
              placeholderText="Select reminder date and time"
              isClearable
            />
          </div>
        </div>

        <div className="grid">
          <div className="task-form-group">
            <label htmlFor="priority" className="task-form-label">
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              value={priority}
              onChange={onChange}
              className="task-form-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {isEditMode && (
            <div className="task-form-group">
              <label htmlFor="status" className="task-form-label">
                Status
              </label>
              <select
                name="status"
                id="status"
                value={status}
                onChange={onChange}
                className="task-form-select"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}
        </div>

        <div className="task-form-actions">
          <Link to="/" className="btn btn-dark">
            <FaTimes /> Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            <FaSave /> {isEditMode ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
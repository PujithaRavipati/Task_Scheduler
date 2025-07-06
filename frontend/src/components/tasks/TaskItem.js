import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { TaskContext } from '../../context/TaskContext';
import { toast } from 'react-toastify';

const TaskItem = ({ task }) => {
  const { deleteTask, updateTaskStatus } = useContext(TaskContext);

  const { _id, title, description, dueDate, priority, status } = task;

  const onDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(_id);
        toast.success('Task deleted successfully');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error deleting task');
      }
    }
  };

  const onComplete = () => {
    updateTaskStatus(_id, 'completed')
      .then(() => {
        toast.success('Task marked as completed');
      })
      .catch(err => {
        toast.error(err.response.data.message || 'Error updating task status');
      });
  };

  return (
    <div className={`task-card priority-${priority}`}>
      <div className="task-card-header">
        <h3 className="task-card-title">{title}</h3>
        <span className={`task-card-priority ${priority}`}>{priority}</span>
      </div>
      <p className="task-card-date">
        Due: {format(new Date(dueDate), 'MMM dd, yyyy')}
      </p>
      <p className="task-card-description">
        {description && description.length > 100
          ? `${description.substring(0, 100)}...`
          : description}
      </p>
      <div className="task-card-footer">
        <span className={`task-card-status ${status}`}>{status}</span>
        <div className="task-card-actions">
          {status !== 'completed' && (
            <button
              onClick={onComplete}
              className="btn btn-success btn-sm"
              title="Mark as Completed"
            >
              <FaCheck />
            </button>
          )}
          <Link
            to={`/tasks/edit/${_id}`}
            className="btn btn-primary btn-sm"
            title="Edit Task"
          >
            <FaEdit />
          </Link>
          <button
            onClick={onDelete}
            className="btn btn-danger btn-sm"
            title="Delete Task"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
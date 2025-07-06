import React, { useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FaArrowLeft, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { TaskContext } from '../context/TaskContext';
import { toast } from 'react-toastify';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTask, currentTask, loading, deleteTask, updateTaskStatus } = useContext(TaskContext);

  useEffect(() => {
    getTask(id);
  }, [id]);

  const onDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        toast.success('Task deleted successfully');
        navigate('/');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error deleting task');
      }
    }
  };

  const onComplete = () => {
    updateTaskStatus(id, 'completed')
      .then(() => {
        toast.success('Task marked as completed');
      })
      .catch(err => {
        toast.error(err.response.data.message || 'Error updating task status');
      });
  };

  if (loading || !currentTask) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  const { title, description, dueDate, priority, status, reminder, createdAt } = currentTask;

  return (
    <div className="task-details-container">
      <div className="task-details-header">
        <h1 className="task-details-title">{title}</h1>
        <div>
          <Link to="/" className="btn btn-dark">
            <FaArrowLeft /> Back to Tasks
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="task-details-meta">
          <div className="task-details-meta-item">
            <span className="task-details-meta-label">Priority</span>
            <span className={`task-card-priority ${priority}`}>{priority}</span>
          </div>
          <div className="task-details-meta-item">
            <span className="task-details-meta-label">Status</span>
            <span className={`task-card-status ${status}`}>{status}</span>
          </div>
          <div className="task-details-meta-item">
            <span className="task-details-meta-label">Due Date</span>
            <span className="task-details-meta-value">
              {format(new Date(dueDate), 'MMMM dd, yyyy')}
            </span>
          </div>
          {reminder && (
            <div className="task-details-meta-item">
              <span className="task-details-meta-label">Reminder</span>
              <span className="task-details-meta-value">
                {format(new Date(reminder), 'MMMM dd, yyyy h:mm a')}
              </span>
            </div>
          )}
          <div className="task-details-meta-item">
            <span className="task-details-meta-label">Created</span>
            <span className="task-details-meta-value">
              {format(new Date(createdAt), 'MMMM dd, yyyy')}
            </span>
          </div>
        </div>

        <div className="task-details-description">
          <h3>Description</h3>
          <p>{description || 'No description provided.'}</p>
        </div>

        <div className="task-details-actions">
          {status !== 'completed' && (
            <button onClick={onComplete} className="btn btn-success">
              <FaCheck /> Mark as Completed
            </button>
          )}
          <Link to={`/tasks/edit/${id}`} className="btn btn-primary">
            <FaEdit /> Edit Task
          </Link>
          <button onClick={onDelete} className="btn btn-danger">
            <FaTrash /> Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
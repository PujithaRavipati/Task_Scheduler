import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { TaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';
import TaskItem from '../components/tasks/TaskItem';

const Dashboard = () => {
  const { tasks, getTasks, loading } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    search: ''
  });

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (tasks) {
      let filtered = [...tasks];

      if (filter.status !== 'all') {
        filtered = filtered.filter(task => task.status === filter.status);
      }

      if (filter.priority !== 'all') {
        filtered = filtered.filter(task => task.priority === filter.priority);
      }

      if (filter.search) {
        filtered = filtered.filter(
          task =>
            task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
            (task.description &&
              task.description.toLowerCase().includes(filter.search.toLowerCase()))
        );
      }

      setFilteredTasks(filtered);
    }
  }, [tasks, filter]);

  const handleFilterChange = e => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Tasks</h1>
        <Link to="/tasks/new" className="btn btn-primary">
          <FaPlus className="icon" /> Add New Task
        </Link>
      </div>

      <div className="dashboard-filters">
        <div className="dashboard-filter-item">
          <input
            type="text"
            name="search"
            placeholder="Search tasks..."
            className="form-control"
            value={filter.search}
            onChange={handleFilterChange}
          />
        </div>
        <div className="dashboard-filter-item">
          <select
            name="status"
            className="form-control"
            value={filter.status}
            onChange={handleFilterChange}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="dashboard-filter-item">
          <select
            name="priority"
            className="form-control"
            value={filter.priority}
            onChange={handleFilterChange}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="dashboard-empty">
          <h3>No tasks found</h3>
          <p>
            {tasks.length === 0
              ? 'You have no tasks yet. Create a new task to get started!'
              : 'No tasks match your current filters.'}
          </p>
          {tasks.length === 0 && (
            <Link to="/tasks/new" className="btn btn-primary mt-3">
              <FaPlus className="icon" /> Create Your First Task
            </Link>
          )}
        </div>
      ) : (
        <div className="dashboard-tasks-grid">
          {filteredTasks.map(task => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
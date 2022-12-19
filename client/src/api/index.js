import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
})

// Auth
export const registerUser = ({ firstName, lastName, email, password }) =>
  api.post('/register', {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
  })

export const loginUser = ({ email, password }) =>
  api.post('/login', {
    email,
    password,
  })

export const getUser = () => api.get('/user')

export const getSpecificUser = (userId) => api.get(`/users/${userId}`)

export const logoutUser = () => api.post('/logout')

// Users
export const getUsers = () => api.get('/users')

export const deleteUser = (userId) => api.delete(`/users/${userId}`)

export const updateUser = (userId, first_name, last_name) =>
  api.patch(`/users/${userId}`, {
    first_name,
    last_name,
  })

// Projects
export const createProject = ({ pmid, projectName, description, endingDate }) =>
  api.post('/projects', {
    pmid,
    projectName,
    description,
    endingDate,
  })

export const addUserToProject = (projectId, userId) =>
  api.post(`/projects/${projectId}/users/${userId}`)

export const getProjects = () => api.get('/projects')

export const getAllSprints = (projectId) =>
  api.get(`projects/${projectId}/sprints`)

export const getProject = (projectId) => api.get(`projects/${projectId}`)

export const getAllSprintTasks = (projectId, sprintId) =>
  api.get(`projects/${projectId}/sprints/${sprintId}/tasks`)

export const getProjectUsers = (projectId) =>
  api.get(`/projects/${projectId}/users`)

export const deleteProject = (projectId) => api.delete(`/projects/${projectId}`)

// Sprints
export const createSprint = (projectId, startDate, stopDate, interval) =>
  api.post(`/projects/${projectId}/sprints`, {
    project_id: projectId,
    startDate,
    stopDate,
    interval,
  })

export const getSpecificSprint = (projectId, sprintId) =>
  api.get(`projects/${projectId}/sprints/${sprintId}`)

// Tasks
export const createTask = (projectId, sprintId, userId, description) =>
  api.post(`/projects/${projectId}/sprints/${sprintId}/tasks`, {
    description,
    status: 'to do',
    user_id: userId,
    sprint_id: sprintId,
  })

export const updateStatus = (projectId, sprintId, taskId, status) =>
  api.patch(`projects/${projectId}/sprints/${sprintId}/tasks/${taskId}`, {
    status,
  })

export const deleteTask = (projectId, sprintId, taskId) =>
  api.delete(`/projects/${projectId}/sprints/${sprintId}/tasks/${taskId}`)

// Trophies
export const getStats = () => api.get('/trophy')

export const getTrophy = (userId) => api.get(`/trophy/${userId}`)

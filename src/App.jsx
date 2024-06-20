import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Comments from './pages/Comments'
import SingleUser from './pages/SingleUser'
import Users from './pages/Users'
import AdminRoute from './components/AdminRoute'
import Posts from './pages/Posts'
import Blogs from './pages/ManageBlog/Blogs'
import CreateBlog from './pages/ManageBlog/CreateBlog'
import EditBlog from './pages/ManageBlog/EditBlog'
import Challenge from './pages/ManageChallenges/Challenge'
import CreateChallenge from './pages/ManageChallenges/CreateChallenge'
import EditChallenge from './pages/ManageChallenges/EditChallenge'
import Adverts from './pages/ManageAdverts/Adverts'
import SingleAdvert from './pages/ManageAdverts/SingleAdvert'
import AllPlans from './pages/Plans/AllPlans'
import NewPlan from './pages/Plans/NewPlan'
import EditPlan from './pages/Plans/EditPlan'
import SendNotification from './pages/SendNotification'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<AdminRoute><Home /></AdminRoute>} />
        <Route path='/comments' element={<AdminRoute><Comments /></AdminRoute>} />
        <Route path='/users' element={<AdminRoute><Users /></AdminRoute>} />
        <Route path='/users/:id' element={<AdminRoute><SingleUser /></AdminRoute>} />
        <Route path='/posts' element={<AdminRoute><Posts /></AdminRoute>} />
        <Route path='/blogs' element={<AdminRoute><Blogs /></AdminRoute>} />
        <Route path='/blogs/new' element={<AdminRoute><CreateBlog /></AdminRoute>} />
        <Route path='/blogs/:id/edit' element={<AdminRoute><EditBlog /></AdminRoute>} />
        <Route path='/challenges' element={<AdminRoute><Challenge /></AdminRoute>} />
        <Route path='/challenges/new' element={<AdminRoute><CreateChallenge /></AdminRoute>} />
        <Route path='/challenges/:id/edit' element={<AdminRoute><EditChallenge /></AdminRoute>} />
        <Route path='/adverts' element={<AdminRoute><Adverts /></AdminRoute>} />
        <Route path='/adverts/:id' element={<AdminRoute><SingleAdvert /></AdminRoute>} />
        <Route path='/plans' element={<AdminRoute><AllPlans /></AdminRoute>} />
        <Route path='/plans/new' element={<AdminRoute><NewPlan /></AdminRoute>} />
        <Route path='/plans/:id/edit' element={<AdminRoute><EditPlan /></AdminRoute>} />
        <Route path='/notifications' element={<AdminRoute><SendNotification /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './App'
import EpisodeProvidrer from './context/EpisodeContext'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster
      position="top-left"
      reverseOrder={false}
    />
    <EpisodeProvidrer>
      <RouterProvider router={router} />
    </EpisodeProvidrer>
  </React.StrictMode>,
)

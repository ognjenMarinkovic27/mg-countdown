import './App.css';

import LectureCountdown from './LectureCountdown/LectureCountdown';
import MessageWall from './MessageWall/MessageWall';
import ErrorPage from './ErrorPage/error-page';
import SetMessage from './SetMessage/SetMessage';
import SetLecture from './SetLecture/SetLecture';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AdminPage from './AdminPage/AdminPage';
import LoginPage from './LoginPage/LoginPage';

import { useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import SessionContext from './SessionContext/SessionContext';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/message' />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/countdown",
    element: <LectureCountdown />,
  
  },
  {
    path: '/message',
    element: <MessageWall />
  },
  {
    path: '/setMessage',
    element: <SetMessage/>
  },
  {
    path: '/setLecture',
    element: <SetLecture/>
  },
  {
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: '/login',
    element: <LoginPage/>
  }
]);



function App() {

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      console.log(session);
    })


    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="App">
      <SessionContext.Provider value={{ session, setSession }}>
        <RouterProvider router={router} />
      </SessionContext.Provider>
    </div>
  );
}

export default App;

import { useContext } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthContext } from 'src/context/authContext';
import { Page404 } from 'src/modules/errors/Page404';
import HomePage from 'src/modules/Home';
import EditPoll from 'src/modules/polls/EditPoll';
import PollPage from 'src/modules/polls/Poll';
import PollsPage from 'src/modules/polls/Polls';
import Results from 'src/modules/results';
import TemplatesPage from 'src/modules/templates/Templates';
import UsersPage from 'src/modules/Users';

import LogInForm from '../components/forms/LogInForm';
import SignUpForm from '../components/forms/SignUpForm';
import PrivateRoute from '../components/PrivateRoute';

const Routing = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <main>
      <Routes>
        <Route
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
          path="/"
        />
        <Route
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
          path="/users"
        />
        <Route
          element={
            <PrivateRoute>
              <PollsPage />
            </PrivateRoute>
          }
          path="/polls"
        />
        <Route
          element={
            <PrivateRoute>
              <EditPoll />
            </PrivateRoute>
          }
          path="/polls/new"
        />
        <Route
          element={
            <PrivateRoute>
              <EditPoll />
            </PrivateRoute>
          }
          path="/polls/:templateId/new"
        />
        <Route
          element={
            <PrivateRoute>
              <EditPoll />
            </PrivateRoute>
          }
          path="/polls/:pollId/edit"
        />
        <Route
          element={
            <PrivateRoute>
              <TemplatesPage />
            </PrivateRoute>
          }
          path="/templates"
        />
        <Route
          element={
            <PrivateRoute>
              <EditPoll />
            </PrivateRoute>
          }
          path="/templates/new"
        />
        <Route element={<PollPage />} path="/polls/:pollId" />
        <Route
          element={
            <PrivateRoute>
              <EditPoll />
            </PrivateRoute>
          }
          path="/templates/:templateId/edit"
        />
        <Route
          element={
            <PrivateRoute>
              <Results />
            </PrivateRoute>
          }
          path="/results/:pollId"
        />
        <Route
          element={
            <PrivateRoute>
              <Results />
            </PrivateRoute>
          }
          path="/results"
        />
        <Route
          element={
            !isAuthenticated ? <LogInForm /> : <Navigate replace to="/" />
          }
          path="/auth/login"
        />
        <Route
          element={
            !isAuthenticated ? <LogInForm /> : <Navigate replace to="/" />
          }
          path="/auth/login/redirect/:pollId"
        />
        <Route
          element={
            !isAuthenticated ? <SignUpForm /> : <Navigate replace to="/" />
          }
          path="/auth/signup"
        />
        <Route
          element={
            !isAuthenticated ? <SignUpForm /> : <Navigate replace to="/" />
          }
          path="/auth/signup/redirect/:pollId"
        />
        <Route element={<Page404 />} path="/:page" />
      </Routes>
    </main>
  );
};
export default Routing;

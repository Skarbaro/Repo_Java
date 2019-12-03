import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { withUser } from '../../hocs'

import { Preloader } from '..'

const PublicHomePage = lazy(() => import('../PublicHomePage'));
const HomePage = lazy(() => import('../HomePage'));
const SignInPage = lazy(() => import('../SignInPage'));
const SignUpPage = lazy(() => import('../SignUpPage'));

const Routes = ({ user }) => (
  <Suspense fallback={<Preloader />}>
    <Switch>
      <Route exact path='/' render={() => (
        user ? <Redirect to='/manager' /> : <PublicHomePage />
      )} />
      <Route path='/manager' render={() => (
        user ? <HomePage /> : <Redirect to='/' />
      )} />
      <Route path='/sign_in' render={() => (
        user ? <Redirect to='/' /> : <SignInPage />
      )} />
      <Route path='/sign_up' render={() => (
        user ? <Redirect to='/' /> : <SignUpPage />
      )} />
    </Switch>
  </Suspense>
);

export default withUser(Routes)

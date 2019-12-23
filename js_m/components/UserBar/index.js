import React from 'react'

import { withUser } from '../../hocs'

const UserBar = ({ user }) => (
  <div className='user-view'>
    <a href='#!' ><span className='black-text name'>{user.username}</span></a>
    <a href='#!' ><span className='black-text email'>{user.email}</span></a>
  </div>
);

export default withUser(UserBar)

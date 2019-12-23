import React from 'react'
import { connect } from 'react-redux'

const withUser = Component => {
  class WithUser extends React.Component {
    render() {
      return <Component {...this.props} />
    }
  }

  const mapStateToProps = ({ userState }) => ({
    user: userState
  });

  return connect(mapStateToProps)(WithUser)
};

export default withUser

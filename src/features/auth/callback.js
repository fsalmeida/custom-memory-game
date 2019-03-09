import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CallbackComponent } from 'redux-oidc'
import { push } from 'connected-react-router'
import userManager from './userManager'

const Callback = ({ redirect }) => (
  <CallbackComponent
    userManager={userManager}
    successCallback={redirect}
    errorCallback={error => {
      console.error(error)
    }}
  >
    <div>Redirecting...</div>
  </CallbackComponent>
)

Callback.propTypes = {
  redirect: PropTypes.func.isRequired
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  redirect: () => dispatch(push('/'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Callback)

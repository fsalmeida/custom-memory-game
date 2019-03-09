import createUserManager from './createUserManager'

const config = {
  authority: `${
    process.env.REACT_APP_AUTH_ENDPOINT
    }/.well-known/openid-configuration`,
  client_id: process.env.REACT_APP_CLIENT_ID,
  scope: 'openid',
  response_type: 'id_token',
  //redirect_uri:'https://localhost'
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
    }/auth/callback`
}

export default createUserManager(config)

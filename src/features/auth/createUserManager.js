import { UserManager, Log, MetadataService } from 'oidc-client'

class ADMetadataService extends MetadataService {
    getUrllogout() {
        const url = super.getMetadata().then(metadata => {
            const urllogout = metadata.authorization_endpoint.replace(
                '/oauth2/authorize',
                ''
            )

            return Promise.resolve(
                `${urllogout}/logout?client_id=${
                this._settings._client_id
                }&response_type=token&redirect_uri=${this._settings._redirect_uri}`
            )
        })

        return url
    }

    getEndSessionEndpoint() {
        console.log(this.getUrllogout())
        return Promise.resolve(this.getUrllogout())
    }
}

class ADUserManager extends UserManager {
    _signinStart(args, navigator, navigatorParams = {}) {
        Log.debug('_signinStart for AD')

        return navigator.prepare(navigatorParams).then(handle => {
            Log.debug('got navigator window handle')

            return this.createSigninRequest(args)
                .then(signinRequest => {
                    Log.debug('got signin request')

                    navigatorParams.url = signinRequest.url.replace('%20id_token', '')
                    navigatorParams.id = signinRequest.state.id

                    return handle.navigate(navigatorParams)
                })
                .catch(err => {
                    if (handle.close) {
                        Log.debug(
                            'Error after preparing navigator, closing navigator window'
                        )
                        handle.close()
                    }
                    throw err
                })
        })
    }
}

const createUserManager = settings =>
  new ADUserManager({
    ...settings,
    MetadataServiceCtor: ADMetadataService
  })

export default createUserManager

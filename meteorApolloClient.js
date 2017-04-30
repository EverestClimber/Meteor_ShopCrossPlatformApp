import { createNetworkInterface, createBatchingNetworkInterface } from 'apollo-client'
import Meteor from 'react-native-meteor'

// default network interface configuration object
const defaultNetworkInterfaceConfig = {
  // default graphql server endpoint: ROOT_URL/graphql
  // ex: http://locahost:3000/graphql, or https://www.my-app.com/graphql
  // uri: Meteor.absoluteUrl('graphql'), // no default here. necessary field
  // additional fetch options like `credentials` or `headers`
  opts: {},
  // enable the Meteor User Accounts middleware to identify the user with
  // every request thanks to their login token
  useMeteorAccounts: true,
  // use a BatchingNetworkInterface by default instead of a NetworkInterface
  batchingInterface: true,
  // default batch interval
  batchInterval: 10,
}

// create a pre-configured network interface
export const createMeteorNetworkInterface = (customNetworkInterfaceConfig = {}) => {
  // create a new config object based on the default network interface config
  // defined above and the custom network interface config passed to this function
  const config = {
    ...defaultNetworkInterfaceConfig,
    ...customNetworkInterfaceConfig,
  }

  // this will be true true if a BatchingNetworkInterface is meant to be used
  // with a correct poll interval
  const useBatchingInterface = config.batchingInterface && typeof config.batchInterval === 'number'

  // allow the use of a batching network interface
  const interfaceToUse = useBatchingInterface
    ? createBatchingNetworkInterface
    : createNetworkInterface

  // http://dev.apollodata.com/core/apollo-client-api.html#NetworkInterfaceOptions
  const interfaceArgument = {
    uri: config.uri,
    opts: config.opts,
  }

  // http://dev.apollodata.com/core/network.html#BatchingExample
  if (useBatchingInterface)
    interfaceArgument.batchInterval = config.batchInterval

  // configure the (batching?) network interface with the config defined above
  const networkInterface = interfaceToUse(interfaceArgument)

  // handle the creation of a Meteor User Accounts middleware
  if (config.useMeteorAccounts) {
    try {
      // throw an error if someone tries to specify the login token
      // manually from the client
      if (config.loginToken) {
        throw Error(
          '[Meteor Apollo Integration] The current user is not handled with your ' +
          'GraphQL operations: you are trying to pass a login token to an Apollo ' +
          'Client instance defined client-side. This is only allowed during server-side ' +
          'rendering, please check your implementation.'
        )
      }

      // dynamic middleware function name depending on the interface used
      // const applyMiddlewareFn = useBatchingInterface ? 'applyBatchMiddleware' : 'applyMiddleware'
      const applyMiddlewareFn = 'applyBatchMiddleware'

      // add a middleware handling the current user to the network interface
      networkInterface.use([
        {
          [applyMiddlewareFn](request, next) {
            // get the login token on a per-request basis
            const meteorLoginToken = Meteor.getAuthToken()

            // no token, meaning no user connected, just go to next possible middleware
            if (!meteorLoginToken)
              next()

            // create the header object if needed.
            if (!request.options.headers)
              request.options.headers = {}

            // add the login token to the request headers
            request.options.headers['meteor-login-token'] = meteorLoginToken

            // go to next middleware
            next()
          },
        },
      ])
    } catch (error) {
      // catch the potential error sent by if a login token is manually set client-side
      console.error(error)
    }
  }

  return networkInterface
}

// default Apollo Client configuration object
const defaultClientConfig = {
  // setup ssr mode if the client is configured server-side (ex: for SSR)
  ssrMode: false,
}

// create a new client config object based on the default Apollo Client config
// defined above and the client config passed to this function
export const meteorClientConfig = (networkOptions, customClientConfig = {}) => ({
  // default network interface preconfigured, the network interface key is set
  // there to so that `createMeteorNetworkInterface` is executed only when
  // `meteorClientConfig` is called.
  networkInterface: createMeteorNetworkInterface(networkOptions),
  ...defaultClientConfig,
  ...customClientConfig,
})
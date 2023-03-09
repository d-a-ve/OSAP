import {
  gql,
  GraphQLClient,
} from "graphql-request"

const endpoint = "https://api.cyberconnect.dev"
const graphQLClient = new GraphQLClient(endpoint)

export async function loginGetMessage(
  address: string
) {
  const mutation = gql`
    mutation LoginGetMessage(
      $input: LoginGetMessageInput!
    ) {
      loginGetMessage(input: $input) {
        message
      }
    }
  `

  const variables = {
    input: {
      address,
      domain: "cyberconnect.me",
    },
  }

  try {
    const data: any = await graphQLClient.request(
      mutation,
      variables
    )
    return data.loginGetMessage.message
  } catch (error) {
    console.error(
      JSON.stringify(error, undefined, 2)
    )
  }
}

export async function loginVerify({
  address,
  signature,
}: {
  address: string
  signature: string
}) {
  const mutation = gql`
    mutation LoginVerify(
      $input: LoginVerifyInput!
    ) {
      loginVerify(input: $input) {
        accessToken
        refreshToken
      }
    }
  `

  const variables = {
    input: {
      address,
      domain: "cyberconnect.me",
      signature,
    },
  }

  try {
    const data = await graphQLClient.request(
      mutation,
      variables
    )
    console.log(
      JSON.stringify(data, undefined, 2)
    )
  } catch (error) {
    console.error(
      JSON.stringify(error, undefined, 2)
    )
  }
}

export async function createMetadata() {}

export async function relay() {
  const mutation = gql`
    mutation Relay($input: RelayInput!) {
      relay(input: $input) {
        relayActionId
      }
    }
  `

  const variables = {
    input: {
      typedDataID: null,
      signature: null,
    },
  }

  const requestHeaders = {
    "X-API-KEY":
      "pyOHddcHwjSIa9XVmlgOgiy9wvE6H1ml", // FIXME: should be on server only.
    authorization: "",
  }

  try {
    const data = await graphQLClient.request(
      mutation,
      variables,
      requestHeaders
    )
    console.log(
      JSON.stringify(data, undefined, 2)
    )
  } catch (error) {
    console.error(
      JSON.stringify(error, undefined, 2)
    )
  }
}

export async function relayStatus() {
  const query = gql`
    query RelayActionStatus($relayActionId: ID!) {
      relayActionStatus(
        relayActionId: $relayActionId
      ) {
        ... on RelayActionStatusResult {
          returnData {
            ... on CreateProfileReturnData {
              avatar
              handle
              metadata
              profileID
              to
            }
          }
          txHash
          txStatus
        }
        ... on RelayActionError {
          lastKnownTxHash
          reason
        }
        ... on RelayActionQueued {
          queuedAt
          reason
        }
      }
    }
  `

  const variables = {
    relayActionId: null,
  }

  try {
    const data = await graphQLClient.request(
      query,
      variables
    )
    console.log(
      JSON.stringify(data, undefined, 2)
    )
  } catch (error) {
    console.error(
      JSON.stringify(error, undefined, 2)
    )
  }
}

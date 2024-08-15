import { gql } from 'graphql-request';

/**
 * Function to build a graphql query to retrieve a specific number of pair addresses.
 * @param pairCount Number of pair addresses to retrieve.
 * @returns The query.
 */
export function buildGetPairAddressesQuery(pairCount: number) {
  let queryBody = '';
  let variables = '$contractId: String!';

  for (let i = 0; i < pairCount; i++) {
    variables += `, $ledgerKey${i + 1}: String!`;
    queryBody += `
      pair${i}: entryUpdateByContractIdAndKey(
        contract: $contractId
        ledgerKey: $ledgerKey${i + 1}
        lastN: 1
      ) {
        edges {
          node {
            id
            keyXdr
            valueXdr
          }
        }
      }
`;
  }

  const query = gql`query MyQuery(${variables}) { ${queryBody} }`;
  return query;
}

// Usage:
// const queryForTwoPairs = buildGetPairEntriesQuery(2);
// console.log(queryForTwoPairs);

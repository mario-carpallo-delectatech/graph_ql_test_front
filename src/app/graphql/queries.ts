// queries.ts
import gql from 'graphql-tag';

export const GET_FULL_RESTAURANT = gql`
  query GetRestaurant($uid: ID!) {
    restaurant(uid: $uid) {
      basicData {
        address {
          streetAddress
          numberAddress
          googleStreetAddress
        }
        generalInfo {
          name
          description
          restaurantUidentifier
        }
        geolocation {
          geographicDivision {
            postalCode
            postalCodeUidentifier
          }
          coordinates {
            longitude
            latitude
          }
        }
      }
      commercial {
        contactData {
          website {
            definitive
            google
            tripAdvisor
            guru
          }
          email {
            definitive
            tripAdvisor
            guru
          }
          telephone {
            definitive
            google
            tripAdvisor
            guru
          }
        }
      }
    }
  }
`;
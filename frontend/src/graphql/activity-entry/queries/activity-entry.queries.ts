import { gql } from '@apollo/client';

export const LIST_ACTIVITY_ENTRIES = gql`
  query ActivityEntries {
    activityEntries {
      id
      name
      input
      category {
        name
      }
      createdAt
      spendedAt
    }
  }
`;

export const ACTIVITY_ENTRY_BY_ID = gql`
  query GetActivityEntryById($activityEntryId: Int!) {
    getActivityEntryById(activityEntryId: $activityEntryId) {
      category {
        id
      }
      input
      name
      id
    }
  }
`;

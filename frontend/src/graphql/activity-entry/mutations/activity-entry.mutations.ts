import { gql } from '@apollo/client';

export const CREATE_ACTIVITY_ENTRY = gql`
  mutation CreateActivityEntry($data: InputCreate!) {
    createActivityEntry(data: $data) {
      id
      name
    }
  }
`;

export const UPDATE_ACTIVITY_ENTRY = gql`
  mutation UpdateActivityEntry($data: InputUpdate!, $activityEntryId: Float!) {
    updateActivityEntry(data: $data, activityEntryId: $activityEntryId) {
      id
      name
    }
  }
`;

export const DELETE_ACTIVITY_ENTRY = gql`
  mutation DeleteActivityEntry($activityEntryId: Float!) {
    deleteActivityEntry(activityEntryId: $activityEntryId)
  }
`;

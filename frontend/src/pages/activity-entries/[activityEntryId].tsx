import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { DELETE_ACTIVITY_ENTRY } from '@/graphql/activity-entry/mutations/activity-entry.mutations';
import {
  DeleteActivityEntryMutation,
  DeleteActivityEntryMutationVariables,
  GetActivityEntryByIdQuery,
  GetActivityEntryByIdQueryVariables,
} from '@/graphql/generated/schema';
import { ACTIVITY_ENTRY_BY_ID } from '@/graphql/activity-entry/queries/activity-entry.queries';

export default function ActivityEntryDetails() {
  const router = useRouter();
  const { activityEntryId } = router.query;

  const [deleteActivityEntry] = useMutation<
    DeleteActivityEntryMutation,
    DeleteActivityEntryMutationVariables
  >(DELETE_ACTIVITY_ENTRY);

  const { data } = useQuery<
    GetActivityEntryByIdQuery,
    GetActivityEntryByIdQueryVariables
  >(ACTIVITY_ENTRY_BY_ID, {
    variables: {
      activityEntryId:
        typeof activityEntryId === 'string' ? parseInt(activityEntryId, 10) : 0,
    },
    skip: typeof activityEntryId === 'undefined',
  });

  const activityEntry = data?.getActivityEntryById;

  return (
    <div className='p-24'>
      {typeof activityEntry === 'undefined' ? (
        'Dépense carbone introuvable...'
      ) : (
        <div>
          <div>
            <h1 className='text-3xl'>{activityEntry.name}</h1>
            <p className='text-2xl'>{activityEntry.input} kgCO2e</p>
            <hr></hr>
          </div>

          <div>
            <Link
              href={`/activity-entries/update/${activityEntry.id}`}
              className='flex items-center mt-3 cursor-pointer link link-primary'
            >
              Editer la dépense carbone
            </Link>

            <div
              className='flex items-center mt-3 cursor-pointer link link-primary'
              onClick={() => {
                deleteActivityEntry({
                  variables: { activityEntryId: activityEntry.id },
                })
                  .then(() => {
                    router.push('/activity-entries/list');
                  })
                  .catch(console.error);
              }}
            >
              Supprimer la dépense carbone
            </div>
            <Link
              href={`/activity-entries/list`}
              className='flex items-center mt-3 cursor-pointer link link-primary'
            >
              Retour à la liste des dépenses
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

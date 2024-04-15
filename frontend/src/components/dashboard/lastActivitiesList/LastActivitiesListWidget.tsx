import Typography from '@/components/commons/typography/Typography';
import ActivityEntryWidgetSample from './ActivityEntryWidgetSample';
import { useActivityEntriesQuery } from '@/graphql/generated/schema';

export default function LastActivitiesListWidget() {
  const { data, loading } = useActivityEntriesQuery();

  if (loading) return 'Chargement';
  const lastActivities = data?.activityEntries.slice(0, 12);
  return (
    <div className='dashboardWidget flex flex-col  h-full'>
      <div className='mb-6 flex justify-between align-center'>
        <Typography variant='heading'>Dernières dépenses</Typography>
        <div className='cursor-pointer'>
          <img src='/button-plus.svg' alt='add an activity entry' />
        </div>
      </div>
      <div className='flex flex-col overflow-auto'>
        {lastActivities?.map((entry) => {
          return <ActivityEntryWidgetSample key={entry.id} entryData={entry} />;
        })}
      </div>
    </div>
  );
}

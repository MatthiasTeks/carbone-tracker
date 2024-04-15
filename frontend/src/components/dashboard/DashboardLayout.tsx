import ListBooks from '../example/Book';
import Title from '../example/Title';
import LastActivitiesListWidget from './lastActivitiesList/LastActivitiesListWidget';

export default function DashboardLayout() {
  return (
    <div className='flex h-screen text-black bg-white'>
      <div className='w-[90px]'>nav</div>
      <div className='w-7/12 h-full'>
        <div className='h-[44%]  p-3'>
          <div className='dashboardWidget h-full'>
            <h1>Bienvenue</h1>
            Voici un résumé de vos dépenses mensuelles
            <ListBooks />
            <Title />
          </div>
        </div>
        <div className='h-[28%]  p-3'>
          <div className='dashboardWidget h-full'>Dépenses annuelles</div>
        </div>
        <div className='h-[28%]  p-3'>
          <div className='dashboardWidget h-full'>Derniers posts</div>
        </div>
      </div>
      <div className='w-5/12 p-3  h-full'>
        <LastActivitiesListWidget />
      </div>
    </div>
  );
}

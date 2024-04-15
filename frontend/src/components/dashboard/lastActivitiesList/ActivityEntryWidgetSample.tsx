import Typography from '@/components/commons/typography/Typography';
import { ActivityEntriesQuery } from '@/graphql/generated/schema';
import getDateFormated from '@/utils/dateFormater';

type Props = {
  entryData: ActivityEntriesQuery['activityEntries'][0];
};

export default function ActivityEntryWidgetSample({ entryData }: Props) {
  return (
    <div className='flex justify-between p-2 border border-b-black mb-4'>
      <div>
        <img
          alt={entryData.category.name}
          src={`${entryData.category.name.toLocaleLowerCase()}.svg`}
          width={35}
          height={35}
        />
      </div>
      <div className='flex flex-col w-8/12 items-left '>
        <div>
          <Typography className='poppins-bold text-dark_green text-left'>
            {entryData?.name}
          </Typography>
        </div>
        <div>
          <Typography className='text-xs text-dark_green text-left'>
            {getDateFormated(entryData.createdAt)}
          </Typography>
        </div>
      </div>
      <div className='flex flex-col text-right min-w-[50px]'>
        <div>
          <Typography className='text-medium_blue poppins-bold text-lg'>
            {entryData?.input} Kg
          </Typography>
        </div>
        <div>
          <Typography className='text-medium_blue'>CO2</Typography>
        </div>
      </div>
    </div>
  );
}

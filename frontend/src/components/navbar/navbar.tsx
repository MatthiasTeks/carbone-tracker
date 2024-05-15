import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Typography from '@/components/commons/typography/Typography';
import AddActivityModal from '../modal/AddActivityModal';

export default function navbar() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const navLink = [
    {
      name: 'home',
      link: '/',
      img: '/icons/home-icon.png',
      imgHover: '/icons/home-icon-hover.png',
    },
    {
      name: 'activities',
      link: '/activity-entries/list',
      img: '/icons/co2-icon.png',
      imgHover: '/icons/co2-icon-hover.png',
    },
  ];

  const [hoveredLink, setHoveredLink] = useState('');

  return (
    <>
      <div className='flex items-center justify-center h-screen ml-5 mr-5'>
        <div className='flex flex-col h-[95vh] bg-black text-white w-36 rounded-3xl'>
          <div className='logo flex items-center justify-center relative mt-5'>
            <Link href='/'>
              <svg
                width='100'
                height='100'
                viewBox='0 0 100 100'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='50' cy='50' r='45' fill='white' />
              </svg>
              <img
                src='/icons/logo.png'
                alt='Logo'
                className='logo-image absolute top-11 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-12'
              />
            </Link>
          </div>
          <div className='nav-links flex flex-col flex-grow items-center justify-around pl-6'>
            {navLink.map(({ link, name, img, imgHover }) => (
              <Link
                key={name}
                href={link}
                className={`${router.pathname === link ? 'bg-white rounded-s-full' : ''} nav-link flex justify-around w-full pt-2 pb-2 hover:bg-white hover:rounded-s-full`}
                onMouseEnter={() => setHoveredLink(name)}
                onMouseLeave={() => setHoveredLink('')}
              >
                <img
                  src={`${router.pathname === link || hoveredLink === name ? imgHover : img}`}
                  alt={name}
                  className='w-10 mr-5'
                />
              </Link>
            ))}
            <button
              className={`${isModalOpen ? 'bg-white rounded-s-full' : ''} nav-link flex justify-around w-full pt-2 pb-2 hover:bg-white hover:rounded-s-full`}
              onClick={toggleModal}
              onMouseEnter={() => setHoveredLink('new-activity')}
              onMouseLeave={() => setHoveredLink('')}
            >
              <img
                src={`${isModalOpen || hoveredLink === 'new-activity' ? '/icons/write-icon-hover.png' : '/icons/write-icon.png'}`}
                alt='new-activity'
                className='w-10 mr-5'
              />
            </button>
            <Link
              key='donation'
              href=''
              className={`${router.pathname === '' ? 'bg-white rounded-s-full' : ''} nav-link flex justify-around w-full pt-2 pb-2 hover:bg-white hover:rounded-s-full`}
              onMouseEnter={() => setHoveredLink('donation')}
              onMouseLeave={() => setHoveredLink('')}
            >
              <img
                src={`${router.pathname === '' || hoveredLink === 'donation' ? '/icons/donation-icon-hover.png' : '/icons/donation-icon.png'}`}
                alt={'donation'}
                className='w-10 mr-5'
              />
            </Link>
            <Link
              key='logout'
              href='/auth/login'
              className={`${router.pathname === '/auth/login' ? 'bg-white rounded-s-full' : ''} nav-link flex justify-around w-full pt-2 pb-2 hover:bg-white hover:rounded-s-full`}
              onMouseEnter={() => setHoveredLink('logout')}
              onMouseLeave={() => setHoveredLink('')}
            >
              <img
                src={`${router.pathname === '/auth/login' || hoveredLink === 'logout' ? '/icons/logout-icon-hover.png' : '/icons/logout-icon.png'}`}
                alt={'logout'}
                className='w-10 mr-5'
              />
            </Link>
            <Link
              href='/'
              className='nav-link flex justify-around w-full pt-2 pb-2'
            >
              <label
                tabIndex={0}
                className='btn btn-ghost btn-circle avatar w-full pr-5'
              >
                <div className='w-12 rounded-full'>
                  <img src='/icons/avatar.svg' alt='profil picture' />
                </div>
                <Typography variant='paragraph'>John Doe</Typography>
              </label>
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && <AddActivityModal onClose={toggleModal} />}
      {isModalOpen && <div className='overlay'></div>}
    </>
  );
}

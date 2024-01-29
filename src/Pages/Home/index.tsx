import AnalyticsHome from '@/Components/Home/analytics.home';
import HomeHeader from '@/Components/Home/header.home';
import HomeTopTile from '@/Components/Home/tile.home';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export default function Home() {
  const { vendors, items } = useSelector((state: RootState) => state.data);
  return (
    <main className='home-container'>
      <HomeHeader />
      <HomeTopTile />
      <AnalyticsHome items={items} vendors={vendors} />
    </main>
  );
}

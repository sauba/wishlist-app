import { StatusBar } from 'react-native';

import { Home } from '@/components/Home';

export default function HomeScreen() {

  return (
    <>
      <StatusBar barStyle={`light-content`} backgroundColor={`transparent`} translucent />
      <Home />
    </>
  );
}
import { Image, View } from "react-native";

export default function SplashScreen() {
  return (
    <View>
      <Image source={require('../assets/images/splash.png')} />
    </View>
  )
}
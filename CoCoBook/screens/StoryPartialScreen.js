// screens/PartialScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const images = [
  require('../assets/partial-1.png'),
  require('../assets/partial-2.png'),
  require('../assets/partial-3.png'),
  require('../assets/partial-4.png'),
  require('../assets/partial-5.png'),
];

const StoryPartialScreen = ({ navigation }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [loading, setLoading] = useState(true); // 예시: 로딩 상태

  useEffect(() => {
    if (!loading) {
      setImgIdx(images.length - 1); // partial-5로 고정
      return;
    }
    const interval = setInterval(() => {
      setImgIdx(prev => (prev + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [loading]);

  // 예시: 5초 후 로딩 끝 (실제 로딩 완료 시 setLoading(false) 호출)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.centerImageWrap}>
        <Image source={images[imgIdx]} style={styles.centerImage} />
      </View>
      <Text style={styles.centerText}>부기가 그림을 그리는 중 ...</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StorySuccess')}
      >
        <Text style={styles.buttonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoryPartialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f3c2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
  },
  centerImageWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  centerImage: {
    width: 220,
    height: 260,
    resizeMode: 'contain',
    marginTop: 40,
    marginBottom: 0,
  },
  centerText: {
    fontSize: 18,
    color: '#4B662B',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#9ACA70',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 14,
    marginBottom: 70,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
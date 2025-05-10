import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.characterSection}>
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>오늘은 또 어떤{'\n'}이야기를 만들까??</Text>
        </View>
        <Image
          source={require('../assets/op_PRboogi-removebg.png')} // 거북이 이미지
          style={styles.character}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MakeStory')}
      >
        <Text style={styles.buttonText}>동화 만들러 가기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.bookButton]}
        onPress={() => navigation.navigate('BookShelf')}
      >
        <Text style={[styles.buttonText, styles.boldText]}>책장으로 이동</Text>
      </TouchableOpacity>

      <View style={styles.navbar}>
        <TouchableOpacity>
          <Image source={require('../assets/icon-home.png')} style={styles.icon} />
          <Text style={styles.navText}>home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/icon-heart.png')} style={styles.icon} />
          <Text style={styles.navText}>interest</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/icon-setting.png')} style={styles.icon} />
          <Text style={styles.navText}>settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4F4C9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  characterSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  speechBubble: {
    backgroundColor: 'white',
    borderColor: '#335733',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  speechText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  character: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#B6DD8C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#335733',
  },
  bookButton: {
    backgroundColor: '#D4ECAA',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  boldText: {
    color: '#000',
    fontWeight: 'bold',
  },
  navbar: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingTop: 5,
    backgroundColor: 'white',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  navText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#335733',
  },
});
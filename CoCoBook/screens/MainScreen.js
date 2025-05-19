import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 캐릭터와 말풍선 */}
      <View style={styles.characterSection}>
        <View style={styles.speechBubbleContainer}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>오늘은 또 어떤{'\n'}이야기를 만들까??</Text>
          </View>
          <View style={styles.speechTail} />
        </View>
        <Image
          source={require('../assets/op_PRboogi-removebg.png')}
          style={styles.character}
        />
      </View>

      {/* 버튼들 */}
      <TouchableOpacity
        style={styles.storyButton}
        onPress={() => navigation.navigate('MakeStory')}
      >
        <Text style={styles.storyButtonText}>동화 만들러 가기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bookshelfButton}
        onPress={() => navigation.navigate('BookShelf')}
      >
        <Text style={styles.bookshelfButtonText}>책장으로 이동</Text>
      </TouchableOpacity>

      {/* 네비게이션 바 */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Main')}>
          <Image source={require('../assets/icon-home.png')} style={styles.icon} />
          <Text style={styles.navText}>home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('UserInfo2', { from: 'Main' })}
        >
          <Image source={require('../assets/icon-heart.png')} style={styles.icon} />
          <Text style={styles.navText}>interest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Setting')}>
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
    marginTop: 40,
  },
  speechBubbleContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  speechBubble: {
    backgroundColor: '#fff',
    borderColor: '#222',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 220,
    alignItems: 'center',
    marginBottom: 2,
  },
  speechTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -2,
    borderWidth: 0,
  },
  speechText: {
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  character: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  storyButton: {
    backgroundColor: '#A4CD74',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#222',
    paddingVertical: 18,
    paddingHorizontal: 60,
    marginVertical: 10,
    alignItems: 'center',
    width: 280,
  },
  storyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  bookshelfButton: {
    backgroundColor: '#E4F4C9',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#222',
    paddingVertical: 18,
    paddingHorizontal: 60,
    marginVertical: 10,
    alignItems: 'center',
    width: 280,
  },
  bookshelfButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    borderTopWidth: 2,
    borderTopColor: '#E4F4C9',
    paddingTop: 5,
    backgroundColor: '#fff',
    height: 70,
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginBottom: 2,
  },
  navText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#222',
    fontWeight: 'bold',
  },
});
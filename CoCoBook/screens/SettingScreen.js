import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>내 계정 📕</Text>

      <View style={styles.userSection}>
        <Text style={styles.username}>👤 김꼬북</Text>
        <Text style={styles.email}>moonsojung518@gmail.com</Text>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UserInfo')}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.menuText}>개인정보 변경</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UserInfo2')}>
        <Text style={styles.icon}>❤️</Text>
        <Text style={styles.menuText}>관심사 설정</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MembershipScreen')}>
        <Text style={styles.icon}>⭐</Text>
        <Text style={styles.menuText}>구매 항목 및 멤버십</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PolicyScreen')}>
        <Text style={styles.icon}>🛡️</Text>
        <Text style={styles.menuText}>개인정보 처리방침</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('TermsScreen')}>
        <Text style={styles.icon}>📃</Text>
        <Text style={styles.menuText}>서비스 이용약관</Text>
      </TouchableOpacity>

      <View style={styles.menuItem}>
        <Text style={styles.icon}>ℹ️</Text>
        <Text style={styles.menuText}>앱 버전</Text>
        <Text style={styles.version}>1.0.6</Text>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('UserInfo2')}>
          <Image source={require('../assets/icon-heart.png')} style={styles.navIconImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Image source={require('../assets/icon-home.png')} style={styles.navIconImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Image source={require('../assets/icon-setting.png')} style={styles.navIconImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  userSection: {
    marginBottom: 24,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    fontSize: 18,
    width: 30,
  },
  menuText: {
    fontSize: 16,
    flex: 1,
  },
  version: {
    fontSize: 14,
    color: '#888',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fffce8',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  navIcon: {
    fontSize: 26,
  },
  navIconImage: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  }
});
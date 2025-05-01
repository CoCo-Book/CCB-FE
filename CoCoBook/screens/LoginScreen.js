import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* CoCo 책 아이콘 */}
      <Image
        source={require('../assets/coco_book.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* 이메일 입력 */}
      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* 로그인 버튼 → MainScreen */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.secondaryButtonText}>로그인하기</Text>
      </TouchableOpacity>

      {/* 회원가입 버튼 → UserInfoScreen */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('UserInfo')}
      >
        <Text style={styles.primaryButtonText}>회원가입하기</Text>
      </TouchableOpacity>

      {/* 구분선 */}
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>또는</Text>
        <View style={styles.separatorLine} />
      </View>

      {/* 소셜 로그인 버튼들 */}
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>카카오로 계속하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>구글로 계속하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>네이버로 계속하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4CD74',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1.5,
    borderColor: '#aaa',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  primaryButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#444',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FEEFC3',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#444',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#444',
  },
  socialButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 6,
    width: '100%',
    borderWidth: 2,
    borderColor: '#444',
  },
  socialText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
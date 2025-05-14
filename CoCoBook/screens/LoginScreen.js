import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [emailError, setEmailError] = useState('');
  const isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const isPasswordValid = password.length >= 8;
  const isLoginEnabled = isEmailValid && isPasswordValid;

  // 이메일 변경 시 형식 검사
  const handleEmailChange = (text) => {
    setEmail(text);
    if (!text.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const handleGoogleLogin = async () => {
    if (isSigningIn) return; // 이미 로그인 중이면 무시
    setIsSigningIn(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);

      // 예시: userInfo.user.id가 DB에 있으면 Main, 없으면 UserInfo로 이동
      // 실제로는 서버에 userInfo.user.email 등으로 회원 여부를 확인해야 함
      const isExistingUser = await checkIfUserExists(userInfo.user.email); // 이 함수는 예시입니다.

      if (isExistingUser) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('UserInfo', { userInfo: userInfo.user });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSigningIn(false);
    }
  };

  // 예시용 함수 (실제로는 서버와 통신 필요)
  const checkIfUserExists = async (email) => {
    // TODO: 서버에 email로 회원 여부 확인 요청
    // 임시로 localStorage, AsyncStorage, 또는 하드코딩 등으로 테스트 가능
    // return true; // 기존 유저
    // return false; // 신규 유저
    return false; // 테스트용(항상 신규 유저로 이동)
  };

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
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? (
        <Text style={{ color: 'red', alignSelf: 'flex-start', marginBottom: 8 }}>
          {emailError}
        </Text>
      ) : null}

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {!isPasswordValid && password.length > 0 && (
        <Text style={{ color: 'red', alignSelf: 'flex-start', marginBottom: 8 }}>
          비밀번호는 8자리 이상이어야 합니다.
        </Text>
      )}

      {/* 로그인 버튼 → MainScreen */}
      <TouchableOpacity
        style={[styles.secondaryButton, !isLoginEnabled && { opacity: 0.5 }]}
        onPress={() => navigation.navigate('Main')}
        disabled={!isLoginEnabled}
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

      <TouchableOpacity
        style={styles.socialButton}
        onPress={handleGoogleLogin}
        disabled={isSigningIn}
      >
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
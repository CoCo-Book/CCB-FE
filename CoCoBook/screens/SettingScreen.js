import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingScreen() {
  const navigation = useNavigation();
  const [gender, setGender] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>설정</Text>

      <Text style={styles.subLabel}>이름</Text>
      <TextInput placeholder="이름을 입력하세요" style={styles.input} />

      <Text style={styles.subLabel}>성별</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === '여자' && styles.selected]}
          onPress={() => setGender('여자')}
        >
          <Text style={styles.genderText}>여자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === '남자' && styles.selected]}
          onPress={() => setGender('남자')}
        >
          <Text style={styles.genderText}>남자</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subLabel}>나이</Text>
      <TextInput placeholder="나이를 입력하세요" keyboardType="numeric" style={styles.input} />

      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Leave')}>
        <Text style={styles.buttonText}>회원탈퇴</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Subscribe')}>
        <Text style={styles.buttonText}>구독하기</Text>
      </TouchableOpacity>

      {/* 다음 버튼 */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.nextArrow}>▶</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5F3C3',
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subLabel: {
    marginTop: 16,
    marginBottom: 4,
    color: '#555',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  genderButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555',
  },
  selected: {
    backgroundColor: '#FEF9E7',
    borderColor: '#222',
  },
  genderText: {
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  nextButton: {
    position: 'absolute',
    bottom: 36,
    right: 24,
    backgroundColor: '#fdf6cc',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#2f472f',
  },
  nextArrow: {
    fontSize: 20,
    color: '#2f472f',
    fontWeight: 'bold',
  },
});
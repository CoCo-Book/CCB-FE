import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UserInfoScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [gender, setGender] = useState(null); // 'male' | 'female'
  const [age, setAge] = useState('');

  return (
    <View style={styles.container}>
      {/* 이름 입력 */}
      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="이름을 입력하세요"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      {/* 성별 선택 */}
      <Text style={styles.label}>성별</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'female' && styles.genderSelected,
          ]}
          onPress={() => setGender('female')}
        >
          <Text style={styles.genderText}>여자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'male' && styles.genderSelected,
          ]}
          onPress={() => setGender('male')}
        >
          <Text style={styles.genderText}>남자</Text>
        </TouchableOpacity>
      </View>

      {/* 나이 입력 */}
      <Text style={styles.label}>나이</Text>
      <TextInput
        style={styles.input}
        placeholder="나이를 입력하세요"
        placeholderTextColor="#888"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      {/* 다음 버튼 */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('UserInfo2')}
      >
        <Text style={styles.nextArrow}>▶</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4CD74',
    padding: 24,
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderColor: '#2f472f',
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    borderColor: '#2f472f',
    borderWidth: 2,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  genderSelected: {
    backgroundColor: '#fdf6cc',
  },
  genderText: {
    fontSize: 16,
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
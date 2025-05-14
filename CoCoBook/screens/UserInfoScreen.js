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
      {/* 상단 안내문구 */}
      <Text style={styles.guideText}>회원정보를 입력해주세요</Text>

      {/* 이름 입력 */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="이름을 입력하세요"
          placeholderTextColor="#B3BFA6"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* 성별 선택 */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'female' && styles.genderSelected]}
          onPress={() => setGender('female')}
        >
          <Text style={[styles.genderText, gender === 'female' && styles.genderTextSelected]}>여자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'male' && styles.genderSelected]}
          onPress={() => setGender('male')}
        >
          <Text style={[styles.genderText, gender === 'male' && styles.genderTextSelected]}>남자</Text>
        </TouchableOpacity>
      </View>

      {/* 나이 입력 */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="나이를 입력하세요"
          placeholderTextColor="#B3BFA6"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>

      {/* 다음 버튼 (삼각형 아이콘) */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('UserInfo2')}
      >
        <View style={styles.triangle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '33%',
    paddingHorizontal: 0,
  },
  guideText: {
    color: '#3A4D39',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 48,
    marginTop: 0,
    alignSelf: 'flex-start',
    marginLeft: 24,
  },
  inputWrapper: {
    width: '85%',
    marginBottom: 38,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#D6E7C5',
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 22,
    fontSize: 17,
    color: '#3A4D39',
    fontWeight: '500',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    marginBottom: 38,
    gap: 20,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#F3F8E7',
    borderRadius: 10,
    paddingVertical: 24,
    alignItems: 'center',
    marginHorizontal: 0,
    borderWidth: 0,
    // no border for unselected or selected
  },
  genderSelected: {
    backgroundColor: '#E6F0C2',
  },
  genderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A4D39',
  },
  genderTextSelected: {
    color: '#3A4D39',
  },
  nextButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 48,
    height: 48,
    backgroundColor: '#FFFBE9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#3A6A47',
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 12,
    borderBottomWidth: 12,
    borderLeftWidth: 20,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#3A6A47',
    backgroundColor: 'transparent',
    marginLeft: 4,
  },
});
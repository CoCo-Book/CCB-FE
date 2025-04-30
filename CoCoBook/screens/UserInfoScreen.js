// screens/UserInfoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UserInfoScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(null);

  const navigation = useNavigation();

  const handleNext = () => {
    if (!name || !age || !gender) {
      alert('모든 항목을 입력해주세요!');
      return;
    }
    navigation.navigate('UserInfo2', {
      name,
      age,
      gender,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="이름을 입력하세요"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>성별</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === '여자' && styles.selectedGender]}
          onPress={() => setGender('여자')}
        >
          <Text style={[styles.genderText, gender === '여자' && styles.selectedText]}>여자</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderButton, gender === '남자' && styles.selectedGender]}
          onPress={() => setGender('남자')}
        >
          <Text style={[styles.genderText, gender === '남자' && styles.selectedText]}>남자</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>나이</Text>
      <TextInput
        style={styles.input}
        placeholder="나이를 입력하세요"
        value={age}
        keyboardType="numeric"
        onChangeText={setAge}
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextIcon}>▶</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4D65E',
    padding: 24,
    justifyContent: 'flex-start',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#2F4F4F',
    borderWidth: 2,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#2F4F4F',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 14,
    marginRight: 10,
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#FFF9D1',
  },
  genderText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  selectedText: {
    fontWeight: 'bold',
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    padding: 12,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#2F4F4F',
  },
  nextIcon: {
    fontSize: 24,
    color: '#2F4F4F',
  },
});
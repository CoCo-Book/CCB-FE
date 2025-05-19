import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function UserInfoScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const from = route.params?.from || 'Login'; // 기본 경로

  const [name, setName] = useState('');
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState('');

  const handleNameChange = (text) => {
    const koreanOnly = text.replace(/[^\uAC00-\uD7A3ㄱ-ㅎㅏ-ㅣ]/g, '');
    setName(koreanOnly);
  };

  const handleNext = () => {
    if (!name) {
      Alert.alert('입력 오류', '이름을 입력해주세요.');
      return;
    }
    if (!gender) {
      Alert.alert('입력 오류', '성별을 선택해주세요.');
      return;
    }
    if (!age) {
      Alert.alert('입력 오류', '나이를 선택해주세요.');
      return;
    }
    navigation.navigate('UserInfo2', { from });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="이름을 입력하세요"
        placeholderTextColor="#888"
        value={name}
        onChangeText={handleNameChange}
      />

      <Text style={styles.label}>성별</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'female' && styles.genderSelected]}
          onPress={() => setGender('female')}
        >
          <Text style={styles.genderText}>여자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'male' && styles.genderSelected]}
          onPress={() => setGender('male')}
        >
          <Text style={styles.genderText}>남자</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>나이</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={age}
          onValueChange={(itemValue) => setAge(itemValue)}
        >
          <Picker.Item label="나이를 선택하세요" value="" />
          {Array.from({ length: 11 }, (_, i) => 3 + i).map((ageValue) => (
            <Picker.Item key={ageValue} label={`${ageValue}세`} value={ageValue.toString()} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextArrow}>다음 ▶</Text>
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
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderColor: '#2f472f',
    borderWidth: 2,
    marginBottom: 12,
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
    fontSize: 18,
    color: '#2f472f',
    fontWeight: 'bold',
  },
});
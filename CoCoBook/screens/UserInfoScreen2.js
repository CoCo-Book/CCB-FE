import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const INTERESTS = [
  '공룡', '요정', '로봇', '외계인', '강아지', '고양이', '토끼',
  '곤충', '왕자', '공주', '우주', '자동차'
];

export default function UserInfo2Screen() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigation = useNavigation();

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = () => {
    if (selectedInterests.length === 0) {
      alert('관심사를 하나 이상 선택해주세요!');
      return;
    }
    console.log('선택한 관심사:', selectedInterests);
    navigation.replace('Main'); // main.js로 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>관심사를 선택해주세요</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {INTERESTS.map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[
              styles.interestButton,
              selectedInterests.includes(interest) && styles.selected
            ]}
            onPress={() => toggleInterest(interest)}
          >
            <Text style={[
              styles.interestText,
              selectedInterests.includes(interest) && styles.selectedText
            ]}>{interest}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
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
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'white',
      textAlign: 'center',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 12,
    },
    interestButton: {
      borderWidth: 2,
      borderColor: '#2F4F4F',
      backgroundColor: 'white',
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      margin: 6,
    },
    selected: {
      backgroundColor: '#FFF9D1',
    },
    interestText: {
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
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UserInfo2Screen() {
  const navigation = useNavigation();

  const categories = [
    '왕자', '공주',
    '요정', '자동차',
    '로봇', '외계인',
    '동물', '곤충',
    '공룡', '마법사',
    '우주', '바다',
    '인형', '유령',
    '물고기', '꿈나라',
    '마법학교', '얼음나라',
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      if (selectedItems.length >= 5) return;
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemButton,
        selectedItems.includes(item) && styles.itemButtonSelected
      ]}
      onPress={() => toggleSelect(item)}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>관심사를 선택해주세요(1~5개)</Text>

      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item, index) => item + index}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (selectedItems.length === 0) {
            alert('최소 1개 이상 선택해주세요!');
            return;
          }
          navigation.navigate('Main');
        }}
      >
        <Text style={styles.nextArrow}>▶</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f472f',
    marginTop: 32,
    marginBottom: 32,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  itemButton: {
    backgroundColor: '#e3f3c4',
    borderRadius: 16,
    width: '48%',
    paddingVertical: 28,
    alignItems: 'center',
  },
  itemButtonSelected: {
    backgroundColor: '#fdf6cc',
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2f472f',
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
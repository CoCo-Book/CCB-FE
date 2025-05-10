// screens/BookSelfScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BookSelfScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내가 만든 책장</Text>
      <ScrollView contentContainerStyle={styles.bookGrid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={styles.bookPlaceholder} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDECB3',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 30,
    color: '#3E2F20',
  },
  bookGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  bookPlaceholder: {
    width: 100,
    height: 140,
    backgroundColor: '#fff',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
  },
  homeButton: {
    backgroundColor: '#FFF4D6',
    borderColor: '#3E2F20',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 30,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F20',
  },
});
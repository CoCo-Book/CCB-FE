// screens/StorySuccessScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function StorySuccessScreen(props) {
  const navigation = useNavigation();
  // 실제로는 props.imageUri 또는 redux, context 등에서 받아올 수 있음
  // 예시: const imageUri = props.imageUri;
  // 지금은 임시로 null (나중에 백엔드 연동 시 이 부분만 교체)
  const imageUri = null; // 예: 'https://example.com/generated-image.png'

  return (
    <View style={styles.container}>
      {/* 상단 회색 영역 + 홈으로 돌아가기 버튼 */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.homeBtnText}>홈으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
      {/* 메인 이미지 + 텍스트 */}
      <View style={styles.contentSection}>
        <View style={styles.imageWrap}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.storyImage} />
          ) : (
            <View style={[styles.storyImage, styles.placeholderImg]} />
          )}
        </View>
        <View style={styles.textSection}>
          <Text style={styles.storyText}>루미는 아라의 첫 친구가 되었다.</Text>
          <Text style={styles.storyText}>둘은 금방 친해져 함께 다닌다.</Text>
          <Text style={styles.storyText}>루미는 아라에게 학교를 소개한다.</Text>
          <Text style={styles.storyText}>마법 도서관과 실험실이 있다.</Text>
          <Text style={styles.storyText}>둘은 신난 마음으로 학교를 돌아다닌다.</Text>
        </View>
      </View>
      {/* 하단 회색 영역 + 좌우 화살표 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.arrowBtn}>
          <Text style={styles.arrowIcon}>{'◀'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowBtn}>
          <Text style={styles.arrowIcon}>{'▶'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F6',
    justifyContent: 'space-between',
  },
  topBar: {
    backgroundColor: '#fff',
    paddingTop: 18,
    paddingBottom: 12,
    alignItems: 'center',
  },
  homeBtn: {
    backgroundColor: '#FEF8E4',
    borderColor: '#46613B',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  homeBtnText: {
    color: '#46613B',
    fontWeight: 'bold',
    fontSize: 18,
  },
  contentSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F7F8F6',
    paddingTop: 12,
  },
  imageWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  storyImage: {
    width: 320,
    height: 220,
    borderRadius: 12,
    backgroundColor: '#eee',
    resizeMode: 'cover',
  },
  placeholderImg: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textSection: {
    marginTop: 8,
    alignItems: 'center',
  },
  storyText: {
    fontSize: 18,
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: '400',
  },
  bottomBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  arrowBtn: {
    width: 48,
    height: 48,
    backgroundColor: '#FEF8E4',
    borderColor: '#24704F',
    borderWidth: 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    flexDirection: 'row',
  },
  arrowIcon: {
    fontSize: 32,
    color: '#24704F',
    fontWeight: 'bold',
    lineHeight: 38,
  },
});
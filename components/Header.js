import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/icon.png')} />
        <Image source={require('../assets/images/bell.png')} style={styles.bellIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  header: {
    marginTop: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  bellIcon: {
    width: 32,
    height: 32,
  },
});

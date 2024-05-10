import React from 'react';
import { View, StyleSheet } from 'react-native';

const ZigzagDivider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.zigzagContainer}>
        <View style={[styles.zigzagLine, styles.white]} />
        <View style={[styles.zigzagLine, styles.red]} />
        <View style={[styles.zigzagLine, styles.white]} />
        <View style={[styles.zigzagLine, styles.red]} />
        <View style={[styles.zigzagLine, styles.white]} />
        <View style={[styles.zigzagLine, styles.red]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  zigzagContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  zigzagLine: {
    height: 10,
    width: '16.666%',
  },
  white: {
    backgroundColor: '#262626',
  },
  red: {
    backgroundColor: '#262626',
  },
});

export default ZigzagDivider;

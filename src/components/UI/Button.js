import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Button({children, style, onPress}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={nativeStyles.placeholder}>{children}</Text>
    </TouchableOpacity>
  );
}

const nativeStyles = StyleSheet.create({
  placeholder: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 20,
    padding: 5,
    margin: 5,
  },
});

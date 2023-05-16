import {ActivityIndicator, Text, View, StyleSheet, Modal} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

function LoadingOverlay() {
  return (
    // <View style={styles.container}>
    //     <ActivityIndicator size='large' color='white'/>
    // </View>
    <Modal visible={true}>
      <View style={styles.modalView}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  modalView: {
    flex: 1,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

export default LoadingOverlay;

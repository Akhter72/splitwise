import {TextInput, View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GlobalStyles} from '../constants/styles';
import {useState} from 'react';
import Button from '../components/UI/Button';
import {addGroup} from '../util/service/groupService';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {Alert} from 'react-native';

export default function AddGroup({navigation}) {
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(false);

  async function addGroupHandler() {
    if (groupName.trim() === '') {
      return Alert.alert('Group Name Should not be empty');
    }
    const groupData = {
      name: groupName,
      expenseIds: [],
      userIds: [],
    };
    setLoading(true);
    await addGroup(groupData);
    setLoading(false);
    navigation.goBack();
  }

  if (loading) {
    <LoadingOverlay />;
  }
  return (
    <SafeAreaView>
      <Text style={styles.title}>Add Group </Text>
      <View style={styles.container}>
        <Text style={styles.inputHeader}>Group Name</Text>
        <TextInput
          placeholder="Group Name"
          style={styles.inputContainer}
          value={groupName}
          onChangeText={text => {
            setGroupName(text);
          }}
        />
      </View>
      <Button onPress={addGroupHandler}>Submit</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputHeader: {
    fontSize: 20,
    margin: 5,
    padding: 5,
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: GlobalStyles.colors.primary400,
    padding: 5,
    marginHorizontal: 10,
    width: '70%',
  },
  title: {
    fontSize: 25,
    margin: 5,
    padding: 5,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: GlobalStyles.colors.primary500,
  },
});

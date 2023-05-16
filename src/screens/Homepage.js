import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {GlobalStyles} from '../constants/styles';
import {useNavigation} from '@react-navigation/native';
import Groups from '../components/UI/Groups';
import {useLayoutEffect, useState} from 'react';
import {fetchUserGroups} from '../util/service/userService';
import {useSelector, useDispatch} from 'react-redux';
import {setGroups} from '../redux/groupReducer';
import Button from '../components/UI/Button';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import HomepageDrawer from '../components/HomepageDrawer';

export default function Homepage() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groupReducer.groups);

  useLayoutEffect(() => {
    async function loadGroups() {
      const groups = await fetchUserGroups();
      dispatch(setGroups(groups));
      setLoading(false);
    }
    loadGroups();
  });

  function addGroupHandler() {
    navigation.navigate('AddGroup');
  }

  if (loading) {
    return <LoadingOverlay />;
  }
  return (
    <View style={{flex: 1}}>
      <HomepageDrawer
        visible={drawerVisibility}
        invisible={() => {
          setDrawerVisibility(false);
        }}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Expense Tracker</Text>
        <TouchableOpacity onPress={() => setDrawerVisibility(true)}>
          <Image
            style={styles.profile}
            source={require('../images/profile.png')}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Groups groups={groups} loading={load => setLoading(load)} />
      </View>
      <View></View>
      <Button style={styles.AddGroup} onPress={addGroupHandler}>
        Add Group
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 5,
    marginBottom: 20,
    backgroundColor: GlobalStyles.colors.primary400,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 30,
    color: 'white',
  },
  AddGroup: {
    width: '40%',
    alignSelf: 'center',
    marginTop: 10,
    position: 'absolute',
    bottom: 10,
  },
  profile: {
    borderRadius: 29,
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#C3BCBB'
  },
});

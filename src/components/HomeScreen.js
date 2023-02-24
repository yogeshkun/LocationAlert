/**
 * @description:
 * @author
 * @date 2023-02-25 00:03:29
 * @version 1.0
 *
 * Change Logs:
 * Date           Author       Notes
 *
 */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Button,
} from 'react-native';
import {Auth} from 'aws-amplify';

function HomeScreen({navigation}) {
  const [UserDet, setUser] = useState('');
  const signOut = async () => {
    try {
      await Auth.signOut({global: true});
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  const UserDetails = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user.username);
  };

  

  useEffect(() => {
    UserDetails();


  
  }, []);

  return (
    //   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

    //   </View>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome,{UserDet}</Text>
      </View>
      <View style={styles.header}>
        <Pressable style={styles.button} onPress={() => signOut()}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
      </View>
      <View style={styles.header}>
        <Button
          title="Sender"
          onPress={() => navigation.navigate('SenderLoc')}
        />
        <Text></Text>
        <Button
          title="Recevier"
          onPress={() => navigation.navigate('ReceiverAddr')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    paddingVertical: 20,
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    backgroundColor: '#ff9900',
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
export default HomeScreen;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import { initializeApp } from 'firebase/app'; //expo install firebase
import { getDatabase, push, ref, onValue } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBh6OmhNfhoL9S5ov7cas_s0quRSwHzc0c",
    authDomain: "shopping-list-reactnative.firebaseapp.com",
    databaseURL: "https://shopping-list-reactnative-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shopping-list-reactnative",
    storageBucket: "shopping-list-reactnative.appspot.com",
    messagingSenderId: "386513767525"
  };
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Firebase() {
  
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const save = () => {
    push(
      ref(database, 'items/'),
      { 'product': product, 'amount': amount });
    setProduct("");
    setAmount("");
  }
  const deleteItem = (id) => {
    
  }
  
  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      setShoppingList(Object.values(data));
    })}, []);

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Input
          style={{ paddingLeft: 4,}}
          value={product}
          placeholder="Product"
          leftIcon={{ type: 'material-community', name: 'food-apple' }}
          onChangeText={input => setProduct(input)}
        />
        <Input
          style={{ paddingLeft: 4}}
          value={amount}
          placeholder="Amount"
          leftIcon={{ type: 'material-community', name: 'format-list-numbered-rtl' }}
          onChangeText={input => setAmount(input)}
        />
        <Button onPress={save} title="Add" />
      </View>
        <Text style={styles.listHeader}>Shopping list</Text>
        <FlatList
          data={shoppingList}
          /* contentContainerStyle={{ marginTop: 50 }} */
          ListEmptyComponent={<Text>The list is empty, try adding some products</Text>}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({item}) =>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:20, fontWeight: "bold"}}> {item.product} </Text>
            <Text style={{fontSize:20}}> {item.amount} </Text>
            {/* <Text style={styles.delete} onPress={() => deleteItem(item.id)}>bought</Text> */}
          </View>}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  input: {
    width:"80%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  list: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listHeader: {
    marginTop: 30,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 22
  },
  delete: {
    color: '#0000ff',
    marginTop: 3,
    marginLeft: 10,
    fontSize:18,
  }
});
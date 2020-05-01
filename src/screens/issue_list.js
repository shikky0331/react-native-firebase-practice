import React, { useState, useEffect, useMemo } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import Firebase from '../../config/Firebase';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const IssueList = ({ ...props }) => {
  const [userInfo, updateUserInfo] = useState({ email: '' })
  const [issues, updateIssues] = useState([])
  const [input, updateInput] = useState('')

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = () => {
    Firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        updateUserInfo({ email: user.email })
      } else {
        props.navigation.navigate('Login')
      }
    })
  }

  const issueCollection = useMemo(() => {
    const db = Firebase.firestore()
    const col = db.collection('issues')

    // 更新イベント監視
    col.orderBy("createdAt", "desc").onSnapshot(query => {
      const data = []
      query.forEach(d => data.push({ ...d.data(), docId: d.id }))
      updateIssues(data)
    })

    return col
  }, [])

  const onCreate = () => {
    issueCollection.add({
      title: input,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(function () {
        console.log("Document successfully written!");
        updateInput('')
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  const onDelete = (id) => {
    issueCollection.doc(id).delete()
      .then(() => {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  return (
    <View style={styles.container}>
      <Text>{userInfo.email}</Text>
      <Text style={styles.appTitle}>Bizer team</Text>
      <TextInput
        style={styles.inputBox}
        value={input}
        onChangeText={input => updateInput(input)}
        placeholder='title'
        autoCapitalize='none'
      />
      <Button title="Create" onPress={onCreate}>Create</Button>
      {issues.map(issue => {
        return (
          <Text>
            <Text>{issue.title}</Text>
            <Text style={styles.buttonText} onPress={() => onDelete(issue.docId)}>×</Text>
          </Text>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 36,
    color: 'blue'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#FFA611',
    borderColor: '#FFA611',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  buttonSignup: {
    fontSize: 12
  }
})

export default IssueList

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import Button from './components/Button';
import { useEffect, useState } from 'react';
import Room from './components/Room';

firebase.initializeApp({
  apiKey: "AIzaSyCxNMcAzLDwXGR3i7cu-P70ZI8KT4CFcic",
  authDomain: "react-chat-bdf5c.firebaseapp.com",
  projectId: "react-chat-bdf5c",
  storageBucket: "react-chat-bdf5c.appspot.com",
  messagingSenderId: "837994125479",
  appId: "1:837994125479:web:dc5189edc3161308796382"
})

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser)
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setUser(user);
      }
      else{
        setUser(null)
      }
    })

    if(initializing){
      setInitializing(false)
    }

    return unsubscribe
  },[initializing])
  
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try{
      await auth.signInWithPopup(provider)
    }catch(err){
      console.log(err);
    }
  };

  const signOut = async () => {
    try{
      await firebase.auth().signOut();
    }catch(err){
      console.log(err.message)
    }
  };

  if(initializing) return "Loading...";

  return (
    <div className="App">
      {user? (
        <>
          <Room user={user} db={db}/>
          <Button onClick={signOut}>Sign Out</Button>
        </>
        ):(
      <Button onClick={signInWithGoogle}>Sign In With Google</Button>
      )}
    </div>
  );
}

export default App;

import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import Message from "./Message";

const Channel = ({user = null, db = null, room = null}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { uid, displayName, photoURL } = user;

    useEffect(() => {
        if(db){
            const unsubscribe = db.collection('messages').orderBy('createdAt').limit(100).onSnapshot(querySnapshot => {
                let data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                const fData = data.filter(doc => doc.room===room);
                setMessages(fData);
            })
            return unsubscribe
        }
    },[db,room])

    const handleOnChange = e => {
        setNewMessage(e.target.value);
    };

    const handleOnSubmit = e => {
        e.preventDefault();
        if(db){
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL,
                room
            })
        }
        
    };
      

    return(
    <>
        <ul>
            
            {messages.map(message => (
            <li key={message.id}>
                <Message {...message} />
            </li>
            ))}
        </ul>
        <form
            onSubmit={handleOnSubmit}>
            <input
                type="text"
                value={newMessage}
                onChange={handleOnChange}
                placeholder="Type your message here..."
            />
            <button
                type="submit"
                disabled={!newMessage}
            >
            Send
            </button>
        </form>
    </>
    ) ;
}

export default Channel
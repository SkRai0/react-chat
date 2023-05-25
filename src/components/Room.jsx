import { useState } from "react"
import Channel from "./Channel";

const Room = ({user = null, db = null}) => {
    const [room, setRoom] = useState('');
    const [inRoom, setInRoom] = useState(false);

    const handleOnChange = (e) =>{
        setRoom(e.target.value)
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        setInRoom(true);
    }

    return(
        <div>
            {!inRoom?(
            <form onSubmit={handleOnSubmit}>
                <input onChange={handleOnChange} placeholder="Enter Room name" type="text" />
                <button type="Submit" disabled={!room}>Send</button>
            </form>
            ): (
                <Channel user={user} db={db} room={room} />
            )
            }
        </div>
    )
}

export default Room
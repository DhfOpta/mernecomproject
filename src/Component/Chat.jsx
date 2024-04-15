// import { axios } from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { useCustmHook } from '../Contxt/contxt'
import './Chat.css'
export const Chat = () => {
    const [chat, setChat] = useState('')
    const [chatTg, setChatTg] = useState(false)
    const [ChatActv, setChatActv] = useState(false)

    const { datauser, isChatRply } = useCustmHook()
    console.log(isChatRply);
    const [chatDataa, setChataDataa] = useState([])
    console.log(datauser._id);
    const chhtTxt = (e) => {
        setChat(e.target.value)
    }
    const postChat = async () => {
        setChatTg(true)
        const data = {
            sender_Id: datauser._id,
            recever_Id: 'dhfopta@gmail.com',
            chat: chat,

        }
        const dataPost = await axios.post(`http://localhost:5000/cahtbyUser`, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            }
        })
        console.log(dataPost);
        setChatTg(false)



    }
    const chatData = async () => {
        try {
            setChatTg(true)
            const data = await axios.get('http://localhost:5000/cahtbyUser/')
            console.log(data.data);
            setChataDataa(data.data.msg)
            setChatTg(false)
        } catch (error) {
            console.log(error);
        }

    }
    const chatActv = () => {
        setChatActv(true)
        if (ChatActv) {
            setChatActv(false)

        }
    }
    useEffect(() => {
        chatData()
        if (isChatRply) {
            chatData()
        }


    }, [chatTg, isChatRply])
    console.log(chatDataa);
    return (
        <>


            <div className='chatCont'>
                <div className={ChatActv ? 'lr ' : 'lr hide'}>
                    <div className='lft'>
                        <ul>
                            {chatDataa.map((cvl) => {
                                return cvl.sender_Id == datauser._id ? <>
                                    <li>
                                        {/* <p > */}
                                        {cvl.chat}
                                        {/* </p> */}
                                    </li><br />
                                </> : <>
                                    <li className='sender'>{cvl.chat}</li><br />
                                </>
                            })}
                            {/* <li>Hello</li><br />
                    <li className='sender'>how are you?</li><br />
                    <li>Nice to meetg you ,meet soon</li><br />
                    <li className='sender'>Nice to meetg you ,meet soon</li><br /> */}

                        </ul>
                    </div>



                    <div className='chtTxt'> <input type='text' onChange={chhtTxt} value={chat} name='name' />
                    <button onClick={postChat}>Send</button>

                </div>
                </div>
              

                {/* </div> */}

                <div className='chatBtn'>
                    <button className='ChatBtnn' onClick={chatActv}>
                        Chatt
                    </button>
                </div>

            </div>
            {/* <div className='Conot'> */}

        </>
    )
}

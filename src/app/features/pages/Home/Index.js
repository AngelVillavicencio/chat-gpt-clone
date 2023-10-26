import React, { useState, useEffect } from "react";
import { logOut } from "../../../services/firebase/authFirebase";
import { useAuth } from "../../context/authContext/Index";
import { Layout } from "antd";
import axios from 'axios';
import { VerticalLeftOutlined } from "@ant-design/icons";
import "./styles.css"
import { db } from "../../../services/firebase/firebaseConfig"
import { v4 as uuidv4 } from 'uuid';
import { Spin } from 'antd';
const ButtonHeader = ({ createNewConversation, collapsed, setCollapsed }) => {
  return (
    <div className="flex m-2">
      <a className="cursor flex px-3 min-h-[44px] py-1 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border dark:border-white/20 gizmo:min-h-0 hover:bg-gray-500/10 h-11 hover:text-white dark:bg-transparent flex-grow overflow-hidden mr-1 " onClick={() => createNewConversation()}>
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon-sm shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        <span className="truncate">Nuevo chat</span>
      </a >
      <a className="flex px-3 min-h-[44px] py-1 gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border dark:border-white/20 gizmo:min-h-0 hover:bg-gray-500/10 h-11 gizmo:h-10 gizmo:rounded-lg gizmo:border-[rgba(0,0,0,0.1)] w-11 flex-shrink-0 items-center justify-center  dark:bg-transparent hover:text-white" onClick={() => {
        setCollapsed(false)
      }}>
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
      </a >
    </div >
  )
}

const IconCollapse = ({ collapsed, setCollapsed }) => {
  return (
    <a className={`z-20 ${collapsed ? "hidden" : "absolute top-1 left-2 p-2 text-zinc-900 hover:text-zinc-900 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 h-11 w-11 flex items-center rounded-md justify-center "} `} onClick={() => setCollapsed(true)}>

      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon-sm text-token-text-primary gizmo:text-token-text-tertiary gizmo:hover:text-token-text-secondary" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>
      </svg>
    </a >
  )
}


const Index = () => {
  const { Header, Footer, Sider, Content } = Layout;
  const { user, setStateUser, loading } = useAuth();
  const logOutSesion = () => {
    logOut().then(() => {
      setStateUser(null);
    });
  };

  const [collapsed, setCollapsed] = useState(true)
  const [conversations, setConversations] = useState([])
  const [actual_conversation, setConversation] = useState([])

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const createNewConversation = () => {
    const id = uuidv4();

    setConversations([{
      id,
      title: "",
      messages: []
    }, ...conversations])

    setConversation({
      id,
      title: "",
      messages: []
    })


  }

  const deleteAConversation = (id) => {

    const newConversations = conversations.filter(i => i.id !== id)

    setConversations(newConversations)


  }

  async function consultarMensajeGPT(mensaje) {
    try {
      const response = await axios.post('http://localhost:8000/consultar', { consulta: mensaje });

      if (response.data && response.data.respuesta) {
        return (response.data.respuesta);
      }
    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  }

  const [loadingMessage, setLoadingMessage] = useState(false)


  const sendMessage = async () => {

    setLoadingMessage(true)
    const id = uuidv4()
    let mensajes = messages

    mensajes.push({
      id: id,
      question: newMessage,
      response: ""
    })
    /*setMessages([...messages, {
      id: id,
      question: newMessage,
      response: ""
    }])*/


    await consultarMensajeGPT(newMessage)
      .then(respuesta => {
        console.log("mensajes", messages)

        const Newmessages = mensajes.map(mens => {
          if (mens.id == id)
            return {
              ...mens,
              response: respuesta
            }
          return mens
        })
        console.log(Newmessages)
        setMessages(Newmessages)
        setLoadingMessage(false)
      })
      .catch(error => {
        const Newmessages = mensajes.map(mens => {
          if (mens.id == id)
            return {
              ...mens,
              response: ` Error :c: ${error}`
            }
          return mens
        })
        setMessages(Newmessages)
        setLoadingMessage(false)
      });

    setNewMessage('')

  }

  if (loading) return <h1>Cargando</h1>;

  return (
    <>
      <div className="h-screen  flex relative">

        <div className={`transition-all duration-200  dark bg-gray-900 gizmo:bg-black ${collapsed ? "w-80" : "w-0 hidden invisible border-0 "} `}>
          <ButtonHeader createNewConversation={createNewConversation} collapsed={collapsed} setCollapsed={setCollapsed} ></ButtonHeader>

          {conversations.map(conversation => {
            return (<div className={`flex p-3 items-center gap-3 text-white relative rounded-md  cursor-pointer break-all  bg-gray-800 pr-14 hover:bg-gray-800 group m-2 ${conversation.id == actual_conversation.id ? "bg-gray-700" : ""}`} onClick={() => {
              setConversation(conversation)
            }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>

              <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative" > {conversation.id}
                < div className={`absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-800 from-gray-100 ${conversation.id == actual_conversation.id ? "from-gray-700 from-gray-100" : ""}`} ></div>
              </div>
              <div className="absolute flex right-1 z-10 text-gray-300 text-gray-800 visible">
                <button className="p-1 hover:text-token-text-primary"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg >
                </button >
                <button className="p-1 hover:text-token-text-primary" onClick={() => deleteAConversation(conversation.id)}>
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg >
                </button >
              </div >


            </div >)
          })}

          <div className="">

            <button className="absolute bottom-0 text-white left-2 border rounded p-5 pt-2 pb-2" onClick={logOutSesion}>SAlir</button>
          </div>



        </div >

        <IconCollapse collapsed={collapsed} setCollapsed={setCollapsed}></IconCollapse>




        <div className="w-full h-full ">
          <div className="w-full h-full p-0 relative z-10 overflow-scroll ">
            <div className="absolute top-0 right-0 w-full z-10 pb-80">
              <ul>
                {messages.map((message, index) => (

                  <li key={index} className="">
                    <div>
                      <div className="bg-white w-full bg-slate-100 border border-slate-200 p-8 pl-24">
                        {message.question}
                      </div>
                      <div className="bg-slate-300 p-8 pl-24">

                        {loadingMessage && message.response == "" ? (<p className="text-sm"> < Spin /> Pensando </p>) : (<></>)}

                        {message.response}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full z-20 fixed bottom-0 flex bg-white justify-center items-center p-5 pl-24">
              <div className="w-full flex">
                <div className="flex w-4/5 justify-center">
                  <textarea
                    rows="4"
                    className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-3"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Envía un mensaje">
                  </textarea>
                  <button className="w-5" data-testid="send-button" onClick={() => sendMessage()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="icon-sm m-1 md:m-0"><path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"></path></svg>
                  </button>

                </div>

              </div>




            </div>

          </div >
        </div >

      </div >



    </>
  );
};
export default Index;


//<h2 className="text-4xl text-center">{user.email}</h2>

/*
<div className="">
              <ul>
                {messages.map((message, index) => (
                  <li key={index} className="">
                    {message.text}
                  </li>
                ))}
              </ul>
            </div>

*/
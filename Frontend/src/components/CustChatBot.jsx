import ChatBot from 'react-simple-chatbot';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import bot from '../assets/bot.jpg'
import userbotimg from '../assets/user.jpg'

const theme = {
  background: 'white',
  // fontFamily: 'Poppins',
  headerBgColor:  '#237518',
  headerFontColor: 'white',
  headerFontSize: '25px',
  botBubbleColor: '#386150',
  botFontColor: 'white',
  userBubbleColor: '#778f45',
  userFontColor: 'white',
};

function  CustChatBot() {

  useEffect(()=>{
    console.log('Chatbot');
  })

  return(
    <div style={{
      width:"auto",
      padding: '14px',
      height:"auto",
      position:"fixed",
      bottom:"75px",
      left:"1px"
    }}>
      <ThemeProvider theme={theme}>
        <ChatBot
        headerTitle="PlantRX bot"
        recognitionEnable={true}
        speechSynthesis={{ enable: true, lang: 'hi' }}
        botAvatar={bot}
        userAvatar={userbotimg}
        recognitionPlaceholder={"Listening"}
        enableMobileAutoFocus={true}
        enableSmoothScroll={true}
        width={"400px"}
        opened={true}


        steps={[
        {
          id: '1',
          message:'Whats your name?',
          trigger:'2'
        },
        {
          id: '2',
          placeholder:'Type your name',
          user:true,
          trigger: '3',
        },
        {
          id: '3',
          message: 'Hello {previousValue},Welcome to PlantRX',
          trigger:'4'

        },
        {
          id:'4',
          placeholder:'choose an option',
          options: [
            { value:1, label: 'How can i identify the plant?', trigger: '5' },
            { value:2, label: 'Do you want to know about medicinal plants?', trigger: '7' },
          ],
        },
        {
          id:'5',
          message:'Explore-->Upload image-->Predict-->Get result',
          trigger:'6',
        },
        {
          id:'6',
          options: [
            { value:1, label: 'Is tulasi a medicinal plant?', trigger: '11' },
            { value:2, label: 'Benefits of tulasi', trigger: '7' },
          ],
          placeholder:'choose an option',

        },
        {
          id:'7',
          options:[
            {label:"Can tulasi be grown at home?",trigger:'9'}
          ],
          placeholder:'choose an option',

        },
        {
          id:'8',
          message:"It cures headaches,cold,cough etc..",
          trigger:'10'
        },
        {
          id:'9',
          message:"Yes it can be grown at home",
          trigger:'10'
        },
        {
          id:'10',
          message:"Hope you find it useful",
          end:true,
        },
        {
          id:'11',
          message:"yes tulasi is a medicinal plants",
          trigger:'7'
        }

        ]}
        />
      </ThemeProvider>
    </div>
  )
}

export default CustChatBot
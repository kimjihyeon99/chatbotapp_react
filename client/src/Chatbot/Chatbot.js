import Axios from 'axios';
import React from 'react';

function Chatbot() {

    const textQuery = async (text)=>{
        //first need to take care of the message i sent
        let conversation={
            who:'user',
            content:{
                text:{
                    text: text
                }
            }
        }

        const textQueryVariables={
            text
        }
         //second need to take care of the message chatbot sent
        try{
            //send request to the textQuery
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)
            const content = response.data.fulfillmentMessages[0]

            conversation={
                who:'bot',
                content:content
            }
            console.log(conversation)
        }catch(error){
            conversation={
                who:'bot',
                content:{
                    text:{
                        text: "Error just occured, please check the problem"
                    }
                }
            }
        }

    }

    const keyPressHandler =(e)=>{
        if(e.key === "Enter"){

            if(!e.target.value){
                return alert('you need to type something first')
            }
            //we will send reqest to text query route
            textQuery(e.target.value)
            // textQuery(e.target.value)
            e.target.value ="";

        }
    }

    return (
        <div style={{
            height:700, width:700,
            border: '3px solid black', borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow:'auto'}}>

            </div>

            <input 
                style={{
                    margin:0, width:'100%', height:50,
                    borderRadius: '4px', padding: '5px', fontSize: '1rem'
                }}
                placeholder="Send a message..."
                onKeyPress={keyPressHandler}
                type="text"
            />
                
        </div>
    )
}

export default Chatbot;
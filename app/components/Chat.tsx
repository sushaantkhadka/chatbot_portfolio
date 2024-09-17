import { useChat } from 'ai/react'
import { Send } from 'lucide-react'
import Image from 'next/image';
import React, { useRef } from 'react'

export default function Chat() {

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/openai',
    });

    const chatContainer = useRef<HTMLDivElement>(null);

    const scroll = () =>{
        const {offsetHeight, scrollHeight, scrollTop } = chatContainer.current as HTMLDivElement
        if (scrollHeight >= scrollTop + offsetHeight) {
            chatContainer.current?.scrollTo(0, scrollHeight + 200)
        }
    }

    const renderResponse= () => {
        return (
            <div className=''>
                {messages.map((m, index) => (
                    <div key={m.id} className={`${m.role === "user" ? 'user' : 'ai'}`}>
                        <Image src={m.role === "user" ? '/cat.jpg' : 'sage.png'} alt="avatar" width={150} height={150}  />
                        <div>
                            <p>{m.content}</p>
                            {index < messages.length-1 && <div className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

  return (
    <div ref={chatContainer} className='flex flex-col justify-between items-center h-[90vh]'>
        {renderResponse()}
        <form onSubmit={handleSubmit}  className='bg-white flex items-center p-1 w-[720px] justify-between rounded-full'>
            <input type="text" className='ml-3 w-full text-black font-medium outline-none' placeholder='Ask Peek anything....' />
            <button type='submit' className='bg-amber-500 p-2 rounded-full flex justify-center items-center text-gray-800' > <Send /> </button>
        </form>
    </div>
  )
}

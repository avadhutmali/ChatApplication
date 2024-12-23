import React from 'react'
import ChatBubble from './ChatBubble'

function Page() {
    const name = "Avadhut"
    const time = 12.23
    const message = "This is imp"
    const status = "online"

  return (
    <div className='flex gap-2 h-screen w-full '>
        <div className="contacts w-[85vh] p-2 bg-red-100 h-full overflow-scroll">
            <div className="h-20 w-full bg-red-300 cursor-pointer text-center font-bold text-3xl my-2">Avadhut Mali</div>
            <div className="h-20 w-full bg-red-300 cursor-pointer text-center font-bold text-3xl my-2">Avadhut Mali</div>
            <div className="h-20 w-full bg-red-300 cursor-pointer text-center font-bold text-3xl my-2">Avadhut Mali</div>
            <div className="h-20 w-full bg-red-300 cursor-pointer text-center font-bold text-3xl my-2">Avadhut Mali</div>
            <div className="h-20 w-full bg-red-300 cursor-pointer text-center font-bold text-3xl my-2">Avadhut Mali</div>
            <div className="h-20 w-full bg-red-300 cursor-pointer text-center font-bold text-3xl my-2">Avadhut Mali</div>
            <div className="h-20 w-full bg-red-300 cursor-pointer text-center font-bold text-3xl my-2">Avadhut Mali</div>
            <div className="h-20 w-full bg-red-300 cursor-pointer text-center font-bold text-3xl my-2">Avadhut Mali</div>

            <div className="h-20 w-full bg-red-300 cursor-pointer text-center font-bold text-3xl my-2">Avadhut Mali</div>
        </div>
        <div className="contacts w-full bg-blue-100 h-full overflow-scroll">
            <ChatBubble name={name} time={time} message={message} status={status}/>
            <ChatBubble name={name} time={time} message={message} status={status}/>
            <ChatBubble name={name} time={time} message={message} status={status}/>
            <ChatBubble name={name} time={time} message={message} status={status}/>
            <ChatBubble name={name} time={time} message={message} status={status}/>
            <ChatBubble name={name} time={time} message={message} status={status}/>
            <ChatBubble name={name} time={time} message={message} status={status}/>
            <ChatBubble name={name} time={time} message={message} status={status}/>
            <ChatBubble name={name} time={time} message={message} status={status}/>
            <ChatBubble name={name} time={time} message={message} status={status}/>
        </div>
    </div>
  )
}

export default Page
import React from 'react'
import { Clipboard, Copy } from 'lucide-react'

const CopyButton = ({text} : { text: string }) => {

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied!")
        })
    }

  return (
    <button onClick={copyToClipboard}>
        <Copy style={{width: "1.25rem", height: "1.25rem"}} className="mr-2 text-gray-500 hover:text-blue-600 transition" />
    </button>
  )
}

export default CopyButton
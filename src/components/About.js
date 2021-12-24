import React from 'react'
import { useContext } from 'react'
import notecontext from '../Context/notes/Notecontext'

function About() {
    const a = useContext(notecontext)
    return (
        <>
        <div>
            This is {a.Name}
        </div>
        </>
    )
}

export default About

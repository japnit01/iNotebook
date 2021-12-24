import React from 'react'

function Alert(props) {
    return (
        <>
            <div className={`alert alert-${props.type}`} role="alert">
                {props.message}
            </div>
        </>
    )
}

export default Alert
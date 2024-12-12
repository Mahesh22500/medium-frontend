/* eslint-disable react/prop-types */

export const BlueButton = ({onClick, text}) => {
  return (
    <div>
        <button className="text-white px-4 bg-blue-400 rounded-md" onClick={onClick}>{text}</button>
    </div>
  )
}

export const RedButton = ({onClick , text})=>{

    return (
        <div>
            <button className="text-white px-4 bg-red-400 rounded-md" onClick={onClick}>{text}</button>
        </div>
      )

}


export const GreenButton = ({onClick , text})=>{

    return (
        <div>
            <button className="text-white px-4 bg-green-500 rounded-md" onClick={onClick}>{text}</button>
        </div>
      )

}
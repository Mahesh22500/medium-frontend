
// eslint-disable-next-line react/prop-types
const LabelledInput = ({label,onChange}) => {
  return (
    <div className='flex gap-2 m-2'>
        <label className='w-20 pt-2 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
{label}
        </label>
        <input onChange ={onChange} className="text-gray-500 max-w-40 text-center border-4 outline-none border-gray-300 rounded-md">
        </input>
    </div>
  )
}

export default LabelledInput
import './Input.css'

export default function Input ({ type, id, text, validation, error, value, onChange}) {
  return (
    <>
      <input type={type} name={id} id={id} value={value} onChange={onChange} aria-required="true" maxLength="60" className={error ? 'input input--error' : 'input'} placeholder={text} onBlur={validation} />
      <p className="input__errors">{error}</p>
    </>
  )
}



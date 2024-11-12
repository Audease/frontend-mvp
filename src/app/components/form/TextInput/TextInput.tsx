import React, { useState, useEffect } from "react"

type Props = {
  id: string
  className?: string
  value?: string | number
  type?: string
  label?: string
  placeholder?: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function TextInput({
  id,
  className = "",
  value = "",
  type = "text",
  label,
  placeholder = "",
  error,
  onChange,  
  ...inputElementProps
}: Props) {
  return (
    <div className="flex flex-col justify-start align-start text-input">
      {label && <label htmlFor={id} className="text-black">{label}</label>}
      <input
        id={id}
        className={`input order-tgrey2 rounded-md p-2 text-h2 text-stone-950 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 placeholder:text-gray-400 placeholder:italic  ${className}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}  
        {...inputElementProps}
      />
      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  )
}

export default TextInput

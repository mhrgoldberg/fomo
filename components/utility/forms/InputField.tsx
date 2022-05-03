import React from "react"
import { FormInputContainer } from "../../../styles/formStyles"
import { FieldType } from "../hooks/useFormState"

type InputFieldPropsTypes = {
  type: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  state: FieldType
  label: string
  error: string
  placeholder: string
  required: boolean
}

export default function InputField({
  type,
  name,
  onChange,
  state,
  label,
  error,
  placeholder,
  required = false,
}: InputFieldPropsTypes) {
  const placeholderCopy = placeholder || label
  return (
    <FormInputContainer>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className={error && !state.updated ? "formFieldError" : ""}
        id={name}
        type={type}
        name={name}
        onChange={onChange}
        value={error && !state.updated ? "" : state.value}
        placeholder={error || placeholderCopy}
        required={required}
      />
    </FormInputContainer>
  )
}

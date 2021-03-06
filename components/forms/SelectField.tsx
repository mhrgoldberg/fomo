import React from "react"
import styled from "styled-components"

const FormDiv = styled.div<FormDivProps>`
  /* layout */
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-rows: auto;

  label {
    width: 100%;
    font-size: 2.2rem;
    color: var(--primary-light);
  }
  .formFieldError {
    border-bottom: 0.2rem solid var(--error) !important;
    ::placeholder {
      color: var(--error);
    }
  }
  select {
    color: ${(props) => (props.updated ? "var(--primary)" : "var(--primary-light)")};
  }
`

export default function SelectField({
  options,
  name,
  onChange,
  state,
  label,
  error,
  placeholder,
  required = false,
}: SelectFieldProps) {
  const placeholderOrLabel = placeholder || label
  return (
    <FormDiv updated={state?.updated}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        className={error && !state.updated ? "formFieldError" : ""}
        name={name}
        onChange={onChange}
        value={state.value}
        required={required}
      >
        <option disabled value="">
          {error && !state.updated ? error : placeholderOrLabel}
        </option>
        {options.map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
    </FormDiv>
  )
}

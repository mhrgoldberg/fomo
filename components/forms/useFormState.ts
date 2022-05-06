import { useState } from "react"

export default function useFormState(inputFields: InitialFieldTypes) {
  // inputFields should be an pojo in this format {<fieldName>:<defaultValue>}

  function createInitialState(fields: InitialFieldTypes) {
    const initialState: Record<string, FieldType> = {}
    Object.keys(fields).reduce((acc, fieldName) => {
      acc[fieldName] = {
        value: fields[fieldName],
        updated: false,
        error: "",
      }
      return acc
    }, initialState)
    return initialState
  }

  const [form, setForm] = useState<FieldTypes>(createInitialState(inputFields))

  function updateStateValue(
    newState: { [x: string]: FieldType },
    fieldName: string,
    value: string | number
  ) {
    const newField = newState[fieldName]
    if (!newField.updated) {
      newField.updated = true
      newField.error = ""
    }
    newField.value = value
  }

  function updateField(
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) {
    const newState = { ...form }
    updateStateValue(newState, e.target.name, e.target.value)
    setForm(newState)
  }

  function updateFieldByName(fieldName: string | [], value: string | number) {
    const newState = { ...form }

    if (Array.isArray(fieldName)) {
      fieldName.forEach((field) => {
        updateStateValue(newState, field, value)
      })
    } else {
      updateStateValue(newState, fieldName, value)
    }

    setForm(newState)
  }

  function updateErrorFields(errors: { [key: string]: string }) {
    const newState = { ...form }
    const updateErrorMessage = (fieldNameStr: string, errorMessage: string) => {
      const newField = newState[fieldNameStr]
      newField.updated = false
      newField.error = errorMessage
    }

    Object.entries(errors).forEach(([fieldName, error]) => {
      updateErrorMessage(fieldName, error)
    })
    setForm(newState)
  }

  function setUpdatedStatusFalse() {
    const newForm: FieldTypes = {}
    Object.keys(form).forEach((fieldName) => {
      if ({}.hasOwnProperty.call(form, fieldName)) {
        newForm[fieldName] = {
          value: form[fieldName].value,
          updated: false,
          error: form[fieldName].error,
        }
      }
    })
    setForm(newForm)
  }

  // pass in exclude array of any fields to exclude from submit data
  function formatSubmit(exclude = [] as string[]) {
    const submitData = new FormData()
    Object.keys(form).forEach((fieldName) => {
      if (!exclude.includes(fieldName)) {
        submitData.append(fieldName, form[fieldName].value.toString())
      }
    })
    return submitData
  }

  return {
    state: { form },
    update: { setUpdatedStatusFalse, updateField, updateFieldByName, updateErrorFields },
    submit: formatSubmit,
  }
}

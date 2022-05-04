import { useState } from "react"

export default function useFormState(inputFields: InitialFieldTypes) {
  function createInitialState(fields: InitialFieldTypes) {
    const initialState: Record<string, FieldType> = {}
    Object.keys(fields).forEach((fieldName) => {
      if ({}.hasOwnProperty.call(fields, fieldName)) {
        initialState[fieldName] = {
          value: fields[fieldName],
          updated: false,
        }
      }
    })
    return initialState
  }

  // fields should be an pojo in this format {<fieldName>:<defaultValue>}
  const [form, setForm] = useState<FieldTypes>(createInitialState(inputFields))
  const [error, setError] = useState<string>("")

  function updateField(e: React.ChangeEvent<HTMLInputElement>) {
    const newState = { ...form }
    const newField = newState[e.target.name]
    if (!newField.updated) {
      newField.updated = true
    }
    newField.value = e.target.value
    setForm(newState)
  }

  function updateFieldByName(fieldName: string, value: string | number) {
    const newState = { ...form }
    const newField = newState[fieldName]
    if (!newField.updated) {
      newField.updated = true
    }
    newField.value = value
    setForm(newState)
  }

  function setUpdatedStatusFalse() {
    const newForm: FieldTypes = {}
    Object.keys(form).forEach((fieldName) => {
      if ({}.hasOwnProperty.call(form, fieldName)) {
        newForm[fieldName] = {
          value: form[fieldName].value,
          updated: false,
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
    state: { form, error },
    update: { setUpdatedStatusFalse, updateField, updateFieldByName, setError },
    submit: formatSubmit,
  }
}

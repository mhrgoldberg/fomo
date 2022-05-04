type InitialFieldTypes = Record<string, string | number>

interface FieldType {
  value: string | number
  updated: boolean
}

interface FormFileldProps {
  name: string
  state: FieldType
  label: string
  error: string
  placeholder: string
  required: boolean
}

interface InputFieldProps extends FormFileldProps {
  type: "email" | "password" | "text" | "number"
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface SelectFieldProps extends FormFileldProps {
  options: string[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

interface FormDivProps {
  updated: boolean
}

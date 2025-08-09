import { InputField } from "./input-field"
import { FieldWrapper } from "./ui/field-wrapper"
import { FormFieldProps, RForm } from "@/shared/types/form"
import { AnyFieldApi, DeepKeys } from "@tanstack/react-form"

interface Props<TForm, TName extends DeepKeys<TForm>> extends Omit<FormFieldProps, "value" | "prefix"> {
  form: RForm<TForm>
  field: AnyFieldApi
  prefixProps: Omit<FormFieldProps, "field"> & { name: TName }
  valueProps: Omit<FormFieldProps, "field"> & { name: TName }
}

export function PrefixedInputField<TForm, TName extends DeepKeys<TForm>>(props: Props<TForm, TName>) {
  const { form, prefixProps, valueProps } = props

  return (
    <FieldWrapper {...props}>
      <div className="input-container flex gap-2">
        <form.Field
          name={prefixProps.name}
          defaultMeta={{ isBlurred: true, isDirty: true, isTouched: true }}
          children={(field) => (
            // <InputField {...prefixProps} field={field} hasContainerStyle={false} withWrapper={false} className="max-w-5" />
            <div className="input-text">{field.state.value as any}</div>
          )}
        />

        <form.Field
          name={valueProps.name}
          children={(field) => (
            <InputField {...valueProps} field={field} className="flex-1" hasContainerStyle={false} withWrapper={false} />
          )}
        />
      </div>
    </FieldWrapper>
  )
}

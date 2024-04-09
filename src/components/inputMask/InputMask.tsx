import * as React from 'react'
import { IMaskInput } from 'react-imask'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

export const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props
    return (
      <IMaskInput
        {...other}
        mask="(00) 0 0000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    )
  },
)
  
export const ReaisMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function ReaisMaskCustom(props, ref) {
      const { onChange, ...other } = props
  
      return (
        <IMaskInput
        {...other}
        mask="R$ num"
        blocks={{
          num: {
            mask: Number,
            thousandsSeparator: '.',
            scale: 2,
            radix: ','
          },
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
      )
    }
  )
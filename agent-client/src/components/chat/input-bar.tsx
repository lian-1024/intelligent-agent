import React, { ChangeEvent, FC, FormEvent } from "react"
import { PlaceholdersAndVanishInput } from '@/components/aceternity'
interface InputBarProps {
    value:string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    className?: React.HTMLAttributes<HTMLElement>['className']
    placeholders?: string[]
}


const InputBar: FC<InputBarProps> = ({value, placeholders = [], onChange, onSubmit, className }) => {
  
    return (
        <PlaceholdersAndVanishInput
            value={value}
            className={className}
            placeholders={placeholders}
            onChange={(e) => onChange?.(e)}
            onSubmit={(e) => onSubmit?.(e)}
        />
    )
}

export default InputBar
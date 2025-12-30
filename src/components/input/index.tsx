import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
}

export function Input(props: InputProps) {

    return(
        <input type="text" 
        {...props}
        placeholder={props.placeholder || "Digite algo..."}
        autoComplete="off" 
        className="border-0 h-9 rounded-md outline-none px-2 mb-3 bg-white"/>
    )
}
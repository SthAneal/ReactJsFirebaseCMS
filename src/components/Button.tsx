import React from "react"

type ButtonPropType = {
    children:React.ReactNode
    typeVariant:'contained'|'outlined'|'text'
    typeColor?:'primary'|'secondary'
    typeSize?:'sm' | 'md'
    width?:string
    maxWidth?:string
    disabled?:boolean
    onClickFnc?:(e:React.MouseEvent<HTMLElement>)=>void
}

export const Button = ({children, typeVariant, typeColor, typeSize, width, maxWidth, onClickFnc, disabled}:ButtonPropType)=>{
    
    return(
       <button 
        disabled ={disabled && disabled}
        style={{width:`${width ? width:'100%'}`, maxWidth:`${maxWidth? maxWidth:''}`}} 
        className={`${typeVariant?typeVariant:''} ${typeColor?typeColor:''} ${typeSize ? typeSize:''}`}
        onClick={onClickFnc?(e:React.MouseEvent<HTMLElement>)=>onClickFnc(e):()=>console.log('do nothing')}
        >{children}</button>
    )
}
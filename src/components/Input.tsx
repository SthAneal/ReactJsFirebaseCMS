import React  from "react";
import { FlexDiv } from "../styles/globalStyleComponent";
import { MdDeleteForever, MdCancel, MdAddCircle } from "react-icons/md";
import { Button } from "./Button";


type FieldPropsType = {
    type?:React.HTMLInputTypeAttribute
    name:string
    label:string
    labelFor:string
    required?:boolean
    pattern?:string // will be regex or cs value for image accept type for image
    title?:string
    errorMessage?:string
    flex?:string
    width?:string
    maxWidth?:string
    minWidth?:string
    alignSelf?:string
    minValue?:string
    maxValue?:string
    defaultValue?:string | number 
    value?:string | number
    imageData?:{image?:File, imageName:string, imagePath:string}
    margin?:string
    padding?:string
    options?:{pageId:number,pageName:string, pageAlias:string, hasParent:string, pageType:string}[] 
    optionsGeneral?: {optValue:string, optDisplay:string, optDisable:boolean}[]
    className?:string
    defaultText?:string
    multiSelectSource?: {pageId:number, pageAlias:string, isSelected:boolean, isActive:boolean}[]
    imageMultiSelectSource?:{pageId:number, pageAlias:string, imageName:string, imageUrl:string, isSelected:boolean}[]
    // isEditedFlag?:boolean
    onChangeFnc?:(e:React.ChangeEvent<any>)=>void
    onClickFnc?:(e:React.MouseEvent<any>)=>void
    onCapsuleClickFnc?:(value:number)=>void
    onThumbnailClickFnc?:(value:number)=>void
}

// input section
export const Input = ({type, name, label, labelFor, pattern,title, required, errorMessage, flex, width, maxWidth, minWidth, minValue, maxValue, defaultValue, value, alignSelf, margin, padding, className, onChangeFnc}:FieldPropsType)=>{
    return(
        <FlexDiv 
            flex={flex?flex:'1 1 auto'} 
            width={width?width:'100%'} 
            minWidth={minWidth?minWidth:''} 
            maxWidth={maxWidth?maxWidth:''} 
            alignSelf={alignSelf?alignSelf:''}
            flexDirection='column' 
            className='input-wrapper'
            padding={padding?padding:''}
            margin={margin?margin:''}
            >

            <label htmlFor={labelFor}>
                <span className={required?'required':''}>{label}</span>
                {errorMessage? <span className="error-message">{errorMessage}</span>:''}
            </label>
            <input  autoComplete="true"
                    type={type} 
                    id={labelFor} 
                    name={name} 
                    pattern={pattern?pattern:".*?"} 
                    title={title?title:'At least one number of letters and numbers.'}
                    value={value && value}
                    min={minValue?minValue:""}
                    max={maxValue?maxValue:""}
                    required={required?true:false}
                    defaultValue={defaultValue && defaultValue}
                    className={className && className}
                    onChange={onChangeFnc && onChangeFnc}
                    />
        </FlexDiv>
    )
}

// select component just for selecting parent
export const Select = React.forwardRef<HTMLElement, FieldPropsType>(({name, label, labelFor,title, required, errorMessage, flex, width, maxWidth, minWidth, alignSelf, margin, padding, options, defaultValue, value, className, onChangeFnc, defaultText}:FieldPropsType, ref)=>{
    return(
        <FlexDiv 
            flex={flex?flex:'1 1 auto'} 
            width={width?width:'100%'} 
            minWidth={minWidth?minWidth:''} 
            maxWidth={maxWidth?maxWidth:''} 
            alignSelf={alignSelf?alignSelf:''}
            flexDirection='column' 
            className='input-wrapper'
            padding={padding?padding:''}
            margin={margin?margin:''}
            ref={ref}
            >

            <label htmlFor={labelFor}>
                <span>{label}</span>
                {errorMessage? <span className="error-message">{errorMessage}</span>:''}
            </label>
            <select  
                id={labelFor} 
                name={name} 
                title={title?title:'Select one of the given options.'}
                defaultValue={defaultValue && defaultValue}
                value={value && value}
                className={className && className}
                onChange={onChangeFnc && onChangeFnc}
                required={required?true:false}>
                    <option value='0'>{defaultText? defaultText:'Select an option'}</option>
                    {
                        options?.map((opt)=>(
                            // opt.value === selected?<option key={opt.value} selected value={opt.value}>{opt.name}</option>:<option value={opt.value}>{opt.name}</option>
                            (opt.pageType === 'page' || opt.pageType === 'page-main-nav')?<option key={opt.pageId} value={opt.pageId} >
                                {opt.pageName}
                                {opt.hasParent !=='' && ` ( ${opt.hasParent} )`}
                            </option>:''
                        ))
                    }

            </select>
        </FlexDiv>
    )
})

// general structure of single select component
export const SelectGeneral = ({name, label, labelFor,title, required, errorMessage, flex, width, maxWidth, minWidth, alignSelf, margin, padding, optionsGeneral, defaultValue, value, className, onChangeFnc, defaultText}:FieldPropsType)=>{
    return(
        <FlexDiv 
            flex={flex?flex:'1 1 auto'} 
            width={width?width:'100%'} 
            minWidth={minWidth?minWidth:''} 
            maxWidth={maxWidth?maxWidth:''} 
            alignSelf={alignSelf?alignSelf:''}
            flexDirection='column' 
            className='input-wrapper'
            padding={padding?padding:''}
            margin={margin?margin:''}
            >

            <label htmlFor={labelFor}>
                <span>{label}</span>
                {errorMessage? <span className="error-message">{errorMessage}</span>:''}
            </label>
            <select  
                id={labelFor} 
                name={name} 
                title={title?title:'Select one of the given options.'}
                defaultValue={defaultValue && defaultValue}
                value={value && value}
                className={className && className}
                onChange={onChangeFnc && onChangeFnc}
                required={required?true:false}>
                    <option value=''>{defaultText? defaultText:'Select an option'}</option>
                    {
                        optionsGeneral?.map((opt)=>(
                            // opt.value === selected?<option key={opt.value} selected value={opt.value}>{opt.name}</option>:<option value={opt.value}>{opt.name}</option>
                            <option 
                                key={opt.optValue} 
                                value={opt.optValue} 
                                disabled= {opt.optDisable && opt.optDisable}
                            >
                                    {opt.optDisplay}
                            </option>
                        ))
                    }

            </select>
        </FlexDiv>
    )
}

// image upload section
export const UploadImage = React.forwardRef(({ name, label, labelFor, pattern, title, required, errorMessage, flex, width, maxWidth, minWidth, defaultValue, value, alignSelf, margin, padding, imageData, className, onChangeFnc, onClickFnc}:FieldPropsType, ref)=>{
    return(
        <FlexDiv 
            flex={flex?flex:'1 1 auto'} 
            width={width?width:'100%'} 
            minWidth={minWidth?minWidth:''} 
            maxWidth={maxWidth?maxWidth:''} 
            alignSelf={alignSelf?alignSelf:''}
            flexDirection='column' 
            className='input-wrapper input-wrapper__image'
            padding={padding?padding:''}
            margin={margin?margin:''}
            ref={ref}
            >
            
            <label htmlFor={labelFor}>
                <span className={required?'required':''}>{label}</span>
                {errorMessage? <span className="error-message">{errorMessage}</span>:''}
            </label>

            <FlexDiv flex="1 1 auto" padding="10px" flexDirection="column" gap="10px" width="100%">
                <FlexDiv flex="0 0 auto" width="100%">
                    <label className="sub-label" htmlFor={labelFor}>UPLOAD IMAGE</label>
                </FlexDiv>
                <FlexDiv flex="0 0 auto" flexWrap="wrap" width="100%" justifyContent="space-between">
                    <FlexDiv flex="0 0 auto">{imageData?.imageName? imageData.imageName:'No file selected.'}</FlexDiv>
                    {(imageData?.imagePath)&& <FlexDiv flex="0 0 auto">
                                                <Button typeVariant="contained" typeColor="secondary" typeSize="sm" onClickFnc={onClickFnc}>
                                                    <FlexDiv alignItems="center" justifyContent="center" gap="5px">
                                                        <MdDeleteForever style={{fontSize:'1rem'}}/> <span>DELETE IMAGE</span>
                                                    </FlexDiv>
                                                </Button>
                                            </FlexDiv>}
                </FlexDiv>

                {(imageData?.imagePath)&& <FlexDiv flex="0 0 200px" width="100%">
                                                <img style={{width:"100%",height:"auto"}} src={imageData?.imagePath} alt="img"/>
                                            </FlexDiv>}
            </FlexDiv>
            
            <input  
                type="file"
                id={labelFor} 
                name={name} 
                accept={pattern?pattern:".jpg, .jpeg, .png"} 
                value=''
                required={required?true:false}
                defaultValue={imageData?.imageName && imageData.imageName}
                onChange={onChangeFnc && onChangeFnc}
                title={title && title}
                style={{'opacity':0, 'pointerEvents':'none'}}
                />
        </FlexDiv>
    )
})

// custom multiple select
export const MultipleSelect = React.forwardRef<HTMLElement, FieldPropsType>(({label, required, errorMessage, flex, width, maxWidth, minWidth, alignSelf, margin, padding, onCapsuleClickFnc, multiSelectSource}:FieldPropsType, ref)=>{
    return(
        <FlexDiv 
            flex={flex?flex:'1 1 auto'} 
            width={width?width:'100%'} 
            minWidth={minWidth?minWidth:''} 
            maxWidth={maxWidth?maxWidth:''} 
            alignSelf={alignSelf?alignSelf:''}
            flexDirection='column' 
            className='input-wrapper'
            padding={padding?padding:''}
            margin={margin?margin:''}
            ref={ref}
            >

            <label>
                <span className={required?'required':''}>{label}</span>
                {errorMessage? <span className="error-message">{errorMessage}</span>:''}
            </label>
            

            <FlexDiv flex="1" flexWrap="wrap" gap="15px" padding="10px">
                    {/* <div className="capsule capsule__added">
                        <span className="capsule__btn capsule__btn--delete" title={title && title}><MdCancel/></span>
                        <span className="capsule__title">this is capsule</span>
                    </div>
                    <div className="capsule">
                        <span className="capsule__btn capsule__btn--add"  title={title && title}><MdAddCircle/></span>
                        <span className="capsule__title">this is capsule</span>
                    </div> */}
                    
                    { (multiSelectSource && multiSelectSource?.length>0 )? multiSelectSource?.map((item)=>{
                        return(
                            <div className={`capsule ${item.isSelected?'capsule__added':''}  ${!item.isActive && 'capsule__hide'}`} key={item.pageId} 
                                onClick={()=> onCapsuleClickFnc && onCapsuleClickFnc(item.pageId)}
                                title={item.isSelected?'Click to unselect': 'Click to select'}
                            >
                                <span className={`capsule__btn capsule__btn--${item.isSelected?'delete':'add'}`}>
                                    {item.isSelected?<MdCancel/>:<MdAddCircle/>}
                                </span>
                                <span className="capsule__title">{item.pageAlias}</span>
                            </div>
                        )
                    }):'Links not available.'}
            </FlexDiv>                 

        </FlexDiv>
    )
})

// custom image multiple select
export const ImageMultipleSelect = React.forwardRef<HTMLElement, FieldPropsType>(({label, required, errorMessage, flex, width, maxWidth, minWidth, alignSelf, margin, padding, onThumbnailClickFnc, imageMultiSelectSource}:FieldPropsType, ref)=>{
    return(
        <FlexDiv 
            flex={flex?flex:'1 1 auto'} 
            width={width?width:'100%'} 
            minWidth={minWidth?minWidth:''} 
            maxWidth={maxWidth?maxWidth:''} 
            alignSelf={alignSelf?alignSelf:''}
            flexDirection='column' 
            className='input-wrapper'
            padding={padding?padding:''}
            margin={margin?margin:''}
            ref={ref}
            >

            <label>
                <span className={required?'required':''}>{label}</span>
                {errorMessage? <span className="error-message">{errorMessage}</span>:''}
            </label>
            

            <FlexDiv flex="1 1 200px" justifyContent="center" alignContent="center" width="100%" flexWrap="wrap" gap="15px" padding="10px">
                    { (imageMultiSelectSource && imageMultiSelectSource?.length>0 )? imageMultiSelectSource?.map((item)=>{
                        return(
                            <FlexDiv flex="0 1 150px" width="150px" gap="5px" flexDirection="column" className={`thumbnail ${item.isSelected?'thumbnail__added':''}`} key={item.pageId} 
                                onClick={()=> onThumbnailClickFnc && onThumbnailClickFnc(item.pageId)}
                                title={item.isSelected?'Click to unselect': 'Click to select'}
                            >
                                <span className={`thumbnail__btn thumbnail__btn--${item.isSelected?'delete':'add'}`}>
                                    {item.isSelected?<MdCancel/>:<MdAddCircle/>}
                                </span>
                                {/* <span className="capsule__title">{item.pageAlias}</span> */}
                                <img src={item.imageUrl} alt={item.pageAlias}/>
                                <span className="imageName">{item.imageName}</span>
                            </FlexDiv>
                        )
                    }):'Images not available.'}
            </FlexDiv>                 

        </FlexDiv>
    )
})
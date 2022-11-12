import React, {useEffect} from "react";

// import google realtime database instance
import { onAuthStateChanged, signOut } from "firebase/auth"; 

import { ref, set, onValue, update, remove} from 'firebase/database';
import { auth, db, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from "../firebase";
import ReactQuill from "react-quill";

import { DataRowType } from "../components/CreatePage";

/**
 * define Type User
 * @property-- @id of type number and @phone of type number
 * @author -- Anil
 */
type User = {
    id:string
    isVerified:boolean
}

/**
 * define Type Page
 * @property-- @name of type string
 * @author -- Anil
 */
// export type Page = {
//     id:number
//     title:string
//     pageAlias:string
//     pageParent:number
//     pageDescription:ReactQuill.Value
// }

export type Page = {
    id:number
    title:string
    pageAlias:string
    pageParent:number
    description:ReactQuill.Value
    imageName?:string
    imageUrl?:string
    pageType:string
    pageLinkList?:number[]
    pageImageList?:number[]
}


/**
 * define Type DashboardStateType
 * @property-- @user of type User or null and @Pages of type Page[] or null
 * @author -- Anil
 */
type DashboardStateType = {
    user:User| null
    pages:Page[] | null
}

/**
 * define Type DashboardContextType
 * @property-- @state of type DashboardStateType or null 
 * @author -- Anil
 */
type DashboardContextType = {
    dashboardState:DashboardStateType
    // addNewUser:(userId:string, firstName:string, lastName:string, phone:number, isVerified:boolean)=>void    
    logOut:()=>void
    getAllPage:()=>void
    savePage:(title:string, pageAlias:string, pageParent:number, description:ReactQuill.Value, pageImage:File, imageName:string, pageType:string, pageId?:number, pageLinkList?:number[], pageImageList?:number[])=>Promise<boolean>
    getImageUrl:(imageName:string)=>Promise<string>
    deletePage:(pageId:number, pageImage:string, pageChilds:DataRowType[])=>Promise<boolean>
    deleteImage:(pageId:number, pageImage:string)=>Promise<boolean>
    deleteImageFromStorage:(pageImage:string)=>Promise<void>
}

/**
 * define Type DashboardProviderType
 * @property-- @children of type ReactNode
 * @author -- Anil
 */
type DashboardProviderType = {
    children:React.ReactNode
}

/**
 * define Type DashboardAction
 * @property-- @type of type 'GET_USER' and @payload of type {user:User,Page:Page}
 * @author -- Anil
 */
type DashboardAction = {
    type: 'GET_USER' | 'SET_USER' | 'SET_EMAIL_VERIFIED' | 'REFRESH_ALL_PAGES'
    payload:{
        user?:User | null
        page?:Page
        pages?:Page[] | null
        isVerified?:boolean
    }
}


const reducer = (state:DashboardStateType,action:DashboardAction):DashboardStateType=>{
    switch(action.type){
        case 'GET_USER':{
            // return {...state,user:action.payload.user};
            return state;
        }
        case 'SET_USER':{
            return {...state,user:action.payload.user!};
            //return state;
        }
        case 'SET_EMAIL_VERIFIED':{
            // return {...state, user:{...state.user, isVerified:action.payload.isVerified!}}
            return {...state, user:action.payload.user!}
        }
        case 'REFRESH_ALL_PAGES':{
            return {...state, pages:action.payload.pages!}
        }
        default:{
            return state
        }
    }
}

/**
 * define const initialState of type DashboardStateType
 * @property-- @user and @Pages
 * @author -- Anil
 */
const initialState:DashboardStateType = {
    user:null,
    pages:null
}

export const DashboardContext = React.createContext({} as DashboardContextType);

export const DashboardProvider = ({children}:DashboardProviderType)=>{ 

    const [dashboardState, dispatch] = React.useReducer(reducer, initialState);

    /**
     * Add users into the realtime data-base
     * @params userId -- string: user id created during the authentication
     * @params firstName -- string: user first name
     * @params lastName -- string: user last name
     * @params phone -- number: user phone number
     * @author: Anil
     */
    // const addNewUser = (userId:string, firstName:string, lastName:string, phone:number, isVerified:boolean)=>{
    //     set(ref(db, `/${userId}`), {firstName, lastName, phone})
    //     .then(()=>{
    //         console.log('user successfully created');
    //         dispatch({type:'SET_USER', payload:{user:{id:userId, isVerified }}});
    //     }).catch((error)=>{
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.error('error code = ', errorCode);
    //         console.error('error message = ', errorMessage);
    //     });
    // }

    /**
     * To save new page or to update existing one based on the supplied value of pageId.
     * @description It will create new page or update existing page based on the pageId value.
     * If pageId is null it will create new page.
     * Else it will update existing page based on the corresponding pageId.
     * @params title:string -- title of page
     * @params pageAlias:string -- unique pageAlias name of the page based on the title
     * @params description:ReactQuill.Value -- value from quill editor as page description
     * @author Anil
     */
    const savePage = async (title:string, pageAlias:string, pageParent:number, description:ReactQuill.Value, pageImage:File, imageName:string, pageType:string, pageId?:number, pageLinkList?:number[], pageImageList?:number[])=>{
        //console.log(pageImage);
        //return false;
        var id =  pageId? pageId: Date.now();
        var isSave = false;
        // set image url as relative to the firebase storage
        var imageUrl = ''; 

        // save image file
        if(pageImage){
            const imgStorageRef = storageRef(storage, `images/${imageName}`);

            await uploadBytes(imgStorageRef, pageImage)
            .then(async ()=>{
                imageUrl = await getImageUrl(imageName);
                console.log('image uploaded successfully');
            }).catch((e)=>console.log(e));
        }
        
        // During edit, if pageType is link then reset its linklists to empty. 
        if(pageType && pageType === 'link'){
            pageLinkList = [];
            // pageImageList = [];
        }

        // During edit, if pageType is link then reset its linklists to empty. 
        if(pageType && pageType === 'image'){
            pageImageList = [];
            pageLinkList = [];
        }

        // save page constraints
        await set(ref(db, `/pages/${id}`), 
            {
                id,
                title, 
                pageAlias, 
                pageParent:pageType === 'link'?0:pageParent, 
                description, 
                pageType, 
                imageName: imageName?imageName:'', 
                imageUrl: imageUrl?imageUrl:'',
                pageLinkList:(pageLinkList && pageLinkList.length > 0) ? pageLinkList: [0],
                pageImageList:(pageImageList && pageImageList.length > 0) ? pageImageList: [0]
            })
        .then(()=>{
            alert('Page saved successfully.');
            isSave = true;
        }).catch((e)=>{
            console.log(e);
        });
        return isSave;
    }


    /**
     * To get all the available pages. It is an observable that will listen to the db for any change and triggers the onValue event.
     * @author: Anil
     */
    const getAllPage = ()=>{
        const pages = ref(db, 'pages');
        onValue(pages, (snapshot)=>{
            const data = snapshot.val();
            if(data){
                const pages:Page[] = Object.values(data);
                dispatch({type:'REFRESH_ALL_PAGES', payload:{pages}})
            }else{
                dispatch({type:'REFRESH_ALL_PAGES', payload:{pages:null}})
            }
        });
    }

    /**
     * To get the image url relative to the firebase storage reference
     * @param: imageName:string -- Name of the image
     * @author: Anil
     */
    const getImageUrl = async (imageName:string)=>{
        const imageUrl = await getDownloadURL(storageRef(storage, `images/${imageName}`))
            .then((url)=>{
                return url;
            }).catch((e)=>{
                console.error(e);
            });
        
        if(imageUrl)
            return imageUrl;
        else    
            return '';
    }

    /**
     * It deletes the page and associated image. It also revokes the page as parent from its child pages.
     * @param pageId id of the page to be deleted
     * @param pageImage name of the image associate to the page
     * @param pageChilds list of the childs pages of pageId
     * @author Anil
     */

    const deletePage = async (pageId:number, pageImage:string, pageChilds:DataRowType[])=>{
        // remove parentId from the child pages before deleting the page
        pageChilds?.forEach(async (child)=>{
            let childRef = ref(db,`pages/${child.pageId}`);
            await update(childRef, {pageParent:0}).then(()=>{   
                console.log('Parent revoked successfully');
            }).catch((e)=>{
                console.log(e);
            });
        });

        // remove the associated image from the firebase cloud storage

        // if(pageImage && pageImage.length>0){
        //     const imageRef = storageRef(storage, `images/${pageImage}`);
        //     await deleteObject(imageRef).then(()=>{   
        //         console.log('Image deleted successfully');
        //     }).catch((e)=>{
        //         console.log(e);
        //     });
        // }
        await deleteImageFromStorage(pageImage);

        // finally delete the page
        let pageRef = ref(db,`pages/${pageId}`);
        const isDeleted = await remove(pageRef).then(()=>{
                            return true;
                        }).catch((e)=>{
                            console.error(e);
                            return false;
                        });
        return isDeleted;
    }

    /**
     * To delete the image of a page. 
     * It will update the imageName field with "". And delete the image from the storage.
     * @param pageId page id of the page being edited
     * @param pageImage image name associated to the page
     * @return boolean value based on the success of the operation.
     * @author Anil
     */
    const deleteImage = async (pageId:number, pageImage:string)=>{
        let pageRef = ref(db,`pages/${pageId}`);
        // remove image name from page
        const isDeletedFromRTDB = await update(pageRef, {imageName:'', imageUrl:''}).then(()=>{
            console.log("Image deleted from rtdb");
            return true;
        }).catch((e)=>{
            console.log(e);
            return false;
        });

        // remove the image from storage
        await deleteImageFromStorage(pageImage);

        if(isDeletedFromRTDB){
            return true;
        }else{
            return false;
        }
    }

    /**
     * It will delete the image supplied to it from the storage.
     * @param pageImage name of the image to be deleted from the storage.
     * @return boolean value based on the success of the operation.
     * @author Anil
     */
    const deleteImageFromStorage = async (pageImage:string)=>{
        if(pageImage && pageImage.length>0){
            const imageRef = storageRef(storage, `images/${pageImage}`);
            await deleteObject(imageRef).then(()=>{   
                console.log('Image successfully deleted from storage');
            }).catch((e)=>{          
                console.log(e);
                console.log('Failed to delete Image from storage. May be the image reference dose not exists in the storage.');
            });
        }
    }

    /**
     * This function calls firebase signOut() for authentication
     * @author Anil
     */
    const logOut = ()=>{
        signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            if(currentUser){
                dispatch({type:'SET_USER', payload:{user:{id:currentUser.uid, isVerified:currentUser.emailVerified}}});
            }else{
                dispatch({type:'SET_USER', payload:{user:null}});
            }
        }); 

        return ()=>{
            unsubscribe();
        };        
    },[]);


    useEffect(()=>{
        getAllPage();
    },[])

    return(
        <DashboardContext.Provider value={{dashboardState, logOut, getAllPage, savePage, getImageUrl, deletePage, deleteImage, deleteImageFromStorage}}>
            {children}
        </DashboardContext.Provider>
    )
}
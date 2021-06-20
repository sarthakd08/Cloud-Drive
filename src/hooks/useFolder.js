import React, {useReducer, useEffect} from 'react';
import { database } from '../firebase';
import {useAuth} from '../contexts/AuthContext'

const initialState = {
    folderId: null,
    folder: null,
    childFolders: [],
    childFiles: []
}

const ROOT_FOLDER = {name: 'Root', id: null, path: []}

const ACTIONS = {
    SELECT_FOLDER: 'SELECT_FOLDER',
    UPDATE_FOLDER: 'UPDATE_FOLDER',
    SET_CHILD_FOLDERS: 'SET_CHILD_FOLDERS',
}

const reducer = (state, {type, payload}) => {
     switch(type) {
        case ACTIONS.SELECT_FOLDER:
            return initialState
        case ACTIONS.UPDATE_FOLDER:
            return {...state, folder: payload.folder}
        case ACTIONS.SET_CHILD_FOLDERS:
            return {...state, childFolders: payload.childFolders}
        default:
            return state  
        
     }
     
}

// useFolder Hook
export const useFolder = (folderId = null, folder = null) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {currentUser} = useAuth();

    useEffect(() => {
        // dispatching first to reset state. Meant to call when folderId and folder changes ie. new Folder is selected just clearing the state then.
        dispatch({type: ACTIONS.SELECT_FOLDER, payload: {folderId}})
    }, [folderId, folder])

    
    useEffect(() => {
        // Not sure: To reset state when only folderId changes ie. user folder details are not passed in hook, can be case when user manually types or root folder

        // Getting Folder data from firebase database.
        if (folderId == null) {
            return dispatch({
              type: ACTIONS.UPDATE_FOLDER,
              payload: { folder: ROOT_FOLDER },
            })
          }
      
        database.folders
        .doc(folderId)
        .get()
        .then(doc => {
            console.log('Current Folder', database.formatDoc(doc))
            dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: { folder: database.formatDoc(doc) },
            })
        })
        .catch(() => {
            dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: { folder: ROOT_FOLDER },
            })
        })
    }, [folderId])



    useEffect(() => {
        // Getting and setting to state all childfolders of current folder. 
        //Also, NOTE: onSnapshot returns us function, which we then use to clean it(stop listening) up everytime folderId changes, so we dont have previously selected folder's childFolder
        // onSnapshot returns us a listener
        // console.log('E2', folderId)
        if(folderId !== 'undefined') {

           const cleanup = database.folders
           .where("parentId", "==", folderId)
        //    .where("userId", "==", currentUser.id)
           .orderBy("createdAt")
           .onSnapshot(snapshot => {
               console.log('Snapshot doc', snapshot, snapshot.docs.map(database.formatDoc))
               dispatch({type: ACTIONS.SET_CHILD_FOLDERS, payload: {childFolders: snapshot.docs.map(database.formatDoc)}})
           })

           return () => cleanup()
       }

    }, [folderId, currentUser])

    return state;
}
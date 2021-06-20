import React, { useState } from "react"
import { Card, Button, Alert , Container} from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory, useParams } from "react-router-dom"
import NavbarComponent from '../navbar/Navbar';
import AddFolderButton from '../addFolderButton/AddFolderButton'
import Folder from '../folder/Folder'
import {useFolder} from '../../hooks/useFolder'
import FolderBreadCrumbs from "../folderBreadCrumbs/FolderBreadCrumbs";

export default function Dashboard() {
  const history = useHistory();
  const params = useParams()
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  console.log('useParamsss', params);
  const {folder, childFolders} = useFolder(params.folderId);
  // console.log('Dashboard folder', folder);
  // console.log('Dashboard childFolders', childFolders);
  // async function handleLogout() {
  //   setError("")

  return (
    <>
     <NavbarComponent />
     <Container fluid>
      <div className="d-flex align-items-center"> 
        <FolderBreadCrumbs currentFolder={folder} />
        <AddFolderButton currentFolder={folder} />
      </div>

        {folder?.name}
        {childFolders?.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div key={childFolder.id} className="p-2" style={{maxWidth: '250px'}}>
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
     </Container>
    </>
  )
}

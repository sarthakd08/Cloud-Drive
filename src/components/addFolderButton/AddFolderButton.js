import React, {useState, useContext} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolderPlus} from '@fortawesome/free-solid-svg-icons'
import {database} from '../../firebase'
import {useAuth} from '../../contexts/AuthContext'

function AddFolderButton({currentFolder}) {
    const {currentUser} = useAuth()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentFolder == null) return;

        //Create Folder in DataBase
        database.folders.add({
            name: name,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: [],
            createdAt: database.getCurrentTimestamp(),
        })

        setName('');
        setOpen(false)
    }

    return (
        <>
        <Button variant='outline-success' size="sm" onClick={openModal}>
            <FontAwesomeIcon icon={faFolderPlus} />
        </Button>
        <Modal show={open} onHide={closeModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Folder Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                    Close
                    </Button>
                    <Button variant="success" type="submit">
                    Add Folder
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
      </>
    )
}

export default AddFolderButton

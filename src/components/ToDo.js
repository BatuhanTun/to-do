import React from "react";
import { useState,useContext,useEffect } from "react";
import { Button, Modal, Card } from "react-bootstrap";
import DeleteApi from "../api/DeleteApi";
import { ToDoContext } from "../contexts/ToDoContext";

const ToDo = ({ todos,setShowAlertDelete,setShowAlertDeleteFailed }) => {
   
    const [show, setShow] = useState(false)
    const [todoId, setTodoId] = useState("")
    const { DeleteToDo } = useContext(ToDoContext);

    const handleCloseModal = () => setShow(false);

    useEffect(() => {
        handleCloseModal();
    }, [todos]);

    const handleShowModal = (todo_id) => {
        setShow(true);
        setTodoId(todo_id);
    };

    const deleteToDo = async () => {
        const check = await DeleteApi(todoId);
        if (check) {
            DeleteToDo(todoId);
            setShowAlertDelete(true);
        } else {
            setShowAlertDeleteFailed(true);
            setShowAlertDelete(true);
        }        
    };

    return (
        <>
            {todos.map((todo) => (
                <Card key={todo.id} style={{ width: '50rem' }}>
                    <Card.Body>
                        <Card.Title style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div className="ml-2" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                                {todo.title}
                            </div>
                            <div style={{ marginTop: '0.5rem' }}>{todo.created_date}</div>
                        </Card.Title>
                        <Card.Text>{todo.content}</Card.Text>
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: '1rem' }}>
                            <Button onClick={() => handleShowModal(todo.id)} className="btn btn-danger me-2">Sil</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>
                        Görevi Sil
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ textAlign: 'center' }}>
                        <span>Görevi silmek istediğinize emin misiniz?</span>
                    </div>
                    <div className="mt-3" style={{ textAlign: 'center' }}>
                        <Button className="btn btn-success me-2" onClick={handleCloseModal} variant="secondary">
                            İptal
                        </Button>
                        <Button onClick={deleteToDo} className="btn btn-danger" variant="secondary">
                            Sil
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ToDo;

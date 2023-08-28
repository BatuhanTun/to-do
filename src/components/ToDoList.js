import { useContext, useState, useEffect } from "react";
import ToDo from "./ToDo";
import { ToDoContext } from "../contexts/ToDoContext";
import { Button, Modal,Alert } from "react-bootstrap";
import AddToDoForm from "./AddToDoForm";
import Paginations from "./Peginations";

const ToDoList = () => {
    const { todos } = useContext(ToDoContext);
    const [showAlert,setShowAlert] = useState(false)
    const [showAlertDelete,setShowAlertDelete] = useState(false)
    const [show, setShow] = useState(false); // modal görünümü için
    const [loading, setLoading] = useState(true); // İstek tamamlanıp tamamlanmadığını belirlemek için
    
    const [currentPage,setCurrentPage] = useState(1);
    const [todosPerPage] = useState(5);

    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);
    
    useEffect(() => {
        if (todos.length > 0) {
            setLoading(false);
        }
        handleCloseModal();
    }, [todos]);
    
    if (loading) {
        return <p>Loading...</p>;
    }
  
  
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo,indexOfLastTodo);
    const totalPagesNum = Math.ceil(todos.length / todosPerPage);

    return (
        <>
            <div className="mb-2 mt-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4><b>Yapılacaklar Listesi</b></h4>
                <Button onClick={handleShowModal} className="btn btn-success" data-togle="modal">Yeni Görev Ekle</Button>
            </div>
            <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
                Göreviniz başarılı bir şekilde eklenmiştir.
            </Alert>
            <Alert show={showAlertDelete} variant="success" onClose={() => setShowAlertDelete(false)} dismissible>
                Göreviniz başarılı bir şekilde silinmiştir.
            </Alert>
            <div className="mb-5" style={{ display: "flex", flexWrap: "wrap" }}>
                <ToDo  todos={currentTodos} setShowAlertDelete={setShowAlertDelete}/>
            </div>
            <Paginations 
                pages={totalPagesNum} 
                setCurrentPage={setCurrentPage}
                currentTodos={currentTodos}
                todos={todos}
            />
            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>
                        Yeni Görev Ekle
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddToDoForm setShowAlert={setShowAlert}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal} variant="secondary">
                        Geri
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ToDoList;

import { useContext, useState, useEffect } from "react";
import ToDo from "./ToDo";
import { ToDoContext } from "../contexts/ToDoContext";
import { Button, Modal,Alert } from "react-bootstrap";
import AddToDoForm from "./AddToDoForm";
import Paginations from "./Peginations";

const ToDoList = () => {
    const { todos } = useContext(ToDoContext);
    const [showAlert,setShowAlert] = useState(false);
    const [showAlertFailed,setShowAlertFailed] = useState(false);
    const [showAlertDelete,setShowAlertDelete] = useState(false);
    const [showAlertDeleteFailed,setShowAlertDeleteFailed] = useState(false);
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
            <Alert className="mt-3" show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
                Göreviniz başarılı bir şekilde eklenmiştir.
            </Alert>
            <Alert className="mt-3" show={showAlertFailed} variant="danger" onClose={() => setShowAlertFailed(false)} dismissible>
                Göreviniz eklenirken bir sorun oluştu lütfen tekrar deneyiniz.
            </Alert>
            <Alert className="mt-3" show={showAlertDelete} variant="success" onClose={() => setShowAlertDelete(false)} dismissible>
                Göreviniz başarılı bir şekilde silinmiştir.
            </Alert>
            <Alert className="mt-3" show={showAlertDeleteFailed} variant="danger" onClose={() => setShowAlertDeleteFailed(false)} dismissible>
                Göreviniz silinirken bir sorun oluştu lütfen tekrar deneyiniz.
            </Alert>
            <div className="mb-5" style={{ display: "flex", flexWrap: "wrap" }}>
                <ToDo  todos={currentTodos} setShowAlertDelete={setShowAlertDelete} setShowAlertDeleteFailed={setShowAlertDeleteFailed}/>
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
                    <AddToDoForm setShowAlert={setShowAlert} setShowAlertFailed={setShowAlertFailed}/>
                    <Button className="ml-auto w-100 mt-2" onClick={handleCloseModal} variant="secondary">
                        Geri
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ToDoList;

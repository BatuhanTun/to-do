import { useState,useContext } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import CreateApi from "../api/CreateApi";
import { ToDoContext } from "../contexts/ToDoContext";


const AddToDoForm = ({setShowAlert}) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { CreateToDo } = useContext(ToDoContext);

    const handleSubmit = async () => {
        try {
            const addToDo = await CreateApi(title, content);
            CreateToDo(addToDo);
            setShowAlert(true);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div>
            <InputGroup>
                <Form.Control className="mb-2" type="Text" placeholder="Başlık *" value={title} onChange={e => setTitle(e.target.value)} required />
            </InputGroup>
            <InputGroup>
                <Form.Control className="mb-2" as="textarea" rows={10} placeholder="İçerik *" value={content} onChange={e => setContent(e.target.value)} required />
            </InputGroup>
            <Button className="ml-auto w-100" veriant="success" onClick={handleSubmit}>
                Ekle
            </Button>
        </div>
    )
}

export default AddToDoForm;
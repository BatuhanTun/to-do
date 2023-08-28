import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import CreateApi from "../api/CreateApi";
import { ToDoContext } from "../contexts/ToDoContext";


const AddToDoForm = ({ setShowAlert, setShowAlertFailed, setShow }) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { CreateToDo } = useContext(ToDoContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const addToDo = await CreateApi(title, content);

        if (addToDo) {
            CreateToDo(addToDo);
            setShowAlert(true);
        } else {
            setShowAlertFailed(true);
            setShow(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    className="mb-2"
                    type="Text"
                    placeholder="Başlık *"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    className="mb-2"
                    as="textarea"
                    rows={10}
                    placeholder="İçerik *"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                />
            </Form.Group>
            <Button className="ml-auto w-100" veriant="success" type="submit">
                Ekle
            </Button>
        </Form>
    )
}

export default AddToDoForm;
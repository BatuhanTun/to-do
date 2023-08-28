import { v4 as uuidv4 } from 'uuid';

const CreateApi = async (title, content) => {
    const currentDate = new Date().toLocaleString();

    const data = {
        "TableName": "to_do_list",
        "Item": {
            "id": uuidv4(),
            "title": title,
            "content": content,
            "created_date": currentDate
        }
    };

    try {
        const response = await fetch("https://4cy87dmhnb.execute-api.eu-north-1.amazonaws.com/dev/createtodo", {
            method: 'POST',
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        const addToDo =JSON.parse(responseData.body).Item;
       
        return addToDo;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default CreateApi;

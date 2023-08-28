import { useState, useEffect } from "react";

function GetToDoApi(url) {
    const [todo, setToDo] = useState(false);

    useEffect(() => {
        const data = {
            "TableName": "to_do_list",
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => setToDo(data))
        .catch(err => console.log(err));    
    },[url]);

    return todo;
}

export default GetToDoApi;

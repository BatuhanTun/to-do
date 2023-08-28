const DeleteApi = async (todoId) => {
    const data = {
        "TableName": "to_do_list",
        "Key": {
            "id": todoId
        }
    };

    try {
        const response = await fetch("https://4cy87dmhnb.execute-api.eu-north-1.amazonaws.com/dev/deletetodo", {
            method: 'POST',
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData !==true){
            return false;
        }

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export default DeleteApi;

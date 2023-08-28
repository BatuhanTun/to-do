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

        return responseData;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export default DeleteApi;

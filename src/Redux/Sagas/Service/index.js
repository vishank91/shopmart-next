//Create Record : use following code in case if payload doesn't have a file field
export async function createRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${collection}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ ...payload })
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

//Create Record : use following code in case if payload having a file field
export async function createMultipartRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${collection}`, {
            method: "POST",
            headers: {

            },
            body: payload
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

//GET Record
export async function getRecord(collection) {
    try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${collection}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

//Update Record : use following code in case if payload doesn't have a file field
export async function updateRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${collection}/${payload.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ ...payload })
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

//Update Record : use following code in case if payload having a file field
export async function updateMultipartRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${collection}/${payload.get("id")}`, {
            method: "PUT",
            headers: {

            },
            body: payload
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

//DELETE Record
export async function deleteRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${collection}/${payload.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}
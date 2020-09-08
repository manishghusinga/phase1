export const  productService = {
    getApiData
}

function getApiData(url) {
    let endPoint = "http://localhost:5000" + url;
    const GET_HEADER = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return fetch(endPoint, GET_HEADER)
        .then(resp => resp.json())

}

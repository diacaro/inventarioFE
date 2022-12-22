

const getListProduct = async () => {
    const response = await fetch(`http://localhost:8081/productos`,{
        method: 'GET'
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}

const deleteProduct = async (productId) => {
    const resp = await fetch(`http://localhost:8081/productos/delete/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',},
          body: JSON.stringify(productId)              
    });
    return  resp.json();
}



export {
    getListProduct,
    deleteProduct,

}
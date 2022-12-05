

const getListProduct = async () => {
    const response = await fetch(`http://localhost:8081/productos`,{
        method: 'GET'
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}



export {
    getListProduct,

}
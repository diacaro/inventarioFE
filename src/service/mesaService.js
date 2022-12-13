

const getListMesa = async () => {
    const response = await fetch(`http://localhost:8081/mesa`,{
        method: 'GET'
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}



export {
    getListMesa,

}
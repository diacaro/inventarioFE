

const getListInvernadero = async () => {
    const response = await fetch(`http://localhost:8081/invernadero`,{
        method: 'GET'
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}



export {
    getListInvernadero,

}


const getListMesa = async () => {
    const response = await fetch(`http://localhost:8081/mesa`,{
        method: 'GET'
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}

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


const createMesa = async(mesa) => {
    console.log(mesa)
     const data = { mesa}
    // const response = await 
    fetch(`http://localhost:8081/mesa`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',},
      body: JSON.stringify(mesa)
      });
    //  const data = await response.json();

    return  data;
    // return response.json();
    }



export {
    getListMesa,
    createMesa,

}
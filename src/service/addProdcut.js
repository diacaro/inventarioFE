const addProduct = async() => {
    //  const data = { nombre, clima, precio, categoria, mesa, invernadero, sede }
    const response = await fetch(`http://localhost:8081/productos`,{
      method:'POST',
    //   headers:{
    });
    const data = await response.json();
    //  body: JSON.stringify(data)

    return  data;
    }
    
export {
        addProduct, 
    } 
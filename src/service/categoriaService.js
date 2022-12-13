

const getListCategoria = async () => {
    const response = await fetch(`http://localhost:8081/categoria`,{
        method: 'GET'
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}
// const createCategoria = async (categoria) => {
//     console.log(categoria)
//     const resp = await fetch(`http://localhost:8081/categoria`, {
//         method: 'POST',
//         body: JSON.stringify(categoria)
  
//     });
//     return  resp.json();
// }

const createCategoria = async(categoria) => {
    console.log(categoria)
     const data = { categoria}
    // const response = await 
    fetch(`http://localhost:8081/categoria`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',},
      body: JSON.stringify(categoria)
      });
    //  const data = await response.json();

    return  data;
    // return response.json();
    }
    


export {
    getListCategoria,
    createCategoria,

}
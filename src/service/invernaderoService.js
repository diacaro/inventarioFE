

const getListInvernadero = async () => {
    const response = await fetch(`http://localhost:8081/invernadero`,{
        method: 'GET'
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}
const createInvernadero = async(invernadero) => {
    console.log(invernadero)
     const data = {invernadero}
    // const response = await 
    fetch(`http://localhost:8081/invernadero`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',},
      body: JSON.stringify(invernadero)
      });
    //  const data = await response.json();

    return  data;
    // return response.json();
    }

    export {
    
        getListInvernadero,
        createInvernadero,
    
    }


    const getListSede = async () => {
        const response = await fetch(`http://localhost:8081/invernadero`,{
            method: 'GET'
        });    
        const data = await response.json();
    //    console.log(data)
        return  data;
    }
    
    const createSede = async(sede) => {
        console.log(sede)
         const data = { sede}
        // const response = await 
        fetch(`http://localhost:8081/invernadero`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',},
          body: JSON.stringify(sede)
          });
        //  const data = await response.json();
    
        return  data;
        // return response.json();
        }
    
    
    


export {

    getListSede,
    createSede,

}
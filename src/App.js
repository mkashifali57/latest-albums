
import './App.css';
import {useEffect, useMemo, useState} from 'react'
function App() {
  const [data,setData]=useState()
  const [groupedData,setGroupedData]=useState()
  const [latest,setLatest]=useState()
useEffect(()=>{
  fetch('https://jsonplaceholder.typicode.com/photos').then(res=>res.json())
  .then((d)=>setData(d))
},[])
useMemo(()=>{
 let byAlbums = data?.reduce(function (r, a) {
    r[a.albumId] = r[a.albumId] || [];
    r[a.albumId].push(a);
    return r;
}, Object.create(null));
let lastThree =[]
  if(byAlbums){
    for(let i=1;i<=3;i++){
  let last= Object.keys(byAlbums)[Object.keys(byAlbums).length-i];
  lastThree.push(last)
    }
  setLatest(lastThree)
  let final=  lastThree?.map(item=>byAlbums?.[item].filter(i=>{
    if(byAlbums?.[item].indexOf(i)>byAlbums?.[item]?.length-3){
      return i
    }
  }))
  setGroupedData(final)
}
},[data])

  return (
    <div className="App">
      <div className='container'>
<div className='fs-1'>Album App</div>
    {groupedData?.map(item=>
    <div className='row m-2 justify-content-center'>
      {item.map(i=>
 
      <div  className={`col-5 m-2 p-1 ${groupedData.indexOf(item)===0?'green':groupedData.indexOf(item)===1?'blue':'purple'}`} >
        <img  className="rounded img-fluid"  src={i.url} alt=' '/>
    <div className='h5'>{i.title}</div>
    
    </div>)}</div>)}
   <div>

    </div>
      </div>
    </div>
  );
}

export default App;

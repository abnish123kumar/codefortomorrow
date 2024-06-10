import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [data, settododata]= useState('');
    const [list, setList] = useState([]);
    const [deleteId, setdeletid] = useState(0);
    const [editId, setEditId] = useState(0);

    const navigate = useNavigate();


    useEffect(()=>{

          fetch('http://localhost:4000/api/users/todo')
          .then(res=>res.json())
          .then(dat=>{
            console.log(dat)
            setList(dat);
          })
    },[deleteId,data])


    const addTodo = async(e)=>{
        // e.preventDefault();
     if(data.length >0 && editId == 0){
       
        await fetch('http://localhost:4000/api/user/addtodo',{
            method: 'post',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({data})})
            .then(dat=>{
                console.log(dat.status);
                // setList([...list])
                settododata('')
             
            })
     }
     if(editId >0){
        console.log(editId)
        await fetch(`http://localhost:4000/api/userupdate`,{
            method: 'put',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({data, editId})})
            .then(dat=>{
                console.log(dat.status);
                // setList([...list])
                settododata('')
             
            })
     }
    }
    const searchFromList  = async(e)=>{
        //  const d = [...list];
        const d = e.target.value;
        await fetch('http://localhost:4000/api/users/todo')
          .then(res=>res.json())
          .then(dat=>{
            console.log(dat)
            setList(dat);
            if(e.target.value == ''){
                console.log
                setList([...dat])
            }else{
                let arr = [];
            
            for(let i=0; i<list.length; i++){
                
                const x = list[i].todoItem;
                if(x.includes(d)){
                    arr.push(list[i]);
                }
            }
                setList([...arr]);
            }
          })
        // console.log(d)
        // const y = [...list]
        
       
        

    }

    const deleteItems = async(id)=>{
        await fetch(`http://localhost:4000/api/user/${id}`,{
            method: 'delete',
        })
        setdeletid(id)
    }

    const editItems = (id)=>{

        for(let i=0; i<list.length; i++){
            if(list[i].id == id){
                const a = list[i].todoItem;
                settododata(a);
            }
        }
       setEditId(id)
    }

    const setInputlistdata = (e)=>{
        settododata(e.target.value)
    }

    const logoutusers = ()=>{
         navigate('/')
    }

  return (
    <div className='todoPgae'>
    <div className='logOut'>
        <button onClick={logoutusers}>Logout</button>
    </div>
        <div className='searchItem'>
            <h2>Todo List</h2>
             <input type='text' placeholder='search' onChange={searchFromList}/>


        </div>

        <div className='showList'>
             {
                list?.map((item,i)=>{
                    return(
                        <div key={i} className='listItem'>
                            <span>{item.todoItem}</span> <button onClick={()=>deleteItems(item.id)}>delete</button> <button onClick={()=>editItems(item.id)}>edit</button>
                         </div>
                    )
                })
             }
        </div>
        <div>

        </div>
        <div className='addTodo'>
            <input type='text' placeholder='addTodo' value={data} onChange={setInputlistdata} />
            <button onClick={addTodo} >+</button>
        </div>
    </div>
  )
}

export default Dashboard

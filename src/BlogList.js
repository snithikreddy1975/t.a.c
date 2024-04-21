import React, { useEffect, useState } from 'react'
import Home from './Home'

function BlogList() {
    const [initialData,setInitial]=useState([])
    const [isLoading,setLoading]=useState(true)
    const apicall = async() =>{
        try{
            const response=await fetch('https://apis.ccbp.in/blogs')
            const data=await response.json()
            setInitial(data)
            setLoading(false)
        }
        catch(error){
            console.log(error)
        }

    }
    useEffect(()=>{
        apicall()
    },[])
  return (
    <div>
        {isLoading?"":(initialData.map(eachitem=><Home eachitem={eachitem} />))}
    </div>
    )
}

export default BlogList
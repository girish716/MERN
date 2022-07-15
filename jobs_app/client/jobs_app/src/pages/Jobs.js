import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Job from '../components/Job'

const Jobs = () => {
  const [job, setJob] = useState({
    position:"",
    company: "",
    status:"pending"
  })
  const [jobs, setJobs] = useState([])
  const [ isUpdateScreen, setIsUpdateScreen ] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [error, setError] = useState("")
  const [status, setStatus] = useState("")
  const [ info, setInfo ] = useState("No Jobs..")
  const token = localStorage.getItem('token')
  
  useEffect(()=>{
    fetchJobs()
  }, [])

  const fetchJobs = async ()=>{
    try {
      setInfo("Loading...")
      const res = await fetch(`https://jobs-api-1209.herokuapp.com/api/v1/jobs`,{
        method : "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      const data = await res.json()
      if(data.jobs.length===0){
        setInfo("No Jobs...")
      }else{
        setInfo("Loading...")
      }
      setJobs(data.jobs)
    } catch (error) {
      console.log(error)
    }
  }

  const onChange = (e)=>{
    setError("")
    setStatus("")
     const { name, value} = e.target
     setJob(prev=>{
      return {
        ...prev,
        [name]: value
      }
     })
  }

  const addOrUpdate = async ()=>{
    try{
      if(!isUpdateScreen){
         await fetch(`https://jobs-api-1209.herokuapp.com/api/v1/jobs`,{
          method : "POST",
          body : JSON.stringify(job),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
      }else{
        const res = await fetch(`https://jobs-api-1209.herokuapp.com/api/v1/jobs/${updateId}`,{
          method : "PATCH",
          body : JSON.stringify(job),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        if(res.status===400){
          setError("data can not be empty...")
          return
        }
        setIsUpdateScreen(false)
      }
        await fetchJobs()
        clear()
    }
    catch(err){
       console.log(err)
    }
  }

  const deleteJob  = async (id)=>{
      try{
        await fetch(`https://jobs-api-1209.herokuapp.com/api/v1/jobs/${id}`,{
          method : "DELETE",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        await fetchJobs()
    }
    catch(err){
      console.log(err)
    }
  }

  const clear = ()=>{
      setJob({
        position:"",
        company: "",
        status:"pending"
      })
  }



  return (
    <div>
      <Header/>
      <div className='jobs'>
        <section className='data-adder card'>
        <form>
          <h2>{isUpdateScreen?"Update Job":"Add Job"}</h2>
          <div>
            <label htmlFor='position'>Position</label>
            <input required name='position' type='text' onChange={onChange} value={job.position}></input>
          </div>
          <div>
            <label htmlFor='company'>Company</label>
            <input required name='company' type='text' onChange={onChange} value={job.company}></input>
          </div>
          <div>
            <label htmlFor='status'>Status</label>
            <select name="status" id="status" onChange={onChange}>
              <option value="interview">Interview</option>
              <option value="declined">Declined</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className='buttons'>
            <button type='button' className='custom add' onClick={()=>addOrUpdate()}>{isUpdateScreen?"Update":"Add"}</button>
            <button type='button' className='custom clear' onClick={()=>clear()}>Clear</button>
          </div>
        </form>
        <p className='status'>{status}</p>
        <p className='error'>{error}</p>
        </section>
        <section className='data' style={{display:isUpdateScreen?'none':'grid'}}>
          {!isUpdateScreen && jobs.length>0 ? jobs.map(job=>{
            return (<Job key={job._id} id={job._id} deleteJob={deleteJob} company={job.company} position={job.position} status={job.status} setUpdateId={setUpdateId} setIsUpdateScreen={setIsUpdateScreen} setJob={setJob}/>)
          }) : !isUpdateScreen && <h2>{info}</h2> }
        </section>
      </div>
    </div>
  )
}

export default Jobs
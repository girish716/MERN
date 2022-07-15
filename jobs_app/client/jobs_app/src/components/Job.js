import React from 'react'

const Job = (props) => {
  const { position, company, status, deleteJob, id, setUpdateId, setIsUpdateScreen, setJob} = props
  const date = new Date()
  const currentDate = date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()

  return (
    <div className='card job'>
        <div className='job-header'>
            <div className='big-letter'>{company && company[0]}</div>
            <div>
                <p className='position'>{company}</p>
                <p className='company'>{position}</p>
            </div>
        </div>
        <div className='job-body'>
            <div className='job-details'>
                <p className='job-status' data-color={status}>{status}</p>
                <p>{currentDate}</p>
            </div>
            <div className='job-buttons'>
                <button className='edit-button basic-button' onClick={()=>{
                    setUpdateId(id);
                    setIsUpdateScreen(true);
                    setJob({
                        position, company, status
                    })
                }}>Edit</button>
                <button className='delete-button basic-button' onClick={()=>deleteJob(id)}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default Job
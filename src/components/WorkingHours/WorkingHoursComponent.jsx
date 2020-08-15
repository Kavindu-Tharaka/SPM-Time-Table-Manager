import React,{useState} from 'react'
import DataTable from 'react-data-table-component';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import WorkingHoursForm from '../../components/WorkingHours/WorkingHoursForm'
import WorkingHoursTable from './WorkingHoursTable'

function WorkingHoursComponent() {
    const [workingDay,setWorkingDay] = useState([])
    const [day,setDay] = useState({})
    
    const addWorkingDay = (values) => {
    values.timeSlot = values.workingHours + ":" + values.workingMins
    console.log(values)

     setWorkingDay([...workingDay, values])
    }

    const updateWorkingDay = (v) => {
        // const new
    }
    
  
    return (
        <div className="container">
            <HeaderComponent title = {'Working Time'}/>
            <WorkingHoursForm addWorkingDay = {addWorkingDay} />
            <WorkingHoursTable workingDay = {workingDay} updateWorkingDay = {updateWorkingDay}/> 
        </div>
    )
}

export default WorkingHoursComponent

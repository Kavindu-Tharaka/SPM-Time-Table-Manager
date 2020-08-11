import React from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import WorkingHoursForm from '../../components/WorkingHours/WorkingHoursForm'

function WorkingHoursComponent() {
    return (
        <div className="container">
            <HeaderComponent title = {'Working Time'}/>
            <WorkingHoursForm/>

        </div>
    )
}

export default WorkingHoursComponent

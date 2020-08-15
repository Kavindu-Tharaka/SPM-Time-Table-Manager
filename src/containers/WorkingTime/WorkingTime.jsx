import React, {useEffect} from 'react'
import WorkingHourComponent from '../../components/WorkingHours/WorkingHoursComponent'

function WorkingTime(props) {
    useEffect(() => {
        props.setShowSubMenu(false)
    }, [])


    return (
        <div >
            <WorkingHourComponent/>
        </div>
    )
}

export default WorkingTime

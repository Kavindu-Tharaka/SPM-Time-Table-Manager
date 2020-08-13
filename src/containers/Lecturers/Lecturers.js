import React from 'react'
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import './Lecturers.css'
const Lecturers = () => {
    return (
        <div className="container">
            <ContentHeader header={'Lecturers'} />
            <br />
           <div className="d-flex ">  {/*justify-content-between */}

                <div>
                    <p className="mb-1">Name</p>
                    <input style={{ width: '100%' }}/>
                </div>

                <div style={{marginLeft:'6.5%'}}>
                    <p className="mb-1">Faculty</p>
                    <div className="">
                        <select className="custom-select" id="faculty-select" style={{ width:'118%',height:'50%',fontSize:'60%'}}>
                            <option selected value="1">Computing</option>
                            <option value="1">Engineering</option>
                            <option value="2">Business</option>
                            <option value="3">Humanities & Scienes</option>
                            <option value="3">Graduate Studies & Research</option>
                            <option value="3">School of Architecture</option>
                            <option value="3">School of Law</option>
                            <option value="3">School of Hospitality & Culinary</option>
                        </select>
                    </div>
                </div>

                <div style={{marginLeft:'12%'}}>
                    <p className="mb-1">Center</p>
                    <div className="">
                        <select  className="custom-select" style={{ height:'50%',fontSize:'60%',width:'185%'}}>
                            <option selected value="1">Malabe</option>
                            <option value="1">Metro Campus</option>
                            <option value="2">SLIIT Academy</option>
                            <option value="3">Mathara</option>
                            <option value="3">Kandy</option>
                            <option value="3">Kurunagala</option>
                            <option value="3">Jaffna</option>
                        </select>
                    </div>
                </div>

                <div style={{marginLeft:'17.5%'}}>
                    <p className="mb-1">Level</p>
                    <div className="">
                        <select className="custom-select" style={{ height:'50%',fontSize:'60%',width:'144%' }}>
                            <option selected value="1">Professor</option>
                            <option value="1">Assistant Professor</option>
                            <option value="2">Senior Lecturer(HG)</option>
                            <option value="3">Senior Lecturer</option>
                            <option value="3">Lecturer</option>
                            <option value="3">Assistant Lecturer</option>
                            <option value="3">Instructors</option>
                        </select>
                    </div>
                </div>

            </div>{/*first row*/}
            <br />
            <div className="d-flex justify-content-between">
                <div>
                    <p className="mb-1">Employee Id</p>
                    <input />
                </div>

                <div style={{marginLeft:'6.5%'}}>
                    <p className="mb-1">Department</p>
                    <div className="">
                        <select className="custom-select" style={{ height:'50%',fontSize:'60%',maxWidth:'68.2%',minWidth:'72%'}}>
                            <option selected value="1">Department Of Information Technology</option>
                            <option value="1">DEPARTMENT OF COMPUTER SCIENCE & SOFTWARE ENGINEERING</option>
                            <option value="2">DEPARTMENT OF COMPUTER SYSTEMS ENGINEERING</option>
                            <option value="3">DEPARTMENT OF ELECTRICAL & ELECTRONIC ENGINEERING</option>
                            <option value="3">DEPARTMENT OF MECHANICAL ENGINEERING</option>
                            <option value="3">DEPARTMENT OF MATERIALS ENGINEERING</option>
                            <option value="3">DEPARTMENT OF CIVIL ENGINEERING</option>
                            <option value="3">DEPARTMENT OF QUANTITY SURVEYING</option>
                            <option value="3">SLIIT SCHOOL OF ARCHITECTURE</option>
                        </select>
                    </div>
                </div>
                <div style={{paddingRight:'15%'}}>
                    <p className="mb-1">Building</p>
                    <div className="">
                        <select className="custom-select" style={{ minWidth:'150%',fontSize:'60%',height:'50%' }}>
                            <option selected value="1">Main Building</option>
                            <option value="1">New Building</option>
                            <option value="2">Engineering Building</option>
                            <option value="3">Buisnees Faculty Building</option>
                            <option value="3">CAHM</option>
                        </select>
                    </div>
                </div>

                <div>
                    <p className="mb-1">Rank</p>
                    <input readonly="readonly"/>
                </div>

            </div>{/* second row */}

        </div>
    )
}

export default Lecturers

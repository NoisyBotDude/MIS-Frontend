import './StudentProfile.scss';
import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import Education from './components/Education';
import Skills from './components/Skills';
import JobExp from './components/JobExp';
import HigherStudies from './components/HigherStudies';
import Modal from '@material-ui/core/Modal';
import Certifications from './components/Certifications';
import AddressInfo from './components/Address';
import ScoreCard from './components/ScoreCard';
import AdditionalInfo from './components/Aditional';
import LinearProgress from '@material-ui/core/LinearProgress';
import SocialInfo from './components/SocialInfo';
import { useParams } from 'react-router-dom';
import { Button, Backdrop, Icon, TextField } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import profilePic from "../StudentProfile/profile.jpeg"
import axios from 'axios';
import PlacementInfo from './components/Placement';
import ExamsInfo from './components/Exams';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '30px'
    },
    textField: {
        width: '500px'
    },
    editBtn: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    detailsHeader: {
        display: 'flex',
    },
    credHeader: {
        alignSelf: 'center',
        marginRight: '1rem',
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    iconBtn: {
        backgroundColor: 'rgb(233, 233, 233)',
        alignSelf: 'center'
    },
    editIcon: {
        color: '#0066ff'
    },
    detailsBox: {
        marginTop: '1.2rem',
    },
    badge: {
        backgroundColor: '#0066ff',
        color: 'white',
        fontWeight: '500',
        borderRadius: '5px',
        marginRight: '0.5rem',
        marginBottom: '0.7rem',
        display: 'inline-block',
        padding: '10px',
        fontSize: '0.8rem',
        lineHeight: '1',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'baseline',
    },
    badgeText: {
        display: 'flex',
        flexDirection: 'row',
    },
    InfoModal: {
        backgroundColor: 'white',
        width: '70%',
        height: '70%',
        border: '1px solid black',
        overflowY: 'scroll'
    },
    closeCont: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    modalForm: {
        display: 'inline-block',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left'
    }
}));

const baseurl = process.env.REACT_APP_BASE_URL;

const semesterList = [
    {
      value: "1st",
      label: "1"
    },
  
    {
      value: "2nd",
      label: "2"
    },
  
    {
      value: "3rd",
      label: "3"
    },
  
    {
      value: "4th",
      label: "4"
    },
  
    {
      value: "5th",
      label: "5"
    },
  
    {
      value: "6th",
      label: "6"
    },
  
    {
      value: "7th",
      label: "7"
    },
  
    {
      value: "8th",
      label: "8"
    }
  ]


export default function StudentProfile() {

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({})

    const [currStudentId, setCurrStudentId] = useState("")
    const [fname, setFname] = useState(null)
    const [lname, setLname] = useState(null)
    const [branch, setBranch] = useState(null)
    const [rollNo, setRollNo] = useState(null)
    const [batch, setBatch] = useState(null)
    const [gender, setGender] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [currentSem, setCurrentSem] = useState(null)

    const [personalInfo, setPersonalInfo] = useState(null)

    const [openPerInfoModal, setOpenPerInfoModal] = useState(false)
    const [snakeOpen, setSnackOpen] = useState(false)

    let { roll } = useParams();
    var headers = {"headers" : { "Authorization": `Bearer ${localStorage.getItem("access-token")}`}}

    useEffect(() => {
        const fetch = () => {
            setLoading(true);
            console.log("making request to : ",`${baseurl}/student/${roll}`)
            axios.get(`${baseurl}/student/${roll}`, headers)
            .then(response => {
                response = response.data;
                console.log(response);
                setRollNo(response.roll_no)
                console.log("first" + response.roll_no)
                setProfile(response)
            })
            .catch(e => {
                console.log(e.message);
            })
            .finally(() => {
                setLoading(false);
            })
        }
        fetch();
    }, [])

    const handlePerInfoModalClose = () => {
        setOpenPerInfoModal(false)
        setFname(null)
        setLname(null)
        setBranch(null)
        setRollNo(null)
        setBatch(null)
        setGender(null)
        setEmail(null)
        setPhone(null)
        setCurrentSem(null)
    }

    const handleUpdatePersonalInfo = (e) => {
        e.preventDefault();

        const data = {
            "student_id": currStudentId,
            "fname": fname,
            "lname": lname,
            "branch": branch,
            "roll_no": rollNo,
            "batch": batch,
            "gender": gender,
            "email": email,
            "phone": phone,
            "current_sem": currentSem
        }
        console.log(data);

        axios.put(`${baseurl}/student/update/personal`,data, headers )
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e.message);
        })
        .finally(() => {
            setOpenPerInfoModal(false);
            setFname(null);
            setLname(null);
            setBatch(null);
            setBranch(null);
            setGender(null);
            setEmail(null);
            setPhone(null);
            setCurrentSem(null)
            updateInfoState()
        })
    }

    const handleOpenUpdatePersonalInfo = () => {
        setOpenPerInfoModal(true)

        setCurrStudentId(profile.student_id)
        setFname(profile.fname)
        setLname(profile.lname)
        setRollNo(profile.roll_no)
        setBatch(profile.batch)
        setBranch(profile.branch)
        setGender(profile.gender)
        setEmail(profile.email)
        setPhone(profile.phone)
        setCurrentSem(profile.current_sem)
    }

    console.log(profile.higher_studies)

    const updateInfoState = () => {

        const fetch = () => {
            setLoading(true);
            axios.get(`${baseurl}/student/${rollNo}`, headers)
            .then(response => {
                response = response.data;
                setRollNo(response.roll_no)
                setProfile(response)
            })
            .catch(e => {
                console.log(e.message);
            })
            .finally(() => {
                setLoading(false);
            })
        }
        fetch();

}

    const classes = useStyles();
    return (
        <section className='student-profile'>
            {
                loading ?
                <LinearProgress /> :
                <>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className='profile-box'>
                                <center>
                                    <div className='avatar'>
                                        <img alt="Remy Sharp" className='img-fluid' src={profilePic} style={{width: '200px', height: 'auto'}} />
                                    </div>
                                </center>
                                <div className={classes.editBtn}>
                                    <IconButton className={classes.iconBtn} onClick={handleOpenUpdatePersonalInfo}>
                                        <EditIcon className={classes.editIcon}/>
                                    </IconButton>
                                </div>
                                <div className='general'>
                                    {/* {console.log(profile)} */}
                                    <div className='student-name'>{profile.fname} {profile.lname}</div>
                                    <div>{roll}</div>
                                    <div>{profile.branch}</div>
                                    <div>{profile.current_sem} Semester</div>
                                    <div>{profile.phone}</div>
                                    <div className='email'>{profile.email}</div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-8 details-main-container'>
                            <div className='row details-container'>
                                {/* <Skills /> */}
                                <Education 
                                    profile={profile}
                                    updateInfoState={updateInfoState}
                                />
                                {/* <JobExp /> */}
                                {/* <Certifications /> */}
                                <AddressInfo 
                                    permanent_address={profile.permanent_address}
                                    student_id = {profile.student_id}
                                    present_address={profile.present_address}
                                    updateInfoState={updateInfoState}
                                />
                                <ScoreCard 
                                    student_id={profile.student_id}
                                    score={profile.score_cards.length>0 ? profile.score_cards[0].scorecard_link: null}
                                />
                                <AdditionalInfo 
                                    profile={profile}
                                    updateInfoState={updateInfoState}
                                />
                                {/* <SocialInfo /> */}
                                <HigherStudies 
                                    higher_studies={profile.higher_studies}
                                    student_id = {profile.student_id}
                                    updateInfoState={updateInfoState}
                                />
                                <PlacementInfo 
                                    student_id = {profile.student_id}
                                    job_info = {profile.job_info}
                                    internship_info = {profile.internship_info}
                                    job_type = {profile.job_type}
                                    updateInfoState={updateInfoState}
                                />
                                <ExamsInfo 
                                    student_id = {profile.student_id}
                                    competitive_exams = {profile.competitive_exams}
                                    updateInfoState={updateInfoState}
                                />
                            </div>
                        </div>
                    </div>
                </>
                
            }
            <>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    open={openPerInfoModal}
                    onClose={handlePerInfoModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 200,
                    }}
                >
                    <Fade in={openPerInfoModal}>

                        <div className={classes.InfoModal}>
                        <div className={classes.closeCont}>
                                <IconButton onClick={handlePerInfoModalClose}>
                                    <CloseIcon />
                                </IconButton>
                            </div>

                            <div style={{
                                padding: '20px',
                            }}>
                                <div style={{
                                    display: 'block',
                                    textAlign: 'center'
                                }}>
                                    <form onSubmit={handleUpdatePersonalInfo } autoComplete='off' className={classes.modalForm}  >
                                        <div className={classes.input}>
                                            <TextField className={classes.textField} id="outlined-basic" placeholder="First Name" variant="outlined" value={fname} onChange={e => setFname(e.target.value)} />
                                        </div>

                                        <div className={classes.input}>
                                            <TextField className={classes.textField} id="outlined-basic" variant="outlined" placeholder="Last Name" value={lname} onChange={e => setLname(e.target.value)} />
                                        </div>

                                        <div className={classes.input}>
                                            <TextField className={classes.textField} id="outlined-basic" variant="outlined" placeholder="Roll No" value={rollNo} onChange={e => setRollNo(e.target.value)} />
                                        </div>

                                        <div className={classes.input}>
                                            <TextField className={classes.textField} id="outlined-basic" variant="outlined" placeholder="Batch" value={batch} onChange={e => setBatch(e.target.value)} />
                                        </div>

                                        <div className={classes.input}>
                                            <TextField className={classes.textField} id="outlined-basic" variant="outlined" placeholder="Branch" value={branch} onChange={e => setBranch(e.target.value)} />
                                        </div>

                                        <div className={classes.input}>
                                            <TextField label="Semester" className={classes.textField} id="outlined-basic" select variant="outlined" placeholder="Current Semester" value={currentSem} onChange={e => setCurrentSem(e.target.value)}
                                            >
                                                {semesterList.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}   
                                            </TextField>
                                        </div>

                                        <div className={classes.input}>
                                            <TextField className={classes.textField} id="outlined-basic" variant="outlined" placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} />
                                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="Session Start Date"
                                                    format="dd/MM/yyyy"
                                                    value={startDate}
                                                    onChange={handleStartDate}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider> */}
                                        </div>

                                        <div className={classes.input}>
                                            <TextField className={classes.textField} id="outlined-basic" variant="outlined" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                        </div>

                                        <div className={classes.input}>
                                            <TextField className={classes.textField} id="outlined-basic" variant="outlined" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                                        </div>
                                        <Button
                                            variant='outlined'
                                            type='submit'
                                            style={{
                                                marginRight: '1.2rem'
                                            }}
                                        >
                                            Save
                                        </Button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </>
        </section>
    );
}

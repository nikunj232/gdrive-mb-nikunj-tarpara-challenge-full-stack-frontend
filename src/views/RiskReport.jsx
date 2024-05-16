import React, { useEffect, useState } from 'react'
import { documentSvg, externalSvg, fiFileSvg, fiGlobeSvg, fiLockWhiteSvg, fiUsersGraySvg, fiUsersSvg, gDriveSvg, linkedinSvg, metomicLogoSvg, riskScoreSvg, twitterSvg } from '../assets/images'
import { axiosApi } from '../helper/axiosApi';
import { isUserLoggedIn, setAccessToken } from '../helper/authFunctions';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GetFileIcon from './GetFileIcon';
//for accordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// for modal
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

const RiskReport = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    const redirectUrl = new URL(window.location.href);
    redirectUrl.search = ''; // Remove query string (including token)
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false)
    const [reportData, setReportData] = useState(null)
    const [expanded, setExpanded] = useState('panel1')
    const [modalOpen, setModalOpen] = useState(false);

    const handleClickOpen = () => {
      setModalOpen(true);
    };
  
    const handleClose = () => {
      setModalOpen(false);
    };

    const getReport = async () => {

        const tempAccessToken = localStorage.getItem("access_token")
        axiosApi.defaults.headers.common["Authorization"] = `Bearer ${tempAccessToken}`
        setIsLoading(true)
        try {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
            const res = await axiosApi.get('report')
            setReportData(res.data.data)
            console.log(res.data.data, "reposrt data");
        } catch (error) {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
            setIsLoading(false)
            console.log(error, "error fetching report!");
        }
    }

    const revokeAccess = async() => {
        setModalOpen(false)
        try {
            const res = await axiosApi.delete('/auth/revoke-access')
            localStorage.removeItem('access_token')
            navigate('/')
        } catch (error) {
            // navigate('/')
                        
        } 
    }
    useEffect(() => {
        if (!!token) {
            // alert(token)
            localStorage.setItem("access_token", token)
            window.location.href = redirectUrl.toString();
        }
        
        if (isUserLoggedIn()) {
            getReport()
        }else if (!token && !isUserLoggedIn()) {
            navigate('/')
        }
    }, [])
    
    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (<>
        <div className='bg-[#eeeff4] min-h-screen'>
            <header className='pt-10 pb-60 bg-[#58469b]'>
                <div className='px-8 mx-auto flex justify-between '>
                    <button onClick={() => setModalOpen(true)} className='border border-[#974a63] text-[#ff9491] px-6 py-2 rounded-md'> Revoke Access</button>
                    <a href="/"><img src={metomicLogoSvg} alt="metomic logo" /></a>
                    <div className='flex items-center gap-4 justify-end'>
                        <a className='text-white/75' href="#">Terms & Conditions</a> 
                        <a className='text-white/75' href="#">Privacy Policy</a> 
                        <div className='flex items-center gap-2 justify-end'>
                            <a href="#">
                                <img className='whiteSvgIcon w-6 filter-[invert(100%) sepia(0%) saturate(7458%) hue-rotate(125deg) brightness(111%) contrast(94%)]' src={linkedinSvg} alt="linkedin" />
                            </a> 
                            <a href="#">
                                <img className='whiteSvgIcon w-5' src={twitterSvg} alt="twitter" />
                            </a> 
                        </div>
                    </div>
                </div>
            </header>
            <div className='px-8 -mt-40 mx-auto pb-40'>
                <div className='px-8 flex items-center justify-start gap-4 mb-4'>
                    <img className='w-5' src={fiLockWhiteSvg} alt="lock icon" />
                    <p className='text-white font-medium'>We do not scan the contents of files. Scan results are never stored.</p>
                </div>
                <div className='bg-riskpage-container py-10 rounded-lg'>
                    <div className="flex justify-between items-center px-10">
                        <div className="flex justify-between items-center gap-4">
                            <img className='w-8' src={gDriveSvg} alt="google drive" />
                            <p className='text-2xl'>Google Drive Risk Report</p>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <span className='text-sm text-black/75 font-semibold'>Risk Score:</span>
                            {
                                !isLoading 
                                ?<div className={`risk-score-container flex justify-end gap-2 rounded-md bg-orange/15 px-3 py-1.5 ${String(reportData?.riskScore).toLowerCase()}`}>
                                    <img className={`w-6 ${String(reportData?.riskScore).toLowerCase()}`} src={riskScoreSvg} alt="google drive" />
                                    <span>{reportData?.riskScore ?? "Calculating"}</span>
                                </div>
                                :<div className="flex items-center justify-end gap-2 rounded-md bg-dark-gray/25 px-3 py-1.5">
                                    <span className='border-2 w-4 h-4 rounded-full border-dark-gray'></span>
                                    <span>Calculating</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='bg-dark-gray/40 h-[1px] w-full my-8'></div>
                    <div className='px-10 grid grid-cols-4 gap-3'>
                        <div className='flex items-center justify-center w-[25% - 1rem] border border-gray p-6'>
                            {
                                !isLoading
                                ?<div className=''>
                                    <p className='text-5xl font-light h-10 text-center mb-10'>{reportData?.percentageRiskScore ?? 0}</p>
                                    <p className='text-base font-semibold mb-1 text-black/80'>Risk Score</p>
                                </div>
                                :<div className='animate-pulse w-4/5 h-32 rounded-lg my-4 mx-auto bg-dark-gray/15'></div>
                            }
                        </div>
                        <div className='hover:bg-hover-back w-[25% - 1rem] flex flex-col justify-start items-center border border-gray p-6'>
                            <div className='bg-purple-50 p-1.5 rounded-full'>
                                <img className='w-5' src={fiGlobeSvg} alt="fi globe" />
                            </div>
                            {
                                !isLoading && reportData?.totalPublicFile  > -1
                                ?<h2 className='text-5xl font-light my-5'>{reportData.totalPublicFile ?? 0}</h2>
                                :<div className='animate-pulse w-3/4 h-24 rounded-lg my-4 mx-auto bg-dark-gray/15'></div>
                            }
                            <p className='text-base font-semibold mb-1 text-black/80'>Public files</p>
                            <p className='font-medium text-xs text-black/50 m-0 text-center'>Files that are available to anyone over the web via link sharing.</p>
                        </div>
                        <div className='hover:bg-hover-back w-[25% - 1rem] flex flex-col justify-start items-center border border-gray p-6'>
                            <div className='bg-slate-100 p-1.5 rounded-full'>
                                <img className='w-5' src={fiUsersSvg} alt="fi globe" />
                            </div>
                            {
                                !isLoading && reportData?.totalUserAccess  > -1
                                ?<h2 className='text-5xl font-light my-5'>{reportData?.totalUserAccess ?? 0}</h2>
                                :<div className='animate-pulse w-3/4 h-24 rounded-lg my-4 mx-auto bg-dark-gray/15'></div>
                            }
                            <p className='text-base font-semibold mb-1 text-black/80'>Peopple with access</p>
                            <p className='font-medium text-xs text-black/50 m-0 text-center'>People who have access to files in your Google Drive.</p>
                        </div>
                        <div className='hover:bg-hover-back w-[25% - 1rem] flex flex-col justify-start items-center border border-gray p-6'>
                            <div className='bg-amber-50 p-1.5 rounded-full'>
                                <img className='w-5' src={fiFileSvg} alt="fi globe" />
                            </div>
                            {
                                !isLoading && reportData?.totalExternallySharedFile > -1
                                ?<h2 className='text-5xl font-light my-5'>{reportData?.totalExternallySharedFile}</h2>
                                :<div className='animate-pulse w-3/4 h-24 rounded-lg my-4 mx-auto bg-dark-gray/15'></div>
                            }
                            <p className='text-base font-semibold mb-1 text-black/80'>Files shared externally</p>
                            <p className='font-medium text-xs text-black/50 m-0 text-center'>Files that have been shared directly other people.</p>
                        </div>
                    </div>
                    {
                        !isLoading && reportData ? <>
                            <div className='bg-dark-gray/40 h-[1px] w-full my-12'></div>
                            <div className='px-10'>
                                <div className='text-3xl font-light mb-4'>
                                    1. {reportData?.totalPublicFile} files are publicly accessible for anyone with the link
                                </div>
                                <TableContainer className='!bg-riskpage-container' component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Filename</TableCell>
                                            <TableCell>Access Setting</TableCell>
                                            <TableCell>Shared with</TableCell>
                                            <TableCell>Created by</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {reportData && reportData?.publicFile ? reportData?.publicFile.map((row) => (
                                                <TableRow
                                                key={row.name}
                                                className='group'
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell className='group' component="th" scope="row">
                                                        <a href={row.web_view_link} className='flex gap-2 items-center'>
                                                            <GetFileIcon type={row.type}/>
                                                            <span className='group-hover:underline group-hover:text-primary'>
                                                                {row.filename}
                                                            </span>
                                                            <img class="invisible w-3 h-3 ml-3 group-hover:block" src={externalSvg}/>
                                                        </a>
                                                    </TableCell>
                                                    <TableCell>
                                                        <a href={row.web_view_link}>
                                                            <span className='text-nowrap px-4 py-2 bg-gray rounded-full'>Anyone with link</span>
                                                        </a>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className='flex gap-2 items-center justify-start'>
                                                            <img className='w-5' src={fiUsersGraySvg} alt="users" srcset="" />
                                                            <span className='text-base'>{row.shared_with}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <a href={`mailto:${row.owner.emailAddress}?subject=Your GDrive file${row.filename}&body=Hi nikunj, I found this file in my Google Drive account, which was created by you: "I am sharing  'cd practicls(all) (2) ' with you"I found it using the Metomic Google Drive Scanner`}  className='group max-w-72 flex justify-between gap-4 items-center'>
                                                            <div className='group-hover:underline flex items-center justify-start gap-2'>
                                                                <img className='w-8 rounded-full' src={row?.owner?.photoLink} alt="" srcset="" />
                                                                <span className='text-wrap group-hover:underline group-hover:text-primary'>{row?.owner?.displayName}</span>
                                                            </div>
                                                            <div class="mr-2 flex items-center justify-end xl:flex">
                                                                <svg class="w-5 h-5 ml-2 text-black group-hover:text-primary-700" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M2.66732 2.6665H13.334C14.0673 2.6665 14.6673 3.2665 14.6673 3.99984V11.9998C14.6673 12.7332 14.0673 13.3332 13.334 13.3332H2.66732C1.93398 13.3332 1.33398 12.7332 1.33398 11.9998V3.99984C1.33398 3.2665 1.93398 2.6665 2.66732 2.6665Z" stroke="currentColor" stroke-opacity="0.75" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                    <path d="M14.6673 4L8.00065 8.66667L1.33398 4" stroke="currentColor" stroke-opacity="0.75" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                </svg>
                                                                <img class="invisible w-4 h-4 ml-3 group-hover:block" src={externalSvg}/>
                                                                
                                                            </div>
                                                        </a>
                                                    </TableCell>
                                                </TableRow>
                                            )): <></>}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <div className='bg-dark-gray/40 h-[1px] w-full my-12'></div>
                            <div className='px-10'>
                                <div className='text-3xl font-light mb-4'>
                                    2. There are {reportData?.totalUserAccess} people with access to your Google Drive
                                </div>
                                {
                                    reportData?.userAccessFile?.map((user, i) => {
                                        return (<>
                                            <Accordion className='bg-riskpage-container mb-4 shadow-theme rounded-md' expanded={expanded ==`panel${i}`} onChange={handleAccordionChange(`panel${i}`)}>
                                                <AccordionSummary
                                                className='!bg-riskpage-container'
                                                    expandIcon={<ArrowDropDownIcon />}
                                                    aria-controls={`panel${1}-content`}
                                                    id={`panel${i}-header`}
                                                >
                                                    <div className='flex items-center justify-between w-full py-5 '>
                                                        <div className='flex gap-4 items-center justify-center'>
                                                            <img className='w-8 rounded-full' src={user.photo} alt={user.display_name}  />
                                                            <span className='text-sm font-medium'>{user.display_name}</span>
                                                            <span className='text-black/70'>{user.email}</span>
                                                        </div>
                                                        <div className='mr-4 flex items-center justify-end gap-2'>Has access to 

                                                            <span className='flex items-center gap-1 justify-end px-2 py-1 rounded-md bg-dark-gray/20'>
                                                                <span className='text-sm'>{user?.file?.length}</span>
                                                                <img className='w-4' src={documentSvg} alt="page" srcset="" />
                                                            </span>
                                                            files
                                                        </div>
                                                    </div>
                                                </AccordionSummary>
                                                <AccordionDetails className='!px-0 !bg-riskpage-container'>
                                                    <TableContainer className='!bg-riskpage-container m-0 !shadow-none' component={Paper}>
                                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                            <TableHead>
                                                            <TableRow>
                                                                <TableCell>Filename</TableCell>
                                                                <TableCell>Access Setting</TableCell>
                                                                <TableCell>Shared with</TableCell>
                                                                <TableCell>Created by</TableCell>
                                                            </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {user && user?.file ? user?.file.map((row) => (
                                                                    <TableRow
                                                                    key={row.name}
                                                                    className='group'
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell className='group' component="th" scope="row">
                                                                            <a href={row.web_view_link} className='flex gap-2 items-center'>
                                                                                <GetFileIcon type={row.type}/>
                                                                                <span className='group-hover:underline group-hover:text-primary'>
                                                                                    {row.filename}
                                                                                </span>
                                                                                <img class="invisible w-3 h-3 ml-3 group-hover:block" src={externalSvg}/>
                                                                            </a>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <a href={row.web_view_link}>
                                                                                <span className='text-nowrap px-4 py-2 bg-gray rounded-full'>Anyone with link</span>
                                                                            </a>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <div className='flex gap-2 items-center justify-start'>
                                                                                <img className='w-5' src={fiUsersGraySvg} alt="users" srcset="" />
                                                                                <span className='text-base'>{row.shared_with}</span>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <a href={`mailto:${row.owner.emailAddress}?subject=Your GDrive file${row.filename}&body=Hi nikunj, I found this file in my Google Drive account, which was created by you: "I am sharing  'cd practicls(all) (2) ' with you"I found it using the Metomic Google Drive Scanner`}  className='group max-w-72 flex justify-between gap-4 items-center'>
                                                                                <div className='group-hover:underline flex items-center justify-start gap-2'>
                                                                                    <img className='w-8 rounded-full' src={row?.owner?.photoLink} alt="" srcset="" />
                                                                                    <span className='text-wrap group-hover:underline group-hover:text-primary'>{row?.owner?.displayName}</span>
                                                                                </div>
                                                                                <div class="mr-2 flex items-center justify-end xl:flex">
                                                                                    <svg class="w-5 h-5 ml-2 text-black group-hover:text-primary-700" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M2.66732 2.6665H13.334C14.0673 2.6665 14.6673 3.2665 14.6673 3.99984V11.9998C14.6673 12.7332 14.0673 13.3332 13.334 13.3332H2.66732C1.93398 13.3332 1.33398 12.7332 1.33398 11.9998V3.99984C1.33398 3.2665 1.93398 2.6665 2.66732 2.6665Z" stroke="currentColor" stroke-opacity="0.75" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                                        <path d="M14.6673 4L8.00065 8.66667L1.33398 4" stroke="currentColor" stroke-opacity="0.75" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                                    </svg>
                                                                                    <img class="invisible w-4 h-4 ml-3 group-hover:block" src={externalSvg}/>
                                                                                    
                                                                                </div>
                                                                            </a>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )): <></>}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                                        </>)
                                    })
                                }
                            </div>
                            <div className='bg-dark-gray/40 h-[1px] w-full my-12'></div>
                            <div className='px-10'>
                                <div className='text-3xl font-light mb-4'>
                                    3. {reportData?.totalExternallySharedFile} files are shared externally
                                </div>
                                {
                                    reportData?.externallySharedFile && reportData?.externallySharedFile.length ?
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell>Filename</TableCell>
                                                <TableCell>Access Setting</TableCell>
                                                <TableCell>Shared with</TableCell>
                                                <TableCell>Created by</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {reportData && reportData?.externallySharedFile ? reportData?.externallySharedFile.map((row) => (
                                                    <TableRow
                                                    key={row.name}
                                                    className='group'
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell className='group' component="th" scope="row">
                                                            <a href={row.web_view_link} className='flex gap-2 items-center'>
                                                                <GetFileIcon type={row.type}/>
                                                                <span className='group-hover:underline group-hover:text-primary'>
                                                                    {row.filename}
                                                                </span>
                                                                <img class="invisible w-3 h-3 ml-3 group-hover:block" src={externalSvg}/>
                                                            </a>
                                                        </TableCell>
                                                        <TableCell>
                                                            <a href={row.web_view_link}>
                                                                <span className='text-nowrap px-4 py-2 bg-gray rounded-full'>Anyone with link</span>
                                                            </a>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className='flex gap-2 items-center justify-start'>
                                                                <img className='w-5' src={fiUsersGraySvg} alt="users" srcset="" />
                                                                <span className='text-base'>{row.shared_with}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <a href={`mailto:${row.owner.emailAddress}?subject=Your GDrive file${row.filename}&body=Hi nikunj, I found this file in my Google Drive account, which was created by you: "I am sharing  'cd practicls(all) (2) ' with you"I found it using the Metomic Google Drive Scanner`}  className='group max-w-72 flex justify-between gap-4 items-center'>
                                                                <div className='group-hover:underline flex items-center justify-start gap-2'>
                                                                    <img className='w-8 rounded-full' src={row?.owner?.photoLink} alt="" srcset="" />
                                                                    <span className='text-wrap group-hover:underline group-hover:text-primary'>{row?.owner?.displayName}</span>
                                                                </div>
                                                                <div class="mr-2 flex items-center justify-end xl:flex">
                                                                    <svg class="w-5 h-5 ml-2 text-black group-hover:text-primary-700" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M2.66732 2.6665H13.334C14.0673 2.6665 14.6673 3.2665 14.6673 3.99984V11.9998C14.6673 12.7332 14.0673 13.3332 13.334 13.3332H2.66732C1.93398 13.3332 1.33398 12.7332 1.33398 11.9998V3.99984C1.33398 3.2665 1.93398 2.6665 2.66732 2.6665Z" stroke="currentColor" stroke-opacity="0.75" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                        <path d="M14.6673 4L8.00065 8.66667L1.33398 4" stroke="currentColor" stroke-opacity="0.75" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                    </svg>
                                                                    <img class="invisible w-4 h-4 ml-3 group-hover:block" src={externalSvg}/>
                                                                    
                                                                </div>
                                                            </a>
                                                        </TableCell>
                                                    </TableRow>
                                                )): <></>}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    : <div>There are no externally files to show.</div>
                                }
                            </div>
                        </>
                        :<>
                            <div className='animate-pulse py-20 px-12'>
                                <div className='h-16 w-full max-w-sm rounded-lg bg-dark-gray/15 mb-6'></div>
                                <div className=' border border-light-gray'>
                                    <div className='px-10 py-6 flex items-center justify-between  border-b border-light-gray'>
                                        <div className='h-10 w-full max-w-lg rounded-lg bg-dark-gray/15'></div>
                                        <div className='h-10 w-full max-w-36 rounded-lg bg-dark-gray/15'></div>
                                        
                                    </div>
                                    <div className='px-10 py-6 flex items-center justify-between  border-b border-light-gray'>
                                        <div className='h-10 w-full max-w-lg rounded-lg bg-dark-gray/15'></div>
                                        <div className='h-10 w-full max-w-36 rounded-lg bg-dark-gray/15'></div>
                                        
                                    </div>
                                    <div className='px-10 py-6 flex items-center justify-between border-b border-light-gray'>
                                        <div className='h-10 w-full max-w-lg rounded-lg bg-dark-gray/15'></div>
                                        <div className='h-10 w-full max-w-36 rounded-lg bg-dark-gray/15'></div>
                                        
                                    </div>
                                    <div className='px-10 py-6 flex items-center justify-between border-light-gray'>
                                        <div className='h-10 w-full max-w-lg rounded-lg bg-dark-gray/15'></div>
                                        <div className='h-10 w-full max-w-36 rounded-lg bg-dark-gray/15'></div>
                                        
                                    </div>

                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>

        </div>

        <div className='fixed bottom-0 left-0 w-full px-12 py-4 bg-white flex items-center justify-between'>
            <span>For a more detailed risk audit, book a demo with one of our SaaS Security Specialists.</span>
            <button className='bg-primary px-6 py-3 rounded-lg text-base font-semibold text-white'>Book a demo</button>
        </div>

        {
            modalOpen &&
            <div className='bg-black/40 flex items-center justify-center fixed top-0 left-0 w-full h-full'>
                <div className='rounded-lg bg-white px-6 py-6 w-full max-w-md'>
                    <h4 className='text-black/90 font-bold text-lg mb-4'>Are You Sure?</h4>
                    <p className='text-base mb-6'>This will revoke the access permission to your Google Drive and delete all collected data from our servers.</p>
                    <div className='flex items-center gap-2 justify-end'>
                        <button onClick={() => setModalOpen(false)} className='font-semibold Cancel text-primary px-4 py-2'>Cancel</button>
                        <button onClick={revokeAccess} className='font-semibold Cancel text-white rounded-lg bg-[#922825] px-4 py-2'>Delete</button>
                    </div>
                </div>
            </div>
        }
    </>)
}

export default RiskReport
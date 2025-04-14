import React, { useState ,useEffect} from 'react'
import DashboardLayout from "../../Components/layouts/DashboardLayout"
import IncomeOverview from '../../Components/Income/IncomeOverview'
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from '../../utils/apiPath'
import Modal from '../../Components/layouts/Modal'
import AddIncomeForm from '../../Components/Income/AddIncomeForm'
import { toast } from 'react-toastify'
import IncomeList from '../../Components/layouts/IncomeList'
import DeleteAlert from '../../Components/layouts/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'

const Income = () => {
  useUserAuth()
  const[incomeData,setIncomeData]=useState([])
  const[loading,setLoading]=useState(false)
  const[openDeleteAlert,setOpenDeleteAlert]=useState({
    show:false,
    data:null,
  })
  const[openAddIncomeModal,setOpenAddIncomeModal]=useState(false)

 const fetchIncomeDetails=async()=>{
  if(loading) return
  setLoading(true)

  try{
    const response=await axiosInstance.get(
      `${API_PATHS.INCOME.GET_ALL_INCOME}`
    )

    if(response.data){
      setIncomeData(response.data);
    }
  } catch(error){
    console.log("Something went wrong.Please try again.",error)
  } finally{
    setLoading(false)
  }
 }

 const handleAddIncome=async(income)=>{
  const{source,amount,date,icon}=income

  if(!source.trim()){
    toast.error("Source is Required")
    return
  }
  if(!amount || isNaN(amount)|| Number(amount)<=0){
    toast.error("Amount should be a valid number greater that 0")
    return
  }
  if(!date){
    toast.error("Date is required");
    return;
  }
    try{
    await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
      source,
      amount,
      date,
      icon,
    })
    setOpenAddIncomeModal(false)
    toast.success("Income Added successfully")
    fetchIncomeDetails()
  } catch (error){
    console.error("Error adding income",
      error.response?.data?.message || error.message
    )
  }
}

 const deleteIncome=async(id)=>{
  try{
    await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

    setOpenDeleteAlert({ show:false,date:null})
    toast.success("Income details deleted successfully")
    fetchIncomeDetails()
  }catch(error){
    console.error(
      "Error deleting income:",
      error.response?.data?.message || error.message
    )
  }
 }

 const handleDownloadIncomeDetails=async()=>{
  try{
    const response=await axiosInstance.get(
      API_PATHS.INCOME.DOWNLOAD_INCOME,
      {
        responseType:"blob",
      }
    )
    const url=window.URL.createObjectURL(new Blob([response.data]))
    const link=document.createElement("a")
    link.href=url;
    link.setAttribute("download","expense_details.xlxs");
    document.body.appendChild(link)
    link.click()
    link.parentNode.removeChild(link)
    window.URL.revokeObjectURL(url)
  }catch(error){
    console.error('failed Download',error)
    toast.error("Failed to Download")
  }
 }

 useEffect(()=>{
  fetchIncomeDetails()

  return()=>{}
 },[])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transaction={incomeData}
              onAddIncome={()=>setOpenAddIncomeModal(true)}
              />
          </div>
          <IncomeList
           transaction={incomeData}
           onDelete={(id)=>{
            setOpenDeleteAlert({show:true,data:id});
           }}
           onDownload={handleDownloadIncomeDetails}
           />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={()=>setOpenAddIncomeModal(false)}
          >
          <AddIncomeForm onAddIncome={handleAddIncome}/>
           </Modal>

           <Modal
             isOpen={openDeleteAlert.show}
             onClose={()=>setOpenDeleteAlert({show:false,date:null})}
             title="Delete Income"
             >
              <DeleteAlert
                content="Are you sure you want to delete it"
                onDelete={()=>deleteIncome(openDeleteAlert.data )}
                />
             </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
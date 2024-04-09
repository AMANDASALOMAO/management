import React, { useState, useEffect } from 'react'
import { collection, getDocs, updateDoc, doc, getDoc, deleteDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { useAuth } from '../../context/authContext'
import { Button } from '@mui/material'
import styles from './EmployeeHistory.module.scss'
import { User } from 'firebase/auth'
import UpdateInfo from './updateInfo/UpdateInfo'
import ViewAllUpdatesModal from './updateInfo/ViewAllUpdatesModal/ViewAllUpdatesModal'

interface Employee {
    id: string
    data: any
}

export interface EmployeeData {
    name: string
    lastName: string
    gender: string
    address: string
    phone: string
    email: string
    date: string
    educationalLevel: string
    jobTitle: string
    sector: string
    admissionDate: string
    paycheck: string
    nationality: string
    updatedAt: any
    [key: string]: string | any
}

const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [openEditModal, setOpenEditModal] = useState(false)
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
    const [selectedCollectionId, setSelectedCollectionId] = useState<string>('')
    const [updatedContactInfo, setUpdatedContactInfo] = useState<EmployeeData>({
        name: '',
        lastName: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        nationality: '',
        date: '',
        educationalLevel: '',
        jobTitle: '',
        sector: '',
        admissionDate: '',
        paycheck: '',
        updatedAt: null
    })
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [updatedFields, setUpdatedFields] = useState<string[]>([])
    const [employeeWithUpdatedFields, setEmployeeWithUpdatedFields] = useState<{ [key: string]: EmployeeData }>({})
    const { currentUser } = useAuth()
    const labels: { [key: string]: string } = {
        address: 'Endereço',
        phone: 'Telefone',
        date: 'Data',
        educationalLevel: 'Nível Educacional',
        gender: 'Gênero',
        email: 'E-mail',
        name: 'Nome',
        nationality: 'Nacionalidade',
        lastName: 'Sobrenome',
        jobTitle: 'Cargo',
        sector: 'Setor',
        admissionDate: 'Data de Admissão',
        paycheck: 'Salário',
        updatedAt: 'Atualizado em'
    }

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, (currentUser as User).uid))
                const employeeList: Employee[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data() as EmployeeData
                }))
                setEmployees(employeeList)
            } catch (error) {
                console.error('Erro ao buscar lista de funcionários:', error)
            }
        }

        fetchEmployees()
    }, [currentUser])

    const handleUpdateContactInfo = async () => {
        try {
            const employeeDocRef = doc(db, (currentUser as User).uid, selectedEmployeeId)
            const employeeDocSnapshot = await getDoc(employeeDocRef)

            if (employeeDocSnapshot.exists()) {
                await updateDoc(employeeDocRef, {
                    updatedContactInfo: {
                        ...updatedContactInfo,
                        updatedAt: Timestamp.fromDate(new Date())
                    }
                })
                alert('Informações de contato atualizadas com sucesso.')
                setOpenEditModal(false)
                window.location.reload()
            } else {
                console.error('Documento de funcionário não encontrado para atualização.')
                console.log(selectedCollectionId, selectedEmployeeId)
            }
        } catch (error) {
            console.error('Erro ao atualizar informações de contato:', error)
        }
    }

    const handleOpenEditModal = (employeeId: string) => {
        setSelectedEmployeeId(employeeId)
        setOpenEditModal(true)
        setSelectedCollectionId(employeeId)
    }

    const handleCloseEditModal = () => {
        setOpenEditModal(false)
    }

    const handleDeleteEmployee = async (employeeId: string) => {
        try {
            const employeeDocRef = doc(db, (currentUser as User).uid, employeeId)
            await deleteDoc(employeeDocRef)
            alert('Funcionário excluído com sucesso.')
            window.location.reload()
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error)
            alert('Erro ao excluir funcionário')
        }
    }

    const handleViewAllUpdates = (employeeId: string) => {
        setOpenUpdateModal(true)
        setSelectedEmployeeId(employeeId)
        const employee = employees.find(emp => emp.id === employeeId)
        if (employee) {
            const updatedEmployeeData = employee.data
            const originalEmployeeData = employeeWithUpdatedFields[employeeId] || {}
    
            // Mapeia os campos atualizados para substituir os campos antigos
            const updatedFields = Object.keys(updatedEmployeeData).filter((key) => {
                const updatedValue = updatedEmployeeData[key]
                const originalValue = originalEmployeeData[key]
                if (typeof updatedValue !== 'undefined' && typeof originalValue !== 'undefined') {
                    return updatedValue !== originalValue
                }
                return true
            })
                const updatedEmployees = employees.map((emp) => {
                if (emp.id === employeeId) {
                    return {
                        id: emp.id,
                        data: updatedEmployeeData
                    }
                }
                return emp
            })
                setUpdatedFields(updatedFields)
            setEmployeeWithUpdatedFields({
                ...employeeWithUpdatedFields,
                [employeeId]: updatedEmployeeData
            })
    
            setEmployees(updatedEmployees)
        }
    }    

    return (
        <div className={styles.container}>
            <h2>Lista de Funcionários</h2>
                    <ul className={styles.list}> 
                    {employees.map((employee, index) => (
    <div className={styles.item} key={index}>
        <strong>ID:</strong> {employee.id}
        <ul>
            {Object.entries(employee.data).map(([key, value]) => (
                key !== 'submittedEmployeeData' && key !== 'updatedContactInfo' && (
                    <li key={key}>
                        <strong>{labels[key] || key}:</strong> <br />
                        {typeof value === 'object' ? (
                            <ul>
                                {Object.entries(value || {}).map(([subKey, subValue]) => (
                                    <li key={subKey}>
                                        <strong>{labels[subKey]}:</strong> {String(subValue)}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            String(value)
                        )}
                    </li>
                )
            ))}
        </ul>
        <div className={styles.footer}>
            <UpdateInfo
                setUpdatedContactInfo={setUpdatedContactInfo}
                updatedContactInfo={updatedContactInfo}
                openEditModal={openEditModal}
                handleUpdateContactInfo={handleUpdateContactInfo}
                handleOpenEditModal={<Button onClick={() => handleOpenEditModal(employee.id)}>Editar</Button>}
                handleCloseEditModal={handleCloseEditModal}
            />
            <Button onClick={() => handleDeleteEmployee(employee.id)}>Excluir</Button>
            <Button onClick={() => handleViewAllUpdates(employee.id)}>Ver histórico</Button>
        </div>
    </div>
))}

                   </ul>
               
            {openUpdateModal && (
                <ViewAllUpdatesModal
                    labels={labels}
                    isOpen={openUpdateModal}
                    onClose={() => setOpenUpdateModal(false)}
                    updatedFields={updatedFields}
                    employeeUpdates={employeeWithUpdatedFields[selectedEmployeeId] || {}}
                />
            )}
        </div>
    )
}

export default EmployeeList

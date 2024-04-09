import React, { useEffect, useState } from 'react'
import styles from './EmployeeForm.module.scss'
import { TextField } from '@mui/material'
import { ReaisMaskCustom } from '../../inputMask/InputMask'

interface IEmployeeForm {
    setSubmittedData: React.Dispatch<React.SetStateAction<IEmployeeFormFields | null>>
}

export interface IEmployeeFormFields {
    jobTitle: string
    sector: string
    admissionDate: string
    paycheck: string
}

const EmployeeForm = ({ setSubmittedData }: IEmployeeForm) => {
    const [employeeformData, setEmployeeFormData] = useState<IEmployeeFormFields>({
        jobTitle: '',
        sector: '',
        admissionDate: '',
        paycheck: ''
    })

    useEffect(() => {
        setSubmittedData(employeeformData);
    }, [employeeformData, setSubmittedData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof IEmployeeFormFields) => {
        const { value } = event.target
        setEmployeeFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value,
        }))
    }

    return (
        <div className={styles.form}>
            <h3>Informações do funcionário</h3>
            <div className={styles.data}>
                <TextField 
                    variant="filled"
                    required
                    label="Cargo"
                    value={employeeformData.jobTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'jobTitle')}
                    helperText="ex: Vendedor"
                />
                <TextField 
                    variant="filled"
                    required
                    label="Setor"
                    value={employeeformData.sector}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'sector')}
                    helperText="ex: "
                />
                <div className={styles.card}>
                    <TextField 
                        variant="filled"
                        required
                        label="Data de admissão"
                        value={employeeformData.admissionDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'admissionDate')}
                        helperText="ex: 20 ago 2023"
                        type='date'
                    />
                    <TextField 
                        variant="filled"
                        required
                        label="Salário"
                        value={employeeformData.paycheck}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'paycheck')}
                        helperText="ex: R$1.412,00"
                        InputProps={{
                            inputComponent: ReaisMaskCustom as any,
                          }}
                    />
                </div>
            </div>
        </div>
    )
}

export default EmployeeForm

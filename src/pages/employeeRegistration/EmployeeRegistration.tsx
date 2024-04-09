import React, { useState } from 'react'
import { useAuth } from '../../context/authContext'
import Form, { FormFields } from '../../components/form/personalForm/Form'
import styles from './EmployeeRegistration.module.scss'
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material'
import EmployeeForm, { IEmployeeFormFields } from '../../components/form/employeeForm/EmployeeForm'
import { addDoc, collection } from 'firebase/firestore'
import Footer from '../../components/footer/Footer'
import { db } from '../../firebase/firebaseConfig'

const EmployeeRegistration = () => {
    const { currentUser } = useAuth()
    const steps = ['Informações de contato', 'Informações de funcionário', 'Enviar formulário']
    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set<number>())
    const [submittedData, setSubmittedData] = useState<FormFields | null>(null)
    const [submittedEmployeeData, setSubmittedEmployeeData] = useState<IEmployeeFormFields | null>(null)

    const isStepSkipped = (step: number) => {
      return skipped.has(step)
    }

    const handleReset = () => {
      setActiveStep(0)
    }
    const saveDataToFirestore = async () => {
      if (activeStep === steps.length - 1) {
    //    const timestamp = Timestamp.now()
    //    const dateString = timestamp.toDate().toISOString()
        if (currentUser) {
          const userCollectionRef = collection(db, currentUser.uid)
          await addDoc(userCollectionRef, {
            submittedData: { ...submittedData },
            submittedEmployeeData: { ...submittedEmployeeData }
          })
          alert("Salvo no banco de dados")
          generatePDF()
        } else {
          console.error("Nenhum usuário logado.")
        }
      }
    }

    const generatePDF = async () => {
        const response = await fetch('http://localhost:4000/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    ...submittedData,
                    ...submittedEmployeeData
                }
            })
        })

        if (response.ok) {
            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'formulario.pdf')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else {
            console.error('Erro ao gerar o PDF:', response.status)
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      console.log(submittedData, submittedEmployeeData)
    }

    return (
        <div className={styles.container}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {}
              const labelProps: {
                optional?: React.ReactNode
              } = {}
              if (isStepSkipped(index)) {
                stepProps.completed = false
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Formulário preenchido
              </Typography>
              <div>
                <Button onClick={handleReset}>Recarregar</Button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={styles.text}>
                  <h1>Fale-nos um pouco sobre você</h1>
                  <p>Diga quem você é, como os empregadores podem entrar em contato com você e qual a sua profissão.</p>
              </div>
              <form onSubmit={handleSubmit}>
                {activeStep === 0 && <Form setSubmittedData={setSubmittedData} />}
                {activeStep === 1 && <EmployeeForm setSubmittedData={setSubmittedEmployeeData} />}
                <div className={styles.footer}>
                  <Footer
                    onSave={saveDataToFirestore}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    skipped={skipped}
                    setSkipped={setSkipped}
                    steps={steps}
                  />
                </div>
              </form>
            </React.Fragment>
          )}
        </div>
    )
}

export default EmployeeRegistration
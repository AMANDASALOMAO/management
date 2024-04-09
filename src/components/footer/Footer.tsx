import React from 'react'
import styles from './Footer.module.scss'
import { Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface IFooterProps {
    activeStep: number
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    skipped: Set<number>
    setSkipped: React.Dispatch<React.SetStateAction<Set<number>>>
    steps: string[]
    onSave: () => void
}

const Footer: React.FC<IFooterProps> = ({ activeStep, setActiveStep, skipped, setSkipped, steps, onSave }) => {
    const isStepSkipped = (step: number) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1)
        setSkipped(newSkipped)

        if (activeStep === steps.length - 1) {
            onSave()
        }
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    return (
        <div className={styles.footer}>
            <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                disabled={activeStep === 0}
                onClick={handleBack}
            >
                Anterior
            </Button>
            <Button
                onClick={handleNext}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                type={activeStep === steps.length - 1 ? 'submit' : 'button'}
            >
                {activeStep === steps.length - 1 ? 'Enviar' : 'Próximo'}
            </Button>
        </div>
    )
}

export default Footer


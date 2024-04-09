import React, { ReactNode } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import styles from './UpdateInfo.module.scss'

export interface IUpdateInfo {
    handleUpdateContactInfo: () => void
    handleOpenEditModal: ReactNode
    handleCloseEditModal: () => void
    openEditModal: boolean
    updatedContactInfo: {
        name: string
        lastName: string
        gender: string
        address: string
        phone: string
        email: string
        nationality: string
        date: string
        educationalLevel: string
        jobTitle: string
        sector: string
        admissionDate: string
        paycheck: string
        updatedAt: null
    }
    setUpdatedContactInfo: React.Dispatch<React.SetStateAction<{
    name: string
    lastName: string
    gender: string
    address: string
    phone: string
    email: string
    nationality: string
    date: string
    educationalLevel: string
    jobTitle: string
    sector: string
    admissionDate: string
    paycheck: string
    updatedAt: null
    }>>
}

const UpdateInfo = ({
    handleOpenEditModal,
    handleCloseEditModal,
    handleUpdateContactInfo,
    openEditModal,
    updatedContactInfo,
    setUpdatedContactInfo,
}: IUpdateInfo) => {

    return (
        <div className={styles.container}>
            {handleOpenEditModal}
            <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                <DialogTitle>Editar Informações de Contato</DialogTitle>
                <DialogContent className={styles.modal}>
                    <div className={styles.card}>
                <TextField
                            variant="standard"
                            label="Nome"
                            value={updatedContactInfo.name}
                            onChange={(e) => setUpdatedContactInfo({ ...updatedContactInfo, name: e.target.value })}
                        />
                        <TextField
                            variant="standard"
                            label="Sobrenome"
                            value={updatedContactInfo.lastName}
                            onChange={(e) => setUpdatedContactInfo({ ...updatedContactInfo, lastName: e.target.value })}
                        />
                        </div>
                        <div className={styles.card}>
                        <TextField
                            variant="standard"
                            label="Gênero"
                            value={updatedContactInfo.gender}
                            onChange={(e) => setUpdatedContactInfo({ ...updatedContactInfo, gender: e.target.value })}
                        /> 
                        <TextField
                            variant="standard"
                            label="Escolaridade"
                            value={updatedContactInfo.educationalLevel}
                            onChange={(e) => setUpdatedContactInfo({ ...updatedContactInfo, educationalLevel: e.target.value })}
                         />
                         </div>
                        <TextField
                            variant="standard"
                            label="Endereço"
                            value={updatedContactInfo.address}
                            onChange={(e) => setUpdatedContactInfo({ ...updatedContactInfo, address: e.target.value })}
                            fullWidth
                        />
                        <div className={styles.card}>
                        <TextField
                            variant="standard"
                            label="Nacionalidade"
                            value={updatedContactInfo.nationality}
                            onChange={(e) => setUpdatedContactInfo({ ...updatedContactInfo, nationality: e.target.value })}
                        />
                        
                        <TextField
                            variant="standard"
                            label="Novo Número de Telefone"
                            value={updatedContactInfo.phone}
                            onChange={(e) => setUpdatedContactInfo({ ...updatedContactInfo, phone: e.target.value })}
                        />
                        </div>
                        <TextField
                            variant="standard"
                            label="Novo E-mail"
                            value={updatedContactInfo.email}
                            onChange={(e) => setUpdatedContactInfo({ ...updatedContactInfo, email: e.target.value })}
                            fullWidth
                        />
                        <div className={styles.card}>
                        <TextField
                            variant="standard"
                            label="Emprego"
                            value={updatedContactInfo.jobTitle}
                            onChange={(e) => setUpdatedContactInfo({ ...updatedContactInfo, jobTitle: e.target.value })}
                        />
                        
                        <TextField
                            variant="standard"
                            label="Setor"
                            value={updatedContactInfo.sector}
                            onChange={(e) => setUpdatedContactInfo({ ...updatedContactInfo, sector: e.target.value })}
                        />
                        </div>
                        <div className={styles.card}>
                        <TextField
                            variant="standard"
                            label="Data de admissão"
                            value={updatedContactInfo.admissionDate}
                            onChange={(e) => setUpdatedContactInfo({ ...updatedContactInfo, admissionDate: e.target.value })}
                        />
                        
                        <TextField
                            variant="standard"
                            label="Salário"
                            value={updatedContactInfo.paycheck}
                            onChange={(e) => setUpdatedContactInfo({ ...updatedContactInfo, paycheck: e.target.value })}
                        />
                        </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal}>Cancelar</Button>
                    <Button onClick={handleUpdateContactInfo}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateInfo

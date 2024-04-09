import React, { useEffect, useState } from 'react'
import styles from './Form.module.scss'
import { Avatar, FormControlLabel, Switch, TextField } from '@mui/material'
import { TextMaskCustom } from '../../inputMask/InputMask';
import { storage } from '../../../firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export interface IFormProps {
    onSubmit?: any;
   setSubmittedData: React.Dispatch<React.SetStateAction<FormFields | null>>;
}


export interface FormFields {
    name: string
    lastName: string
    gender: string
    address: string
    phone: string
    email: string
    nationality: string
    date: string
    educationalLevel: string
}

const Form = ({ onSubmit, setSubmittedData }: IFormProps) => {
    const [formData, setFormData] = useState<FormFields>({
        name: '',
        lastName: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        nationality: '',
        date: '',
        educationalLevel: ''
    })
    const [isRounded, setIsRounded] = useState(true)
    const [avatarUrl, setAvatarUrl] = useState<string | null>('' || null)

    useEffect(() => {
        setSubmittedData(formData);
    }, [formData, setSubmittedData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormFields) => {
        const { value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value,
        }))
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const imgRef = ref(storage, `files/${file.name}`);
          uploadBytes(imgRef, file).then((snapshot) => {
            console.log('Upload complete:', snapshot);
            getDownloadURL(snapshot.ref).then((url) => {
              setAvatarUrl(url);
            });
          }).catch((error) => {
            console.error('Error uploading image:', error);
          });
        }
      };
      

    const setRounded = () => {
        setIsRounded(prevState => !prevState)
    }

    return (
        <div className={styles.form}>
            <h3>Informações de contato</h3>
            <div className={styles.data}>
                <div className={styles.card}>
                    <div className={styles.userName}>
                        <TextField
                            variant="filled"
                            required
                            label="Nome"
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'name')}
                            helperText="ex: Tiago"
                        />
                        <TextField
                            variant="filled"
                            required
                            label="Sobrenome"
                            value={formData.lastName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'lastName')}
                            helperText="ex: Souza"
                        />
                    </div>
                    <div className={styles.card}>
                        <Avatar
                            src={avatarUrl || "/broken-image.jpg"}
                            variant={isRounded ? "square" : undefined}
                            sx={{ width: 150, height: 170 }}
                            onClick={() => document.getElementById('imageInput')?.click()}
                        />
                        <div>
                            <h4>Foto do perfil</h4>
                            <label>
                                Adicionar foto
                                <input
                                    type="file"
                                    id="imageInput"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                            </label>
                            <button
                                onClick={setRounded}
                                className={styles.editImage}
                            >
                                <FormControlLabel control={<Switch />} label="Foto redonda" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                <TextField
                    variant="filled"
                    required
                    label="Gênero"
                    value={formData.gender}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'gender')}
                    helperText="ex: Masculino"
                /> 
                <TextField
                    variant="filled"
                    required
                    label="Escolaridade"
                    value={formData.educationalLevel}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'educationalLevel')}
                    helperText="ex: Ensino médio completo"
                 />
                 </div>
                <TextField
                    variant="filled"
                    required
                    label="Endereço"
                    value={formData.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'address')}
                    helperText="ex: Avenida Paulista, 1.234 - São Paulo - SP - 07010-001"
                />
                <div className={styles.card}>
                    <TextField
                        variant="filled"
                        required
                        label="Telefone"
                        value={formData.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'phone')}
                        helperText="ex: (11) 9 9999-9999"
                        InputProps={{
                            inputComponent: TextMaskCustom as any,
                          }}
                    />
                    <TextField
                        variant="filled"
                        required
                        label="Email"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'email')}
                        helperText="ex: tiagosouza@example.com"
                    />
                </div>
                <div className={styles.card}>
                    <TextField
                        variant="filled"
                        required
                        label="Nacionalidade"
                        value={formData.nationality}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'nationality')}
                        helperText="ex: Brasileira"
                    />
                    <TextField
                        variant="filled"
                        required
                        label="Data de nascimento"
                        value={formData.date}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'date')}
                        helperText="ex: 23 jun 1985"
                        type='date'
                    />
                </div>
            </div>
        </div>
    )
}

export default Form

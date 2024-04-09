import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import styles from './ViewAllUpdatesModal.module.scss';

interface IViewAllUpdatesModal {
    isOpen: boolean;
    onClose: () => void;
    updatedFields: string[];
    employeeUpdates: { [key: string]: any };
    labels: { [key: string]: string };
}

const ViewAllUpdatesModal = ({ isOpen, onClose, updatedFields, employeeUpdates, labels }: IViewAllUpdatesModal) => {
    const renderFieldValue = (key: string, value: any): React.ReactNode => {
        if (typeof value === 'object') {
            return (
                <ul>
                    {Object.entries(value).map(([subKey, subValue]) => (
                        <li key={subKey}>
                            <strong>{labels[subKey] || subKey}:</strong> {renderSubValue(subValue)}
                        </li>
                    ))}
                </ul>
            );
        } else {
            return <span>{value}</span>;
        }
    };

    const renderSubValue = (subValue: unknown): React.ReactNode => {
        if (typeof subValue === 'object' && subValue !== null) {
            const objectAsString = Object.entries(subValue)
                .map(([subKey, subVal]) => `${labels[subKey] || subKey}: ${subVal}`)
                .join(', ');
            return <span>{objectAsString}</span>;
        } else {
            return String(subValue);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Atualizações do Funcionário</DialogTitle>
            <DialogContent className={styles.modal}>
                <div className={styles.modalContent}>
                    <ul>
                        {updatedFields.map((key) => (
                            <li key={key}>
                                <strong>{labels[key] || key}:</strong> {renderFieldValue(key, employeeUpdates[key])}
                            </li>
                        ))}
                    </ul>
                    <Button onClick={onClose}>Fechar</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewAllUpdatesModal;

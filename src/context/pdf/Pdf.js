import express from 'express';
import PDFDocument from 'pdfkit';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.post('/generate-pdf', (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).send('Dados inválidos');
    }

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=formulario.pdf');

    const customTitles = {
        name: 'Nome',
        lastName: 'Sobrenome',
        gender: 'Gênero',
        educationalLevel: 'Escolaridade',
        email: 'E-mail',
        work: 'Emprego:',
        address: 'Endereço:',
        phone: 'Telefone:',
        nacionality: 'Nacionalidade:',
        date: 'Data de Nascimento:',
        jobTitle: 'Cargo',
        sector: 'Setor',
        admissionDate: 'Data de Admissão',
        paycheck: 'Salário'
    };

    let y = 50;

    doc.pipe(res);

    Object.entries(data).forEach(([key, value]) => {
        doc.rect(50, y, 500, 40).lineWidth(0.5).stroke();
        doc.fontSize(12).fillColor('#1976d2').font('Helvetica-Bold').text(customTitles[key], 55, y + 5);
        doc.fontSize(12).fillColor('black').font('Helvetica').text(`${value}`, 55, y + 25, { width: 500 });

        y += 50;
    });

    doc.end();
});

app.listen(port, () => {
    console.log(`Micro serviço PDF rodando em http://localhost:${port}`);
});

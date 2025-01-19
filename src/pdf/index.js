import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

async function generatePDF(line, date, formData) {
  try {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <h1>Relatório de Hora Extra</h1>
          <p><strong>Linha:</strong> ${line}</p>
          <p><strong>Data:</strong> ${date.toLocaleDateString('pt-BR')}</p>
          <table>
            <thead>
              <tr>
                <th>Posto de Trabalho</th>
                <th>Colaborador</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(formData)
        .map(
          ([key, value]) => `
                <tr>
                  <td>${key}</td>
                  <td>${value || '-'}</td>
                </tr>
              `
        )
        .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    console.log('PDF gerado com sucesso:', uri);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      alert(`PDF gerado e salvo em: ${uri}`);
    }
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    alert('Erro ao gerar o PDF. Tente novamente.');
  }
}

export default generatePDF;

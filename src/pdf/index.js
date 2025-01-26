import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

async function generatePDF(line, date, timeEntry, timeExit, formData) {
  try {
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              padding: 30px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
            }
            h1 {
              text-align: center;
              color: #333;
              font-size: 26px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .header {
              margin-bottom: 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #4CAF50;
              padding-bottom: 10px;
            }
            .header p {
              font-size: 16px;
              color: #333;
              margin: 5px 0;
              flex: 1;
              text-align: center;
            }
            .header .info {
              flex: 3;
              text-align: left;
            }
            .header .times {
              flex: 2;
              text-align: right;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .table th, .table td {
              padding: 12px 15px;
              text-align: left;
              font-size: 14px;
              border: 1px solid #ddd;
            }
            .table th {
              background-color: #4CAF50;
              color: white;
            }
            .table td {
              background-color: #f9f9f9;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #888;
              margin-top: 40px;
            }
            .footer p {
              margin: 5px 0;
            }
            .footer a {
              text-decoration: none;
              color: #4CAF50;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Relatório de Hora Extra</h1>

            <!-- Cabeçalho -->
            <div class="header">
              <div class="info">
                <p><strong>Linha:</strong> ${line}</p>
                <p><strong>Data:</strong> ${date.toLocaleDateString('pt-BR')}</p>
              </div>
              <div class="times">
                <p><strong>Entrada:</strong> ${timeEntry.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                <p><strong>Saída:</strong> ${timeExit.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>

            <!-- Tabela de Dados -->
            <table class="table">
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

            <!-- Rodapé -->
            <div class="footer">
              <p>Gerado por <strong>Code BR</strong></p>
              <p><a href="mailto:codebr.contato@gmail.com">codebr.contato@gmail.com</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Gerar PDF com um nome temporário
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    // Definir o novo nome com base na linha
    const newUri = FileSystem.documentDirectory + `Hora_Extra_Linha_${line}.pdf`;

    // Renomear o arquivo
    await FileSystem.moveAsync({
      from: uri,
      to: newUri,
    });

    console.log('PDF gerado com sucesso:', newUri);

    // Compartilhar ou alertar sobre o sucesso
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(newUri);
    } else {
      alert(`PDF gerado e salvo em: ${newUri}`);
    }
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    alert('Erro ao gerar o PDF. Tente novamente.');
  }
}

export default generatePDF;

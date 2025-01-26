import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  text: {
    alignItems: 'center',
    marginLeft: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  pickerContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  dateTimeRow: {
    flexDirection: 'column', // Alinha os botões verticalmente
    justifyContent: 'center', // Centraliza os itens na coluna
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginRight: 8,
    fontWeight: '600',
  },
  picker: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  dateButton: {
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 140, // Tamanho mínimo para garantir que o conteúdo caiba
    marginBottom: 10, // Espaçamento entre os botões
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Somente Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777',
  },
});

export default styles;



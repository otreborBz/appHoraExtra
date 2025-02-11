import { useState } from 'react';
import { workStationOrder } from '../components/EmployeeList';

export const useFormData = () => {
  const [employees, setEmployees] = useState([]);
  const [line, setLine] = useState('');
  const [date, setDate] = useState(new Date());
  const [entryTime, setEntryTime] = useState(new Date());
  const [exitTime, setExitTime] = useState(new Date());

  const addEmployee = (employee) => {
    console.log('Current employees:', employees); // Log para debug
    console.log('Adding new employee:', employee); // Log para debug
    
    setEmployees(prevEmployees => {
      const newEmployees = [...prevEmployees, employee];
      console.log('Updated employees:', newEmployees); // Log para debug
      return newEmployees;
    });
  };

  const removeEmployee = (workStation) => {
    setEmployees(prevEmployees => 
      prevEmployees.filter(emp => emp.workStation !== workStation)
    );
  };

  const resetForm = () => {
    setEmployees([]);
    setLine('');
    setDate(new Date());
    setEntryTime(new Date());
    setExitTime(new Date());
  };

  // Converter para o formato antigo para compatibilidade com o PDF
  // mantendo a ordem correta dos postos
  const getFormDataForPDF = () => {
    const formData = {};
    workStationOrder.forEach(station => {
      const employee = employees.find(emp => emp.workStation === station);
      formData[station] = employee 
        ? `${employee.name} (RE: ${employee.id})`
        : '';
    });
    return formData;
  };

  return {
    employees,
    addEmployee,
    removeEmployee,
    line,
    setLine,
    date,
    setDate,
    entryTime,
    setEntryTime,
    exitTime,
    setExitTime,
    resetForm,
    getFormDataForPDF,
  };
}; 
import { useState } from 'react';
import colaborador from '../colaboradores/colaboradores.json';

export const useEmployeeSearch = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const [query, setQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const onQueryChange = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = colaborador.filter((employee) =>
        employee.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
  };

  const handleInputFocus = (inputLabel, formData, setFormData) => {
    setActiveInput(inputLabel);
    setQuery('');
    setFilteredEmployees([]);
    setIsModalVisible(true);
    setFormData((prevData) => ({
      ...prevData,
      [inputLabel]: '',
    }));
  };

  return {
    isModalVisible,
    setIsModalVisible,
    activeInput,
    query,
    filteredEmployees,
    onQueryChange,
    handleInputFocus,
  };
}; 
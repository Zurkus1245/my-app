import React, { useState } from 'react';
import './index';

const App = () => {
  const [services, setServices] = useState([]);      // Состояние для хранения списка сервисов с паролями
  const [modalOpen, setModalOpen] = useState(false);  // Состояние для отображения/скрытия модального окна
  const [newService, setNewService] = useState('');     // Состояние для нового сервиса, который добавляется
  const [newPassword, setNewPassword] = useState('');   // Состояние для нового пароля, который добавляетс
  const [searchQuery, setSearchQuery] = useState('');   // Состояние для поиска по списку сервисов

  const handleAddPassword = () => {
    const simulateServerResponse = Math.random() > 0.5;
    if (simulateServerResponse) {
      const newEntry = { service: newService, password: newPassword };
      setServices([...services, newEntry]);
      localStorage.setItem('passwords', JSON.stringify([...services, newEntry]));
      setModalOpen(false);
      setNewService('');
      setNewPassword('');
      alert('Пароль успешно сохранен!');
    } else {
      alert('Ошибка сохранения. Попробуйте снова.');
    }
  };

  // Функция для добавления нового парол
  const handleDeletePassword = (index) => {
    const simulateServerResponse = Math.random() > 0.5;
        // Фильтрация списка для удаления  пароля
    if (simulateServerResponse) {
      const updatedServices = services.filter((_, i) => i !== index);
      setServices(updatedServices);
      localStorage.setItem('passwords', JSON.stringify(updatedServices));
      alert('Пароль успешно удален!');
    } else {
      alert('Ошибка удаления. Попробуйте снова.');
    }
  };

    // Функция для удаления пароля
  const handleCopyPassword = (password) => {
    navigator.clipboard.writeText(password);
    alert('Пароль скопирован в буфер обмена!');
  };
  // Функция для генерации случайного пароля
  const generatePassword = (length = 12, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()') => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(result);
  };
  // Фильтрация списка сервисов по запросу для поиска
  const filteredServices = services.filter((entry) =>
    entry.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <header>
        <h1>Менеджер паролей</h1>
        <button onClick={() => setModalOpen(true)}>Добавить пароль</button>
        <input
          type="text"
          placeholder="Поиск по сервисам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      <main>
        <ul>
          {filteredServices.map((entry, index) => (
            <li key={index}>
              <strong>{entry.service}</strong>
              <span>{entry.password}</span>
              <button onClick={() => handleCopyPassword(entry.password)}>Копировать</button>
              <button onClick={() => handleDeletePassword(index)}>Удалить</button>
            </li>
          ))}
        </ul>
      </main>

      {modalOpen && (
        <div className="modal">
          <h2>Добавить новый пароль</h2>
          <label>
            Сервис:
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
            />
          </label>
          <label>
            Пароль:
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <button onClick={() => generatePassword()}>Сгенерировать пароль</button>
          <div className="modal-actions">
            <button onClick={handleAddPassword}>Сохранить</button>
            <button onClick={() => setModalOpen(false)}>Отмена</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
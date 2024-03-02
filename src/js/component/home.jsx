import React, { useState, useEffect } from 'react';

function ListWithInput() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('todos'));
    if (storedItems) {
      setItems(storedItems);
    } else {
      fetch('https://playground.4geeks.com/apis/fake/todos/user/LuciaPach')
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data.todos)) {
            setItems(data.todos);
            localStorage.setItem('todos', JSON.stringify(data.todos));
          } else {
            console.error('La respuesta de la API no contiene un array de elementos');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newItem = inputValue.trim();
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      localStorage.setItem('todos', JSON.stringify(updatedItems));
      setInputValue('');
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    localStorage.setItem('todos', JSON.stringify(updatedItems));
  };

  const handleDeleteAllItems = () => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/LuciaPach', {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Todos eliminados:', data);
        setItems([]);
        localStorage.removeItem('todos');
      })
      .catch(error => console.error('Error al eliminar todos los elementos:', error));
  };

  const remainingItemCount = items.length;

  return (
    <div className="container-fluid" style={{ color: '#666', fontFamily: 'inherit' }}>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h1 className="text-center mb-0" style={{ color: 'rgba(255, 182, 193, 0.9)', fontWeight: '300', marginBottom: '0' }}>TODOS</h1>
          <input
            type="text"
            className="form-control mb-0 rounded-0"
            style={{ backgroundColor: '#fff', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', fontWeight: '300', marginBottom: '0', outline: 'none', border: '1px solid rgba(255, 182, 193, 0.3)', fontSize: 'calc(16px + 3px)', color: '#666', fontFamily: 'inherit' }}
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="items-container">
            {items.slice(0).reverse().map((item, index) => (
              <div
                key={index}
                className="list-item"
                style={{ position: 'relative', marginBottom: '0', backgroundColor: '#fff', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px', marginTop: index === 0 ? '0' : '', border: '1px solid rgba(255, 182, 193, 0.3)', fontSize: 'calc(16px + 3px)', fontFamily: 'inherit', fontWeight: '300' }}
              >
                {item}
                <button
                  onClick={() => handleDeleteItem(items.length - index - 1)}
                  className="delete-button"
                  style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: 'rgba(255, 182, 193, 1)', filter: 'saturate(50%)' }}
                  onMouseEnter={(e) => e.target.style.filter = 'saturate(100%)'}
                  onMouseLeave={(e) => e.target.style.filter = 'saturate(50%)'}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div
            className="list-item"
            style={{ position: 'relative', marginBottom: '0', marginTop: '0px', backgroundColor: '#fff', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', padding: '5px 10px', border: '1px solid rgba(255, 182, 193, 0.3)', fontSize: 'calc(16px + 3px)', fontFamily: 'inherit', fontWeight: '300', fontSize: '14px'}}
          >
            {remainingItemCount} {remainingItemCount === 1 ? 'item' : 'items'} left
          </div>
          <div className="width-divs">
            <div className="width-99" style={{boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(255, 182, 193, 0.3)'}}></div>
            <div className="width-98" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(255, 182, 193, 0.3)'}}></div>
          </div>
          <button
            onClick={handleDeleteAllItems}
            style={{ marginTop: '10px', background: '#ff99cc', border: 'none', color: '#fff', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
          >
            Delete All Items
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListWithInput;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './Recept.module.css';

const Recept = () => {
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [preferences, setPreferences] = useState('');
  const [sensitivity, setSensitivity] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([{ ingredientId: '', amount: '', unit: '' }]);

  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [dayTimeOptions, setDayTimeOptions] = useState([]);
  const [sensitivityOptions, setSensitivityOptions] = useState([]);
  const [preferenceOptions, setPreferenceOptions] = useState([]);

  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedDayTime, setSelectedDayTime] = useState('');
  const [user, setUser] = useState(null);

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: '#444',
      color: 'white',
      borderColor: state.isFocused ? '#007bff' : '#444',
      boxShadow: state.isFocused ? '0 0 0 1px #007bff' : 'none',
      '&:hover': {
        borderColor: '#007bff',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: 'white',
    }),
    placeholder: (base) => ({
      ...base,
      color: 'white',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#222',
      color: 'white',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#333' : '#222',
      color: 'white',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#007bff',
      },
    }),
    input: (base) => ({
      ...base,
      color: 'white',
    }),
  };
  

  useEffect(() => {
    async function fetchOptions() {

      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        try {
          const userObj = JSON.parse(loggedInUser);
          setUser(userObj);
        } catch (error) {
          console.error('Failed to parse user from localStorage:', error);
        }
      }
      try {
        const ingredientsRes = await axios.get('http://localhost:3001/api/ingredients');
        const nationalitiesRes = await axios.get('http://localhost:3001/api/nationalities');
        const dayTimesRes = await axios.get('http://localhost:3001/api/dayTimes');
        const sensitivitiesRes = await axios.get('http://localhost:3001/api/sensitivities');
        const preferencesRes = await axios.get('http://localhost:3001/api/preferences');

        setIngredientOptions(
          ingredientsRes.data.map(ing => ({
            value: ing.Hozzavalok_id, 
            label: ing.hozzavalok_neve
          }))
        );
        setNationalityOptions(nationalitiesRes.data);
        setDayTimeOptions(dayTimesRes.data);
        setSensitivityOptions(sensitivitiesRes.data);
        setPreferenceOptions(preferencesRes.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    }

    fetchOptions();
  }, []);

  const handleIngredientChange = (index, selectedOption) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].ingredientId = selectedOption ? selectedOption.value : '';
    setIngredients(updatedIngredients);
  };

  const handleInputChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    if (field === 'amount') {
      if (value === '') {
        updatedIngredients[index][field] = '';
      } else {
        const numericValue = Math.max(0, parseFloat(value));
        updatedIngredients[index][field] = numericValue.toString();
      }
    } else {
      updatedIngredients[index][field] = value;
    }
  
    setIngredients(updatedIngredients);
  };
  
  
  

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredientId: '', amount: '', unit: '' }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const validateData = () => {
    if (!recipeName || !description || !selectedNationality || !selectedDayTime || !preferences || !sensitivity || ingredients.some(ing => !ing.ingredientId || !ing.amount || !ing.unit)) {
      alert("Please fill all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !user.felhasznalo_id) {
      alert('You need to be logged in to submit a recipe');
      return;
    }
  
    const userId = user.felhasznalo_id; 
    const formData = new FormData();
    formData.append('recipeName', recipeName);
    formData.append('description', description);
    formData.append('nationalityId', selectedNationality);
    formData.append('dayTimeId', selectedDayTime);
    formData.append('preferences', preferences);
    formData.append('sensitivity', sensitivity);
    
    if (image) {
      formData.append('image', image);
    } else {
      alert("Please upload an image.");
      return;
    }
  
    formData.append('userId', userId);
  
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][hozzavalok_id]`, ingredient.ingredientId);
      formData.append(`ingredients[${index}][mennyiseg]`, ingredient.amount);
      formData.append(`ingredients[${index}][mertekegyseg]`, ingredient.unit);
    });
  
    if (!validateData()) {
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/api/recipes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.status === 200) {
        alert('Recipe added successfully!');
      }
    } catch (error) {
      console.error('Error adding recipe:', error.response ? error.response.data : error.message);
      alert('Error adding recipe: ' + (error.response ? error.response.data.message : error.message));
    }
  };
  
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adj hozzá saját receptet</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label}>A recepted neve:</label>
          <input className={styles.input} type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} required />
        </div>
        <div>
          <div>
            <label htmlFor="file-upload">Kép feltöltése:</label>
            <input
              id="file-upload"
              className="inputFile"
              type="file"
              accept="image/*"
              required
              style={{ width: "auto", maxWidth: "100%", display: "block" }}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
        <div>
          <label className={styles.label}>Hozzávalok:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientSection}>
              <Select
              options={ingredientOptions}
              value={ingredientOptions.find(option => option.value === ingredients[index].ingredientId)}
              onChange={(selectedOption) => handleIngredientChange(index, selectedOption)}
              placeholder="Válassz egy hozzávalót..."
              isSearchable
              required
              styles={customSelectStyles}
              getOptionLabel={(e) => e.label}
              />
              <input
              className={styles.input}
              type="number"
              placeholder="Mennyiség"
              value={ingredient.amount}
              onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
              required
             />
              <input
                className={styles.input}
                type="text"
                placeholder="Mértékegység (Például: gram, csipet)"
                value={ingredient.unit}
                onChange={(e) => handleInputChange(index, 'unit', e.target.value)}
                required
              />
              <button className={styles.removeIngredientButton} type="button" onClick={() => removeIngredient(index)}>Törölni</button>
            </div>
          ))}
          <button className={styles.addIngredientButton} type="button" onClick={addIngredient}>Hozzáadni</button>
        </div>
        <div>
          <label className={styles.label}>Leírása:</label>
          <textarea className={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label className={styles.label}>Konyha:</label>
          <select className={styles.input} value={selectedNationality} onChange={(e) => setSelectedNationality(e.target.value)} required>
            <option value="">Válasz konyhát</option>
            {nationalityOptions.map(nat => (
              <option key={nat.konyha_id} value={nat.konyha_id}>{nat.nemzetiseg}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={styles.label}>Napszak:</label>
          <select className={styles.input} value={selectedDayTime} onChange={(e) => setSelectedDayTime(e.target.value)} required>
            <option value="">Válasz napszakot</option>
            {dayTimeOptions.map(dt => (
              <option key={dt.napszak_id} value={dt.napszak_id}>{dt.idoszak}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={styles.label}>Érzékenység:</label>
          <select className={styles.input} value={sensitivity} onChange={(e) => setSensitivity(e.target.value)} required>
            <option value="">Válasz érzékenységet</option>
            {sensitivityOptions.map(sen => (
              <option key={sen.erzekenyseg_id} value={sen.erzekenyseg_id}>{sen.erzekenyseg}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={styles.label}>Preferencia:</label>
          <select className={styles.input} value={preferences} onChange={(e) => setPreferences(e.target.value)} required>
            <option value="">Válasz preferenciát</option>
            {preferenceOptions.map(pref => (
              <option key={pref.etkezes_id} value={pref.etkezes_id}>{pref.etkezes}</option>
            ))}
          </select>
        </div>
        <button className={styles.button} type="submit">Recept feltöltése</button>
      </form>
    </div>
  );
};

export default Recept;

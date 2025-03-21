import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './Recept.module.css';  // Import the CSS module

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

  useEffect(() => {
    async function fetchOptions() {
      try {
        const ingredientsRes = await axios.get('http://localhost:3001/api/ingredients');
        const nationalitiesRes = await axios.get('http://localhost:3001/api/nationalities');
        const dayTimesRes = await axios.get('http://localhost:3001/api/dayTimes');
        const sensitivitiesRes = await axios.get('http://localhost:3001/api/sensitivities');
        const preferencesRes = await axios.get('http://localhost:3001/api/preferences');

        setIngredientOptions(
          ingredientsRes.data.map(ing => ({
            value: ing.Hozzavalok_id, 
            label: ing.Hozzavalok_neve
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
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
    
    const formData = new FormData();
    formData.append('recipeName', recipeName);
    formData.append('description', description);
    formData.append('nationalityId', selectedNationality);
    formData.append('dayTimeId', selectedDayTime);
    formData.append('preferences', preferences);
    formData.append('sensitivity', sensitivity);
    formData.append('image', image);

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
          <label className={styles.label}>Kép feltöltése:</label>
          <input className={styles.inputFile} type="file" accept="image/*" onChange={handleImageChange} required />
        </div>
        <div>
          <label className={styles.label}>Hozzávalok:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientSection}>
              <Select
                options={ingredientOptions}
                value={ingredientOptions.find(option => option.value === ingredients[index].ingredientId)}
                onChange={(selectedOption) => handleIngredientChange(index, selectedOption)}
                placeholder="Válasz egy hozzávalot..."
                isSearchable
                required
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

import { useState, useEffect } from "react";

const Recept = () => {
  const [kereses, setKereses] = useState("");
  const [hozzavalok, setHozzavalok] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/hozzavalok?keres=${kereses}`)
      .then(res => res.json())
      .then(data => setHozzavalok(data))
      .catch(err => console.error(err));
  }, [kereses]);

  return (
    <div>
      <input
        type="text"
        placeholder="Keresés..."
        value={kereses}
        onChange={(e) => setKereses(e.target.value)}
      />
      <ul>
        {hozzavalok.map((hozzavalo) => (
          <li key={hozzavalo.id}>{hozzavalo.Hozzavalok_neve}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recept;
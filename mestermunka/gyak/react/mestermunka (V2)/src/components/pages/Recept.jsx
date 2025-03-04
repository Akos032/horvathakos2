import { useState, useEffect } from "react";

const Recept = () => {
  const [kereses, setKereses] = useState("");
  const [hozzavalok, setHozzavalok] = useState([]);
  const [eredmeny, setEredmeny] = useState([]);
  const [toltes, setToltes] = useState([false])

  useEffect(() => {
    if(kereses === "") {
      setEredmeny([]);
      setToltes(false);
      return;
    }
  })

const ido = setTimeout(() => {
  setToltes(true);
  useEffect(() => {
    fetch(`http://localhost:3001/api/hozzavalok?keres=${kereses}`)
      .then((res) => res.json())
      .then(data => {
        const filter = data.filter((hozzavalok) => 
        hozzavalok.Hozzavalok_neve.toLowerCase().includes(kereses.toLowerCase())
        );
        setEredmeny(filter)
        setToltes(false);
      } )
      .catch(() => {
        setToltes(false);
      })
      return () => clearTimeout(ido)
  }, [kereses]);
})

const handel = (e) => {
  const value = e.target.value;
  setKereses(value)
}

return (
    <div>
      <input
        type="text"
        placeholder="Keresés..."
        value={kereses}
        onChange = {handel}
      />
      {kereses && <p>Keresés: <strong>{kereses}</strong></p>}
      {toltes && <p>Töltés...</p>}
      <div>
        {eredmeny.length > 0 ? (
          eredmeny.map((hozzavalok) => <div key = {hozzavalok.Hozzavalok_id}></div>)
        ) : (kereses && !toltes && <p>Nincs válasz</p>
        )}
      </div>
    </div>
  );
};

export default Recept;
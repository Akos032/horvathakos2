<div className={`wrapper${action === 'login' ? '' : ' active'}`}>
  <div className="form-box login">
    <form onSubmit={handleSubmit}>
      <h1>Bejelentkezés</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Felhasználónév"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <FaUser className="Ikon" />
      </div>
      <div className="input-box">
        <input
          type="email"
          placeholder="E-mail cím"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <MdOutlineAlternateEmail className="Ikon" />
      </div>
      <div className="input-box">
        <input
          type="password"
          placeholder="Jelszó"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <FaLock className="Ikon" />
      </div>
      <button type="submit">Bejelentkezés</button>
      <div className="register-link">
        <p>Nincs még fiókod? <a href="#" onClick={toggleAction}>Regisztráció</a></p>
      </div>
    </form>
  </div>
  <div className="form-box register">
    <form onSubmit={handleSubmit}>
      <h1>Regisztráció</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Felhasználónév"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <FaUser className="Ikon" />
      </div>
      <div className="input-box">
        <input
          type="email"
          placeholder="E-mail cím"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <MdOutlineAlternateEmail className="Ikon" />
      </div>
      <div className="input-box">
        <input
          type="password"
          placeholder="Jelszó"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <FaLock className="Ikon" />
      </div>
      <div className="remember-forgot">
        <label><input type="checkbox" /> Elfogadom a feltételeket</label>
      </div>
      <button type="submit">Regisztráció</button>
      <div className="register-link">
        <p>Van már fiókod? <a href="#" onClick={toggleAction}>Bejelentkezés</a></p>
      </div>
    </form>
  </div>
</div>


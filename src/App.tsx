import React, { useState } from 'react';
import { supabase } from './supabase';

export default function App() {
  const [vista, setVista] = useState('inicio'); // 'inicio' o 'presupuesto'
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rubroElegido, setRubroElegido] = useState('Plomería');
  const [descripcion, setDescripcion] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const rubros = [
    { nombre: 'Plomería', icono: '🚰' },
    { nombre: 'Electricidad', icono: '⚡' },
    { nombre: 'Pintura', icono: '🎨' },
    { nombre: 'Albañilería', icono: '🧱' },
    { nombre: 'Carpintería', icono: '🪚' },
    { nombre: 'Climatización', icono: '❄️' },
    { nombre: 'Jardinería', icono: '🌿' },
    { nombre: 'Limpieza', icono: '🧹' },
    { nombre: 'Cerrajería', icono: '🔑' },
    { nombre: 'Herrería', icono: '⚒️' },
    { nombre: 'Gasista', icono: '🔥' },
    { nombre: 'Azulejos', icono: '🟫' },
  ];

  const profesionalesDestacados = [
    {
      iniciales: 'LF',
      nombre: 'Lucía Fernández',
      rubro: 'Electricidad',
      zona: 'Caballito, CABA',
      rating: '4.9',
      desc: 'Electricista matriculada. Instalaciones a nuevo, tableros, iluminación y urgencias 24h.',
    },
    {
      iniciales: 'JP',
      nombre: 'Jorge Pereyra',
      rubro: 'Climatización',
      zona: 'Belgrano, CABA',
      rating: '4.9',
      desc: 'Técnico en aire acondicionado. Instalación, carga de gas y mantenimiento de splits.',
    },
    {
      iniciales: 'MR',
      nombre: 'Martín Ríos',
      rubro: 'Plomería',
      zona: 'Palermo, CABA',
      rating: '4.8',
      desc: 'Plomero matriculado con 12 años de experiencia. Reparaciones de cañerías y sanitarios.',
    },
  ];

  const handleSubmitPresupuesto = async (e) => {
    e.preventDefault();
    if (!nombre || !email) {
      alert('Por favor completá tu nombre y correo.');
      return;
    }

    const { error } = await supabase.from('registros').insert([
      {
        nombre: nombre,
        email: email,
        telefono: telefono,
        tipo_usuario: 'cliente',
        rubro: `${rubroElegido}: ${descripcion}`,
      },
    ]);

    if (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el presupuesto.');
    } else {
      setMensajeExito(
        '¡Solicitud enviada con éxito! Los profesionales de tu zona te contactarán en 24hs.'
      );
      setNombre('');
      setEmail('');
      setTelefono('');
      setDescripcion('');
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logoContainer} onClick={() => setVista('inicio')}>
          <span style={styles.logoIcon}>🛠️</span>
          <span style={styles.logoText}>ConectaPro</span>
        </div>
        <nav style={styles.nav}>
          <button
            onClick={() => setVista('inicio')}
            style={vista === 'inicio' ? styles.navLinkActive : styles.navLink}
          >
            Inicio
          </button>
          <button
            onClick={() => setVista('presupuesto')}
            style={styles.navBtnCTA}
          >
            Pedir presupuesto
          </button>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      {vista === 'inicio' ? (
        <main>
          {/* HERO SECTION */}
          <section style={styles.hero}>
            <div style={styles.heroContent}>
              <span style={styles.badge}>
                ✨ Profesionales verificados en Argentina
              </span>
              <h1 style={styles.heroTitle}>
                Presupuestos para tu hogar,{' '}
                <span style={styles.highlight}>sin moverte del sillón</span>
              </h1>
              <p style={styles.heroSubtitle}>
                Describí lo que necesitás y recibí ofertas de varios
                profesionales de tu zona. Compará, elegí y contactá al que mejor
                te convenga.
              </p>
              <div style={styles.heroButtons}>
                <button
                  onClick={() => setVista('presupuesto')}
                  style={styles.btnPrimary}
                >
                  Pedir presupuesto
                </button>
                <button
                  onClick={() => setVista('presupuesto')}
                  style={styles.btnSecondary}
                >
                  Ver profesionales
                </button>
              </div>
              <div style={styles.stats}>
                <span>⭐ +1200 trabajos realizados</span>
                <span>⚡ Respuestas en 24h</span>
              </div>
            </div>
          </section>

          {/* RUBROS */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>¿Qué necesitás arreglar hoy?</h2>
            <p style={styles.sectionSubtitle}>
              Elegí un rubro y pedí presupuesto en minutos.
            </p>
            <div style={styles.gridRubros}>
              {rubros.map((item, idx) => (
                <div
                  key={idx}
                  style={styles.cardRubro}
                  onClick={() => {
                    setRubroElegido(item.nombre);
                    setVista('presupuesto');
                  }}
                >
                  <span style={styles.rubroIcon}>{item.icono}</span>
                  <span style={styles.rubroNombre}>{item.nombre}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CÓMO FUNCIONA */}
          <section style={styles.howItWorks}>
            <h2 style={styles.sectionTitle}>Cómo funciona</h2>
            <div style={styles.stepsGrid}>
              <div style={styles.stepCard}>
                <h3>1. Describí tu necesidad</h3>
                <p>
                  Contá qué trabajo necesitás y en qué zona. Te lleva menos de
                  un minuto.
                </p>
              </div>
              <div style={styles.stepCard}>
                <h3>2. Recibí presupuestos</h3>
                <p>
                  Los profesionales interesados te envían su propuesta con
                  precio y mensaje.
                </p>
              </div>
              <div style={styles.stepCard}>
                <h3>3. Elegí y contactá</h3>
                <p>
                  Compará las ofertas y aceptá la que más te convenga. Listo.
                </p>
              </div>
            </div>
          </section>

          {/* PROFESIONALES DESTACADOS */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Profesionales destacados</h2>
            <p style={styles.sectionSubtitle}>
              Los mejor evaluados de la plataforma.
            </p>
            <div style={styles.gridPros}>
              {profesionalesDestacados.map((pro, idx) => (
                <div key={idx} style={styles.proCard}>
                  <div style={styles.proHeader}>
                    <div style={styles.proAvatar}>{pro.iniciales}</div>
                    <div>
                      <h4 style={styles.proName}>{pro.nombre}</h4>
                      <p style={styles.proCategory}>
                        {pro.rubro} • 📍 {pro.zona}
                      </p>
                    </div>
                  </div>
                  <p style={styles.proDesc}>{pro.desc}</p>
                  <span style={styles.rating}>⭐ {pro.rating}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      ) : (
        /* VISTA PEDIR PRESUPUESTO FORMULARIO */
        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>Pedir Presupuesto</h2>
            <p style={styles.formSubtitle}>
              Completá el formulario y te conectamos con expertos en{' '}
              {rubroElegido}.
            </p>

            {mensajeExito ? (
              <div style={styles.successBox}>
                <p>{mensajeExito}</p>
                <button
                  onClick={() => setMensajeExito('')}
                  style={styles.btnPrimary}
                >
                  Hacer otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitPresupuesto} style={styles.form}>
                <label style={styles.label}>Rubro seleccionado:</label>
                <select
                  value={rubroElegido}
                  onChange={(e) => setRubroElegido(e.target.value)}
                  style={styles.input}
                >
                  {rubros.map((r, i) => (
                    <option key={i} value={r.nombre}>
                      {r.nombre}
                    </option>
                  ))}
                </select>

                <label style={styles.label}>¿Qué necesitás que hagan?</label>
                <textarea
                  placeholder="Ej: Tengo una fuga debajo de la bacha de la cocina..."
                  style={styles.textarea}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />

                <label style={styles.label}>Tu Nombre y Apellido:</label>
                <input
                  type="text"
                  placeholder="Juan Pérez"
                  style={styles.input}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />

                <label style={styles.label}>Correo electrónico:</label>
                <input
                  type="email"
                  placeholder="juan@email.com"
                  style={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label style={styles.label}>Teléfono / WhatsApp:</label>
                <input
                  type="tel"
                  placeholder="11XXXXXXXX"
                  style={styles.input}
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />

                <button type="submit" style={styles.btnPrimaryFull}>
                  Enviar solicitud a profesionales
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>
          ConectaPro 🇦🇷 — Conectamos profesionales del hogar con quienes los
          necesitan.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eaeaea',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  logoIcon: { fontSize: '22px' },
  logoText: { fontSize: '20px', fontWeight: 'bold', color: '#111' },
  nav: { display: 'flex', alignItems: 'center', gap: '15px' },
  navLink: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px',
    color: '#555',
  },
  navLinkActive: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#2563eb',
  },
  navBtnCTA: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  hero: { padding: '60px 20px', backgroundColor: '#fff', textAlign: 'center' },
  heroContent: { maxWidth: '700px', margin: '0 auto' },
  badge: {
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  heroTitle: {
    fontSize: '36px',
    color: '#111',
    margin: '20px 0',
    lineHeight: 1.2,
  },
  highlight: { color: '#2563eb' },
  heroSubtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
    lineHeight: 1.5,
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '30px',
  },
  btnPrimary: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  btnSecondary: {
    backgroundColor: '#f3f4f6',
    color: '#333',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    color: '#666',
    fontSize: '14px',
  },
  section: {
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
  },
  sectionTitle: {
    fontSize: '24px',
    textAlign: 'center',
    color: '#111',
    marginBottom: '8px',
  },
  sectionSubtitle: {
    fontSize: '15px',
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px',
  },
  gridRubros: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '15px',
  },
  cardRubro: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    border: '1px solid #eaeaea',
  },
  rubroIcon: { fontSize: '28px', display: 'block', marginBottom: '8px' },
  rubroNombre: { fontSize: '14px', fontWeight: 'bold', color: '#333' },
  howItWorks: {
    backgroundColor: '#eff6ff',
    padding: '50px 20px',
    margin: '30px 0',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    maxWidth: '900px',
    margin: '30px auto 0',
  },
  stepCard: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
  },
  gridPros: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  proCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #eaeaea',
    position: 'relative',
  },
  proHeader: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '12px',
  },
  proAvatar: {
    width: '45px',
    height: '45px',
    backgroundColor: '#e0e7ff',
    color: '#2563eb',
    borderRadius: '50%U',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  proName: { fontSize: '16px', fontWeight: 'bold', margin: 0 },
  proCategory: { fontSize: '13px', color: '#666', margin: '2px 0 0' },
  proDesc: { fontSize: '14px', color: '#555', lineHeight: 1.4 },
  rating: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#d97706',
  },
  formContainer: {
    padding: '50px 20px',
    display: 'flex',
    justifyContent: 'center',
  },
  formCard: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '500px',
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#111',
  },
  formSubtitle: { fontSize: '14px', color: '#666', marginBottom: '25px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  label: { fontSize: '13px', fontWeight: 'bold', color: '#444' },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    minHeight: '90px',
  },
  btnPrimaryFull: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  successBox: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0fdf4',
    color: '#166534',
    borderRadius: '8px',
    border: '1px solid #bbf7d0',
  },
  footer: {
    backgroundColor: '#111',
    color: '#fff',
    textAlign: 'center',
    padding: '30px',
    marginTop: 'auto',
    fontSize: '14px',
  },
};
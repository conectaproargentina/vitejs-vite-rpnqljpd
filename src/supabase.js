// Simulación de cliente o conexión limpia
export const supabase = {
  from: (tabla) => ({
    insert: async (datos) => {
      console.log('Datos listos para guardar en tabla:', tabla, datos);
      return { error: null };
    },
  }),
};

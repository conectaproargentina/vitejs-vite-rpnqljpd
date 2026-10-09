// Simulación de cliente o conexión limpia
export const supabase = {
  from: (tabla: string) => ({
    insert: async (datos: Record<string, unknown>[]): Promise<{ error: Error | null }> => {
      console.log('Datos listos para guardar en tabla:', tabla, datos);
      return { error: null };
    },
  }),
};

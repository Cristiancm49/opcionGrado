import { create } from 'zustand';
import Swal from 'sweetalert2';

const useFormStore = create((set, get) => ({
  // Estados de carga
  isSubmitting: false,
  isSearchingUser: false,
  isSearchingElement: false,
  uploadingFile: false,

  // Datos de búsqueda
  userSearchResults: [],
  elementSearchResults: [],

  // Acciones de estado
  setSubmitting: (isSubmitting) => set({ isSubmitting }),

  // Búsqueda de usuario
  searchUser: async (identification, setValue) => {
    if (!identification.trim()) {
      Swal.fire({
        title: 'Campo requerido',
        text: 'Por favor ingrese un número de identificación',
        icon: 'warning',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    set({ isSearchingUser: true });
    
    try {
      // Simular búsqueda de usuario (aquí iría la llamada real a la API)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Datos simulados de usuario encontrado
      const mockUser = {
        identificacion: identification,
        nombre: 'DIEGO FERNANDO QUESADA PEÑA',
        dependencia: 'OFICINA DE PLANEACION',
        telefono: '123456789',
        extension: '1018'
      };

      // React Hook Form manejará el estado del formulario
      setValue('nombreSolicitante', mockUser.nombre);
      setValue('dependencia', mockUser.dependencia);
      setValue('telefonoExtension', `${mockUser.telefono} Ext: ${mockUser.extension}`);

      set({ userSearchResults: [mockUser] });

      Swal.fire({
        title: 'Usuario encontrado',
        text: `${mockUser.nombre}`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });

    } catch (error) {
      console.error('Error al buscar usuario:', error);
      set({ userSearchResults: [] });
      
      Swal.fire({
        title: 'Usuario no encontrado',
        text: 'No se encontró ningún usuario con esa identificación',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      set({ isSearchingUser: false });
    }
  },

  // Búsqueda de elemento/activo
  searchElement: async (codigo, setValue) => {
    if (!codigo.trim()) {
      Swal.fire({
        title: 'Campo requerido',
        text: 'Por favor ingrese un código de elemento',
        icon: 'warning',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    set({ isSearchingElement: true });
    
    try {
      // Simular búsqueda de elemento (aquí iría la llamada real a la API)
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Datos simulados de elemento encontrado
      const mockElement = {
        codigo: codigo,
        nombre: 'Computador de Escritorio HP ProDesk',
        marca: 'HP',
        modelo: 'ProDesk 400 G7',
        serie: 'MX123456789',
        ubicacion: 'Edificio A - Piso 2 - Oficina 205'
      };

      // Autocompletar formulario con datos del elemento usando setValue
      setValue('elementoAfectado', `${mockElement.nombre} - ${mockElement.marca} ${mockElement.modelo}`);
      setValue('ubicacionEspecifica', mockElement.ubicacion);

      set({ elementSearchResults: [mockElement] });

      Swal.fire({
        title: 'Elemento encontrado',
        text: `${mockElement.nombre}`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });

    } catch (error) {
      console.error('Error al buscar elemento:', error);
      set({ elementSearchResults: [] });
      
      Swal.fire({
        title: 'Elemento no encontrado',
        text: 'No se encontró ningún elemento con ese código',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      set({ isSearchingElement: false });
    }
  },

  // Upload de evidencias
  uploadEvidence: async (file, setValue, currentEvidencias) => {
    if (!file) return;

    set({ uploadingFile: true });
    
    try {
      // Validar tamaño de archivo (10MB máximo)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('El archivo es demasiado grande (máximo 10MB)');
      }

      // Validar tipos de archivo permitidos
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error('Tipo de archivo no permitido. Use imágenes, PDF o documentos Word.');
      }

      // Simular upload a MongoDB
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const evidencia = {
        id: Date.now(),
        nombre: file.name,
        tipo: file.type,
        tamaño: file.size,
        url: `mongo://evidencias/${Date.now()}_${file.name}`,
        fechaSubida: new Date().toISOString()
      };

      // Actualizar el array de evidencias usando setValue
      const newEvidencias = [...(currentEvidencias || []), evidencia];
      setValue('evidencias', newEvidencias);

      Swal.fire({
        title: 'Evidencia cargada',
        text: `Archivo "${file.name}" subido exitosamente`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });

      return evidencia;
    } catch (error) {
      Swal.fire({
        title: 'Error al cargar evidencia',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
      throw error;
    } finally {
      set({ uploadingFile: false });
    }
  },

  // Eliminar evidencia
  removeEvidence: (id, fileName, setValue, currentEvidencias) => {
    Swal.fire({
      title: '¿Eliminar evidencia?',
      text: `Se eliminará el archivo "${fileName}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Filtrar evidencias sin la que se va a eliminar
        const newEvidencias = currentEvidencias.filter(ev => ev.id !== id);
        setValue('evidencias', newEvidencias);

        Swal.fire({
          title: 'Evidencia eliminada',
          text: 'El archivo ha sido eliminado',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  },

  // Limpiar formulario
  resetForm: (reset) => {
    Swal.fire({
      title: '¿Limpiar formulario?',
      text: 'Se perderán todos los datos ingresados',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // React Hook Form reset
        reset();
        
        // Limpiar estados del store
        set({
          userSearchResults: [],
          elementSearchResults: []
        });

        Swal.fire({
          title: 'Formulario limpiado',
          text: 'Todos los datos han sido eliminados',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  },

  // Envío del formulario
  submitIncidencia: async (data) => {
    set({ isSubmitting: true });

    try {
      // Mapear datos del frontend al formato del backend
      const backendData = {
        // Datos del solicitante
        USUA_ID: data.identificacionSolicitante,
        DESCRIPCION_CAS: data.descripcion,
        TELEFONO: data.telefonoExtension?.split(' ')[0] || null,
        
        // Clasificación
        ID_TIPO_CASO: data.tipoCaso,
        ID_AREA_TECNICA: data.areaTecnica,
        ID_PRIORIDAD: data.prioridad,
        CANAL_INGRESO: data.canalIngreso,
        
        // Elemento afectado (opcional)
        ID_ACTIVO: data.codigoPatrimonial || null,
        
        // Observaciones adicionales
        OBSERVACIONES_ADICIONALES: data.observaciones || null,
        
        // Evidencias
        EVIDENCIAS: data.evidencias || [],
        
        // Campos automáticos
        FECHA_REGISTRO: new Date().toISOString(),
        ESTADO_INICIAL: 'REGISTRADO'
      };

      console.log('Enviando incidencia:', backendData);
      
      // Simular llamada a la API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generar número de caso simulado
      const numeroCaso = `INC-${Date.now().toString().slice(-6)}`;
      
      Swal.fire({
        title: 'Incidencia registrada exitosamente',
        html: `
          <div class="text-center">
            <p class="text-lg font-semibold mb-2">Número de caso: <span class="text-blue-600">${numeroCaso}</span></p>
            <p class="mb-2">Se ha enviado una notificación por correo electrónico</p>
            <p class="text-sm text-gray-600">Puede hacer seguimiento con el número de caso asignado</p>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido'
      });
      
      return { success: true, numeroCaso, data: backendData };
    } catch (error) {
      console.error('Error al enviar incidencia:', error);
      
      Swal.fire({
        title: 'Error al registrar incidencia',
        text: 'Ocurrió un error inesperado. Por favor intente nuevamente.',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
      
      return { success: false, error: error.message };
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Función helper para formatear tamaño de archivo
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Función helper para validar tipo de archivo
  isValidFileType: (file) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    return allowedTypes.includes(file.type);
  }
}));

export default useFormStore;
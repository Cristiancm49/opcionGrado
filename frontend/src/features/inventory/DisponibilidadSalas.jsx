import { textStyles } from '../../styles/theme';

const DisponibilidadSalas = () => {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-1">
          <h1 className={textStyles.h1}>
            Disponibilidad de Salas
          </h1>
        </div>
  
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://chaira.uniamazonia.edu.co/Reservas/Views/Public/Salas.aspx?tipo=Sistemas"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Disponibilidad de Salas - UNIAMAZONIA"
            className="w-full h-full"
          />
        </div>
      </div>
    );
  };
  
  export default DisponibilidadSalas;
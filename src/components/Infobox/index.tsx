interface InfoboxProps {
  distance: string;
  duration: string;
}

export const Infobox = ({ distance, duration }: InfoboxProps) => {
  return (
    <div
      className={`
      absolute 
      z-20 bottom-0
       text-white text-lg
      flex flex-col justify-center items-center rounded
      `}
    >
      <div className="flex flex-col bg-gray-500 items-center w-screen">
        <label>
          <b>Tempo:</b> {duration}
        </label>
        <label>
          <b>Distância:</b> {distance}
        </label>
      </div>
    </div>
  );
};

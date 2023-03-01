interface ModalProps {
  onModalSelect: (event: any) => void;
}

export const Modal = ({ onModalSelect }: ModalProps) => {
  return (
    <div className="relative z-20">
      <select
        className="h-10 w-56 text-lg ml-2"
        onChange={onModalSelect}
        defaultValue={google.maps.TravelMode.DRIVING}
      >
        <option value={google.maps.TravelMode.DRIVING}>Carro</option>
        <option value={google.maps.TravelMode.BICYCLING}>Bike</option>
        <option value={google.maps.TravelMode.WALKING}>Caminhando</option>
      </select>
    </div>
  );
};

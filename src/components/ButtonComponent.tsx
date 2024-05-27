interface Props {
  label?: string;
  setFunction?: (newValue: any) => void;
  position?: string;
}

const ButtonComponent = ({
  label = "Lägg till",
  setFunction,
  position,
}: Props) => {
  const justifyContentClass =
    position === "center" ? "items-center justify-center" : "justify-end";

  return (
    <div className={`flex ${justifyContentClass}`}>
      <button type="button" className="btn" onClick={setFunction}>
        {label}
      </button>
    </div>
  );
};

export default ButtonComponent;

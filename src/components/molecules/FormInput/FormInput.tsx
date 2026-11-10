interface IFormInputProps {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
}

const FormInput = ({
  name,
  label,
  type = "text",
  defaultValue = "",
}: IFormInputProps) => {
  return (
    <div className="relative w-full">
      <label className="absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[9px] text-muted">
        {label} :
      </label>

      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="h-[46px] w-full rounded-[14px] border border-[#BDBDBD] bg-transparent px-3 text-right text-[11px] text-foreground outline-none transition focus:border-[#91FF45]"
      />
    </div>
  );
};

export default FormInput;

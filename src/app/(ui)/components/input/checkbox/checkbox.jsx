// children diisi dengan konten, bisa berupa string atau elemen HTML

export default function InputCheckbox({ children, id }) {
  return (
    <div className="flex gap-4 items-center my-4">
      <input type="checkbox" name={id} id={id} className="w-[30px] h-[26px]" />
      <label htmlFor="agreement" className="text-2xl font-light">
        {children}
      </label>
    </div>
  );
}

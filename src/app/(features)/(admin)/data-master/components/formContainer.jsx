"use client";
export default function FormContainer({ onSubmit = () => {}, children }) {
  return (
    <form
      onSubmit={onSubmit}
      className="border-[2px] border-black rounded-lg p-4 pe-16 flex flex-col justify-between gap-12"
    >
      {children}
    </form>
  );
}

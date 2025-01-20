import Label from "../../content-management/components/label/label"

export default function InputPassword({ label, onChange, value, id }) {
    return <div className="flex flex-col gap-2">
        <Label text={label} id={id} />
        <input
          type="password"
          name={id}
          id={id}
          onChange={onChange}
          value={value}
          className="w-full px-5 py-4 rounded-[4px] text-[16px] border text-xl"
        />
    </div>
}
import Image from "next/image";
import SecondaryButton from "../../components/button/secondary/secondary-button.jsx";
import InputTextValue from "../../components/input/text/text-value.jsx";
import ButtonSave from "../../components/button/save/save-button.jsx";

export default function ProfilePage() {
  return (
    <div className="border rounded-xl px-14 py-8 shadow-lg">
      <form action="">
        {/* profile picture */}
        <div className="">
          <p className="text-[#707070] text-2xl font-bold mb-5">
            Profile Picture
          </p>
          <div className="flex gap-12 items-center">
            <Image
              src={"/img/avatar.webp"}
              width={160}
              height={160}
              alt="avatar"
              className="rounded-full"
            />
            <div className="flex gap-3">
              <SecondaryButton
                text="Change Profile"
                className={"text-white bg-[#007AFF]"}
              />
              <SecondaryButton
                text="Delete Picture"
                className={"text-red-600 bg-[#E3E3E3]"}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        {/* username */}
        <InputTextValue id={"username"} label={"Username"} value={"EUIX"} />

        {/* no handphone */}
        <InputTextValue
          id={"no handphone"}
          label={"No Handphone"}
          value={"081234567890"}
        />

        {/* alamat */}
        <InputTextValue
          id={"alamat"}
          label={"Alamat"}
          value={"Jl. Raya Cibaduyut"}
        />
        {/* save button */}
        <div className="mt-20 w-full flex justify-end">
          <ButtonSave />
        </div>
      </form>
    </div>
  );
}

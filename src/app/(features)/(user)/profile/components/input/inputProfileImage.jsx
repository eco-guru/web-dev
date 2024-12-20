import { useState } from "react";
import UserAvatar from "../../../components/userAvatar";
import ElevatedProfileButton from "../button/elevatedProfileButton";
import RingProfileButton from "../button/ringProfileButton";
import LabelInputUserProfile from "../labelInputUserProfile";

export default function InputProfileImage({ onChange, imgUrl }) {

  return (
    <>
      <LabelInputUserProfile text={"Profile Picture"} id={"picture"} />
      <div className="flex items-center gap-[47px]">
        <UserAvatar
          src={imgUrl || "/img/avatar/user-avatar.png"}
          width={162}
          height={162}
        />
        <div className="">
          <div className="flex gap-3">
            <input
              type="file"
              name="profile"
              id="profile"
              onChange={(e) => onChange(e)}
              hidden
            />
            <div className="flex items-center">
              <ElevatedProfileButton id={"profile"} text={"Change Profile"} />
            </div>
            <RingProfileButton text={"Delete Profile"} />
          </div>
        </div>
      </div>
    </>
  );
}

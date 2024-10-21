"use client";
import DataTable from "../components/table/data-table.jsx";

import InputTextValue from "../components/input/text/text-value.jsx";
import InputPasswordLabel from "../components/input/password/password-label.jsx";
import SecondaryButton from "../components/button/secondary/secondary-button.jsx";

export default function AdminPage() {
  return (
    <div className="text-black shadow-sm">
      <h1 className="text-4xl font-extrabold tracking-widest text-center my-7">
        User Management
      </h1>
      <div className="w-2/3 mx-auto">
        <form action="" className="">
          <div className="flex justify-between gap-20">
            <ul className="w-[50%]">
              <li>
                <InputTextValue
                  id="username"
                  label="Username"
                  value=""
                  error=""
                  onChange={() => {}}
                />
              </li>
              <li>
                <InputTextValue
                  id="phone"
                  label="phone"
                  value=""
                  error=""
                  onChange={() => {}}
                />
              </li>
              <li>
                <div className="my-7">
                  <label
                    htmlFor={`role`}
                    className="ml-3 text-[#707070] text-2xl font-bold mb-3"
                  >
                    {`Role`}
                  </label>
                  <select
                    name="role"
                    id="role"
                    className={`text-black outline-none rounded-lg px-5 py-2 text-2xl w-full border focus:border-[#276561] hover:border-[#27656179]`}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="educator">Educator</option>
                    <option value="wasteCollector">Waste Collector</option>
                  </select>
                </div>
              </li>
            </ul>
            <ul className="w-[50%]">
              <li>
                <InputPasswordLabel
                  id="password"
                  label="password"
                  value=""
                  error=""
                  onChange={() => {}}
                />
              </li>
              <li>
                <InputPasswordLabel
                  id="confirmPassword"
                  label="confirmPassword"
                  value=""
                  error=""
                  onChange={() => {}}
                />
              </li>
            </ul>
          </div>
          {/* button submit */}
          <div className="text-end">
            <SecondaryButton
              text="Create"
              className={"text-white bg-[#007AFF] font-extrabold w-[200px]"}
            />
          </div>
        </form>
      </div>

      {/* table */}

      <div className="w-2/3 mx-auto">
        <h1 className="text-4xl font-extrabold tracking-widest text-center my-7 mt-10">
          List User
        </h1>
        <DataTable />
      </div>
    </div>
  );
}

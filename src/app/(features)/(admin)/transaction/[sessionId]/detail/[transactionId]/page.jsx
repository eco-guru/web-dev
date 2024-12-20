"use client";

import Divider from "@/app/(features)/(admin)/components/divider";
import PrimaryButton from "@/app/(features)/(admin)/data-master/components/button/primaryButton";
import FormContainer from "@/app/(features)/(admin)/data-master/components/formContainer";
import Heading1 from "@/app/(features)/(admin)/data-master/components/heading1";
import Input from "@/app/(features)/(admin)/data-master/components/input/input";
import InputDisabled from "@/app/(features)/(admin)/data-master/components/input/inputDisabled";
import InputText from "@/app/(features)/(admin)/data-master/components/input/inputText";
import Label from "@/app/(features)/(admin)/data-master/components/label";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function TransactionDetailPage({ params }) {
  const { transactionId, sessionId } = React.use(params);
  const router = useRouter();

  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div>
      <FormContainer onSubmit={() => {}}>
        <Heading1 text={"Detail Transaksi"} />
        <div className="flex flex-col gap-6">
          <InputDisabled label={"Nama Nasabah"} value={"EUIS"} />
          <Divider />
          <div className="flex items-center justify-between">
            <Label text={"Kantong plastik"} className="shrink-0" />
            <div className="flex w-[70%] gap-6">
              <Input
                text={"Kantong plastik"}
                readOnly={true}
                value="10 kilogram"
              />
              <Input
                text={"Kantong plastik"}
                readOnly={true}
                value="Rp 15.000"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <PrimaryButton text={"Kembali"} onClick={handleBack} />
        </div>
      </FormContainer>
    </div>
  );
}

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
import { useEffect } from "react";
import * as React from "react";

export default function TransactionDetailPage({ params }) {
  const { transactionId, sessionId } = React.use(params);
  const [transaction, setTransaction] = React.useState();
  const router = useRouter();

  useEffect(() => {
    const getTransaction = async () => {
      console.log(transactionId);
      if(transactionId) {
        const response = await fetch(`/api/transaction/getOne/${transactionId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data.data);
        setTransaction(data.data);
      }
    }
    getTransaction()
  }, [transactionId]);

  const handleBack = (e) => {
    e.preventDefault();
    router.push('/transaction');
  };

  return (
    <div>
      <FormContainer onSubmit={() => {}}>
        <Heading1 text={"Detail Transaksi"} />
        <div className="flex flex-col gap-6">
          <InputDisabled label={"Nama Nasabah"} value={transaction?.Users.username} />
          <Divider />
          {
            transaction?.TransactionData.map((value, index) => (
              <div key={index} className="flex items-center justify-between">
                <Label text={value.WasteType.type} className="shrink-0" />
                <div className="flex w-[70%] gap-6">
                  <Input
                    text={value.WasteType.type}
                    readOnly={true}
                    value={`${value.quantity} kilogram`}
                  />
                  <Input
                    text={"Kantong plastik"}
                    readOnly={true}
                    value={`Rp ${(value.price * value.quantity).toLocaleString('id-ID')}`}
                  />
                </div>
              </div>
            ))
          }
        </div>
        <div className="flex justify-end">
          <PrimaryButton text={"Kembali"} onClick={handleBack} />
        </div>
      </FormContainer>
    </div>
  );
}

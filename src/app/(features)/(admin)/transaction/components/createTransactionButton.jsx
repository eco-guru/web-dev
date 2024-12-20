import { useRouter } from "next/navigation";
import PrimaryButton from "../../data-master/components/button/primaryButton";
import { createTransaction } from "../service/transactionService";

export default function CreateTransactionButton() {
  const router = useRouter();

  const handleCreateTransaction = async (e) => {
    e.preventDefault();

    const transactionData = {
      total: 0,
    };

    try {
      const result = await createTransaction(transactionData);
      console.log("Transaction created:", result);
      router.push(`/transaction/${result.data.id}`); // Redirect or update state if necessary
    } catch (error) {
      console.error("Failed to create transaction:", error.message);
    }
  };

  return <PrimaryButton text={"Tambah Sesi"} onClick={handleCreateTransaction} />;
}

import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const CreateTables = () => {

  const createTables = async () => {

    try {

      for (let i = 1; i <= 20; i++) {

        await setDoc(
          doc(collection(db, "tables"), `table${i}`),
          {
            number: i,
            status: "Available",
          }
        );

      }

      alert("20 tables created successfully!");

    } catch (error) {
      console.log(error);
      alert(error.message);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <button
        onClick={createTables}
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-xl font-bold"
      >
        Create Restaurant Tables
      </button>

    </div>
  );
};

export default CreateTables;
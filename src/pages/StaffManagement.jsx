import { useEffect, useMemo, useState } from "react";
import { db, auth } from "../firebase";

import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";

const StaffManagement = () => {

  const [staff, setStaff] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("cashier");

  // ==========================
  // LIVE STAFF LISTENER
  // ==========================

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "staff"),
      (snapshot) => {

        const staffList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStaff(staffList);

      }
    );

    return () => unsubscribe();

  }, []);

  // ==========================
  // SEARCH STAFF
  // ==========================

  const filteredStaff = useMemo(() => {

    return staff.filter((member) => {

      const keyword = search.toLowerCase();

      return (

        member.name?.toLowerCase().includes(keyword) ||

        member.email?.toLowerCase().includes(keyword) ||

        member.role?.toLowerCase().includes(keyword)

      );

    });

  }, [staff, search]);

  // ==========================
  // DASHBOARD STATS
  // ==========================

  const stats = useMemo(() => {

    const totalStaff = staff.length;

    const activeStaff = staff.filter(
      (member) => member.active
    ).length;

    const disabledStaff = totalStaff - activeStaff;

    const admins = staff.filter(
      (member) => member.role === "admin"
    ).length;

    const cashiers = staff.filter(
      (member) => member.role === "cashier"
    ).length;

    const waiters = staff.filter(
      (member) => member.role === "waiter"
    ).length;

    const kitchens = staff.filter(
      (member) => member.role === "kitchen"
    ).length;

    return {
      totalStaff,
      activeStaff,
      disabledStaff,
      admins,
      cashiers,
      waiters,
      kitchens,
    };

  }, [staff]);

  // ==========================
  // ENABLE / DISABLE STAFF
  // ==========================

  const toggleStatus = async (id, active) => {

    await updateDoc(
      doc(db, "staff", id),
      {
        active: !active,
      }
    );

  };

  // ==========================
  // DELETE STAFF
  // ==========================

  const deleteStaff = async (id) => {

    if (!window.confirm("Delete this staff member?")) return;

    await deleteDoc(doc(db, "staff", id));

  };

  // ==========================
  // CREATE STAFF
  // ==========================

  const addStaff = async (e) => {

    e.preventDefault();

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await setDoc(doc(db, "staff", user.uid), {

        name,

        email,

        role,

        active: true,

        createdAt: new Date(),

      });

      alert("Staff created successfully!");

      setName("");

      setEmail("");

      setPassword("");

      setRole("cashier");

      setShowModal(false);

    } catch (error) {

      alert(error.message);

    }

  };

  return (
    <section className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          👥 Staff Management
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-bold"
        >
          ➕ Add Staff
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Total Staff
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.totalStaff}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Active
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {stats.activeStaff}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Disabled
          </p>

          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {stats.disabledStaff}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Admins
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {stats.admins}
          </h2>

        </div>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Staff..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl p-4 mb-8"
      />

      {/* Staff Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-red-600 text-white">

            <tr>

              <th className="p-4">Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredStaff.map((member) => (

              <tr
                key={member.id}
                className="border-b text-center"
              >

                <td className="p-4">

                  {member.name}

                </td>

                <td>

                  {member.email}

                </td>

                <td className="capitalize">

                  {member.role}

                </td>

                <td>

                  {member.active ? (

                    <span className="text-green-600 font-bold">

                      Active

                    </span>

                  ) : (

                    <span className="text-red-600 font-bold">

                      Disabled

                    </span>

                  )}

                </td>

                <td className="space-x-2">

                  <button
                    onClick={() =>
                      toggleStatus(member.id, member.active)
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >

                    {member.active
                      ? "Disable"
                      : "Enable"}

                  </button>

                  <button
                    onClick={() =>
                      deleteStaff(member.id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >

                    Delete

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Add Staff Modal */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

            <h2 className="text-3xl font-bold mb-6">

              Add Staff

            </h2>

            <form
              onSubmit={addStaff}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border rounded-lg p-3"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border rounded-lg p-3"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border rounded-lg p-3"
                required
              />

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              >

                <option value="admin">
                  Admin
                </option>

                <option value="cashier">
                  Cashier
                </option>

                <option value="waiter">
                  Waiter
                </option>

                <option value="kitchen">
                  Kitchen
                </option>

              </select>

              <div className="flex gap-3">

                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold"
                >

                  Create Staff

                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-bold"
                >

                  Cancel

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </section>
  );

};

export default StaffManagement;
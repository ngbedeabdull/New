import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("adminLoggedIn")) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();

    try {
      // Login with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      // Check staff collection
      const staffRef = doc(db, "staff", user.uid);
      const staffSnap = await getDoc(staffRef);

      if (!staffSnap.exists()) {
        alert("Staff account not found.");
        return;
      }

      const staff = staffSnap.data();

      if (!staff.active) {
        alert("Your account has been disabled.");
        return;
      }

      // Save login
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("staffRole", staff.role);

      alert("Login Successful!");

      if (staff.role === "admin") {
        navigate("/admin/dashboard");
      } else if (staff.role === "kitchen") {
        navigate("/kitchen");
      } else if (staff.role === "waiter") {
        navigate("/waiter");
      } else if (staff.role === "cashier") {
        navigate("/cashier");
      } else {
        alert("Unknown staff role.");
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
          Staff Login
        </h1>

        <form onSubmit={login} className="space-y-6">

          <input
            type="email"
            placeholder="Staff Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold"
          >
            Login
          </button>

        </form>

      </div>

    </section>
  );
};

export default AdminLogin;
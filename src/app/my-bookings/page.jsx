"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [editBooking, setEditBooking] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.error) setError(data.error);
      else setBookings(data);
    } catch {
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

   

  // Delete booking
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://agro-vet.vercel.app/api/bookings/${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
        toast.success("Booking deleted successfully!");
      } else {
        toast.error("Failed to delete booking");
      }
    } catch {
      toast.error("Error deleting booking");
    }
  };

  // Open edit modal
  const handleEditClick = (booking) => {
    setEditBooking(booking._id);
    setFormData({
      fullName: booking.fullName,
      email: booking.email,
      phone: booking.phone,
      address: booking.address,
    });
  };

  // Save edit changes
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/bookings/${editBooking}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Booking updated successfully!");
        setEditBooking(null);
        fetchBookings();
      } else {
        toast.error("Failed to update booking");
      }
    } catch {
      toast.error("Error updating booking");
    }
  };

const { data: session } = useSession();
if (!session) return (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 rounded-lg shadow text-center">
      <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
        You have no products 😔
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Start adding some to see them here.
      </p>
    </div>
  </div>
);


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Bookings</h2>
      </div>

      {bookings.length === 0 ? (
        <div>No bookings found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                <th className="p-2 border dark:border-gray-700">Name</th>
                <th className="p-2 border dark:border-gray-700">Product</th>
                <th className="p-2 border dark:border-gray-700">Price</th>
                <th className="p-2 border dark:border-gray-700">Email</th>
                <th className="p-2 border dark:border-gray-700">Phone</th>
                <th className="p-2 border dark:border-gray-700">Address</th>
                <th className="p-2 border dark:border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="p-2 border dark:border-gray-700">
                    {booking.fullName}
                  </td>
                  <td className="p-2 border dark:border-gray-700">
                    {booking.title || "N/A"}
                  </td>
                  <td className="p-2 border dark:border-gray-700">
                    {booking.price ? `$${booking.price}` : "N/A"}
                  </td>
                  <td className="p-2 border dark:border-gray-700">
                    {booking.email}
                  </td>
                  <td className="p-2 border dark:border-gray-700">
                    {booking.phone}
                  </td>
                  <td className="p-2 border dark:border-gray-700">
                    {booking.address}
                  </td>
                  <td className="border dark:border-gray-700 space-x-2">
                    <button
                      onClick={() => handleEditClick(booking)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              Edit Booking
            </h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                readOnly
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              />
              <input
                type="email"
                placeholder="Email"
                readOnly
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              />
              <textarea
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              ></textarea>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-400 px-3 py-1 rounded hover:bg-gray-500"
                  onClick={() => setEditBooking(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;

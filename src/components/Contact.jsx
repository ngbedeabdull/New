const Contact = () => {
  return (
    <section className="w-full py-20 px-10 bg-gray-50">

      <h2 className="text-5xl font-bold text-center text-red-600 mb-14">
        Contact Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">

          <h3 className="text-3xl font-bold mb-8">
            Visit MJ Restaurant
          </h3>

          <p className="mb-6 text-xl font-semibold text-gray-700 leading-9">
            📍 <br />
            <span className="font-bold">Address</span><br />
            Anyigba, Kogi State, Nigeria
          </p>

          <p className="mb-6 text-xl font-semibold text-gray-700 leading-9">
            📞 <br />
            <span className="font-bold">Phone</span><br />
            +234 706 063 1377
          </p>

          <p className="text-xl font-semibold text-gray-700 leading-9">
            📧 <br />
            <span className="font-bold">Email</span><br />
            your@email.com
          </p>

        </div>

        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">

          <h3 className="text-3xl font-bold mb-8">
            Opening Hours
          </h3>

          <p className="mb-5 text-xl font-semibold text-gray-700">
            Monday – Friday
            <br />
            8:00 AM – 10:00 PM
          </p>

          <p className="mb-5 text-xl font-semibold text-gray-700">
            Saturday
            <br />
            9:00 AM – 11:00 PM
          </p>

          <p className="mb-8 text-xl font-semibold text-gray-700">
            Sunday
            <br />
            12:00 PM – 9:00 PM
          </p>

          <button className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold px-10 py-4 rounded-xl transition duration-300">
            Get Directions
          </button>

        </div>

      </div>

    </section>
  );
};

export default Contact;
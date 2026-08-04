const WhyChooseUs = () => {
  const features = [
    {
      icon: "🍔",
      title: "Delicious Meals",
      description: "Prepared fresh every day by our experienced chefs.",
    },
    {
      icon: "⚡",
      title: "Fast Service",
      description: "Your food is served quickly while maintaining quality.",
    },
    {
      icon: "🥗",
      title: "Fresh Ingredients",
      description: "We use only fresh and healthy ingredients.",
    },
    {
      icon: "😊",
      title: "Excellent Customer Care",
      description: "We make every customer feel welcome and valued.",
    },
  ];

  return (
    <section className="w-full py-20 px-10 bg-gray-50">

      <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
        Why Choose MJ Restaurant?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-2xl hover:shadow-2xl transition duration-300 p-8 text-center"
          >
            <div className="text-5xl mb-5">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-bold mb-4">
              {feature.title}
            </h3>

            <p className="text-gray-600 leading-7">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default WhyChooseUs;
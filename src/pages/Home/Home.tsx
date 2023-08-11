import React from "react";
import Layout from "../../components/Layout/Layout";

const Home: React.FC = (): JSX.Element => {
  return (
    <section>
      <Layout>
        <h4 className="text-green-300 font-bold capitalize">hello world</h4>
      </Layout>
    </section>
  );
};

export default Home;

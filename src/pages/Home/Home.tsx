import React from "react";
import Layout from "../../components/Layout/Layout";
import ArrowIcon from "./../../assets/arrow.svg";
import TrashCan from "./../../assets/trash.svg";
import MoneyBag from "./../../assets/money.svg";
import Finger from "./../../assets/finger.svg";
import Button from "../../components/Button/Button";

const Home: React.FC = (): JSX.Element => {
  return (
    <section>
      <Layout>
        <section className="m-auto w-full">
          <div className="container mx-auto py-16 px-4  lg:flex lg:items-start overflow-x-hidden">
            <div className="lg:w-1/2 lg:ml-12 mt-8 lg:mt-28">
              <h1 className="md:text-4xl text-3xl  font-bold capitalize mb-4">
                bridging the gap between consumers and recycling companies{" "}
              </h1>
              <p className="text-slate-600 py-5">
                Recykle connects recycling companies and individuals through a
                seamless platform, turning eco-conscious actions into rewarding
                partnerships.
              </p>

              <section className="action-button flex my-8">
                <Button outline={false} className="w-2/4">
                  get started
                </Button>
              </section>
            </div>

            <div className="lg:w-1/2 transform lg:translate-y-[-20%]">
              <img src={TrashCan} alt="Hero" className="w-full h-auto" />
            </div>
          </div>
        </section>

        <section className="m-auto w-full">
          <div className="container mx-auto py-16 px-4 flex flex-col-reverse  lg:flex-row lg:items-start">
            <div className="lg:w-1/2 transform lg:translate-y-[-20%]">
              <img src={MoneyBag} alt="Hero" className="w-full h-auto" />
            </div>

            <div className="lg:w-1/2 lg:ml-12 mt-8 lg:mt-28 overflow-hidden">
              <h1 className="md:text-4xl text-3xl  font-bold capitalize mb-4">
                get rewarded for your ecofriendly actions
              </h1>
              <p className="text-slate-600 py-4">
                Embrace the green movement with Recykle and earn rewards for
                your eco-friendly efforts. Join us in building a more
                sustainable future while enjoying tangible benefits for your
                commitment to recycling."
              </p>
              <section className="action-button flex my-10  hover:border-green-300">
                <Button outline className="w-2/4">
                  get started
                </Button>
              </section>
              <img
                src={ArrowIcon}
                alt="Hero"
                className="w-full h-64 ransform scale-x-[-1] rotate-[380deg] arrow-icon md:block hidden"
              />

              <img
                src={Finger}
                alt="Hero"
                className="my-10 md:my-1 w-full h-48 ransform rotate-[250deg] md:hidden block"
              />
            </div>
          </div>
        </section>
      </Layout>
    </section>
  );
};

export default Home;

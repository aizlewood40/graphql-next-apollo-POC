import { NextPage } from "next";

type Props = {
  title: string;
};

const TestPage: NextPage<Props> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Welcome to my home page!</p>
    </div>
  );
};

TestPage.getInitialProps = async () => {
  // fetch some data here
  return { title: "My Home Page" };
};

export default TestPage;
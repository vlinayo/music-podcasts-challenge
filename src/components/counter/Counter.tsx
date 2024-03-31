import counterStyles from "./Counter.module.scss";

interface CounterProps {
  number: number;
}

//Component used to display amount of podcasts being displayed in the home page
const Counter: React.FC<CounterProps> = ({ number }) => {
  return (
    <div className={counterStyles.counter}>
      <p>{number}</p>
    </div>
  );
};

export default Counter;

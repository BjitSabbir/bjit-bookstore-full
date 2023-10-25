/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function CountUp({ end }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (end > 300) {
            setCount(Math.floor(end - 100)); // Round down to the nearest integer
        }
    }, [end]);
    useEffect(() => {
        if (count < end) {
            const interval = setInterval(() => {
                setCount((prevCount) => prevCount + 1);
            }, (1000 / (end - count)) * 2);
            return () => {
                clearInterval(interval);
            };
        }
    }, [count, end]);

    return (
        <div>
            <h1>{count}</h1>
        </div>
    );
}

export default CountUp;

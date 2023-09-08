import { useState } from 'react';
import './Home.css';

export const Home = () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [age, setAge] = useState({ years: '- -', months: '- -', days: '- -' });
    const [error, setError] = useState(null);
    const [error1, setError1] = useState(null);
    const [error2, setError2] = useState(null);

    const calculateAge = () => {
        // Parse input values as integers
        const d1 = parseInt(day, 10);
        const m1 = parseInt(month, 10);
        const y1 = parseInt(year, 10);

        const date = new Date();
        const d2 = date.getDate();
        const m2 = date.getMonth() + 1; // Months are 0-indexed, so add 1
        const y2 = date.getFullYear();
        const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (isNaN(d1) || d1 < 1 || d1 > 31) {
            setError('It must be a valid day');
            setErrorClass('day', true); // Add the error class to the day input
            return;
        } else {
            setError(null);
            setErrorClass('day', false); // Remove the error class from the day input
        }

        if (isNaN(m1) || m1 < 1 || m1 > 12) {
            setError1('It must be a valid month');
            setErrorClass('month', true); // Add the error class to the month input
            return;
        } else {
            setError1(null);
            setErrorClass('month', false); // Remove the error class from the month input
        }

        if (isNaN(y1) || y1 > y2) {
            setError2('It must be in the past');
            setErrorClass('year', true); // Add the error class to the year input
            return;
        } else {
            setError2(null);
            setErrorClass('year', false); // Remove the error class from the year input
        }

        let d = d2 - d1;
        let m = m2 - m1;
        let y = y2 - y1;

        if (d < 0) {
            m--;
            const prevMonthLength = monthLengths[m2 - 2 >= 0 ? m2 - 2 : 11];
            d += prevMonthLength;
        }
        if (m < 0) {
            y--;
            m += 12;
        }

        setAge({ years: y, months: m, days: d });
    };

    // Function to toggle error classes on inputs
    const setErrorClass = (field, hasError) => {
        const inputElement = document.getElementById(`error${field.charAt(0).toUpperCase() + field.slice(1)}`);
        if (inputElement) {
            if (hasError) {
                inputElement.classList.add('input-changed');
            } else {
                inputElement.classList.remove('input-changed');
            }
        }
    };

    return (
        <div>
            <div className="container">
                <div className='second-container'>
                    <div className="third-container">
                        <div className="data">
                            <p className="little-title">D A Y</p>
                            <input
                                type="number"
                                className={`input ${error ? 'input-changed' : ''}`}
                                placeholder="DD"
                                required
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                id='errorDay'
                            />
                            {error && <p className="error">{error}</p>}
                        </div>
                        <div className="data">
                            <p className="little-title">M O N T H</p>
                            <input
                                type="number"
                                className={`input ${error1 ? 'input-changed' : ''}`}
                                placeholder="MM"
                                required
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                id='errorMonth'
                            />
                            {error1 && <p className="error">{error1}</p>}
                        </div>
                        <div className="data">
                            <p className="little-title">Y E A R</p>
                            <input
                                type="number"
                                className={`input ${error2 ? 'input-changed' : ''}`}
                                placeholder="YYYY"
                                required
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                id='errorYear'
                            />
                            {error2 && <p className="error">{error2}</p>}
                        </div>
                    </div>
                    <button className='bottone' onClick={calculateAge}>Calculate Age</button>
                </div>
                <hr className="hr" />
                <div className="counter-container">
                    <div className="years">
                        <span className="violet-text">{age.years}</span> years
                    </div>
                    <div className="months">
                        <span className="violet-text">{age.months}</span> months
                    </div>
                    <div className="days">
                        <span className="violet-text">{age.days}</span> days
                    </div>
                </div>
            </div>
        </div>
    );
};

import HeaderLetter from "./HeaderLetter";
import styled from "styled-components";
import { useState } from "react";

const HeaderStyles = styled.div`
  padding-top: 10vh;
  display: flex;
  justify-content: center;
`;

const Header = (props: { text: string }) => {
    const letters = props.text.split("");
    // Index is 99, to keep the default state
    const [currentLetterIndex, setCurrentLetterIndex] = useState(99);

    const handleLetterClick = (targetIndex: number) => {
        // Check if we are not already looping through the letters
        if (currentLetterIndex === 99) {
            // Start from the first letter
            setCurrentLetterIndex(0);
            // Set up an interval to update the index every second
            const intervalId = setInterval(() => {
                setCurrentLetterIndex(prevIndex => {
                    // If we've reached the last letter, clear the interval and set index to 99 after one more second
                    if (prevIndex === targetIndex) {
                        clearInterval(intervalId);
                        setTimeout(() => setCurrentLetterIndex(99), 100);
                        return 99;
                    } else {
                        // Otherwise, move to the next letter
                        return prevIndex + 1;
                    }
                });
            }, 400);
        }
    };


    function getDirection(index: number, currentLetterIndex: number) {
        return currentLetterIndex === index ? -20 : 0
    }

    const renderLetters = () => {
        return letters.map((letter, index) => (
            <HeaderLetter
                key={`${index}`}
                letter={letter}
                direction={getDirection(index, currentLetterIndex)}
                onClick={() => handleLetterClick(index)}
            />
        ));
    };

    return <HeaderStyles>{renderLetters()}</HeaderStyles>;
};

export default Header;

import { render, screen } from "@testing-library/react";
import Header from "../Header";

const gameWon = jest.fn();

function MockHeader1() {
    const data = {
        characters: [
            {
                name: "waldo",
                beenFound: true
            }
        ]
    }

    return (
        <Header data={data} gameWon={gameWon} />
    )
}

function MockHeader2() {
    const data = {
        characters: [
            {
                name: "waldo",
                beenFound: false
            },
            {
                name: "wenda",
                beenFound: false
            }
        ]
    }
    return (
        <Header data={data} gameWon={gameWon} />
    )
}

describe("Header functionality", () => {

    it("Header displays 0 when all characters are found/no characters are given", () => {
        render(<MockHeader1 />);
        const characterCount = screen.getByText(/0/);
        expect(characterCount).toBeInTheDocument();
    })

    it("Header displays number of characters not found", () => {
        render(<MockHeader2 />);
        const characterCount = screen.getByText(/2/);
        expect(characterCount).toBeInTheDocument();
    })
})
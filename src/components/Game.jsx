import React from 'react';
import Board from './Board.jsx';
import ApiResponse from './ApiResponse.jsx';


let line = [`b`,`b`,`b`].concat(['b','b','b']).concat(['b','b','b']);
let status;
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            xIsNext: true,
            stepNumber: 0,
        };
    }

    redistribuiPosicao(i) {
        this.handleClick(i);
    }

    async handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        squares[i] = this.state.xIsNext ? `x` : `o`;
        line[i] = squares[i];

        let winner = await ApiResponse(line);
        console.log(`winner ` + winner);
        if(winner === `X` || winner === `O`){
            status = 'Vencedor: ' + winner;
        }else{
            status = 'Próximo jogador: ' + (this.state.xIsNext ? 'O' : 'X');
        }

        this.setState({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        return (

            <div className="game">
                <div className="title">
                    <p>Jogo Da Velha</p>
                </div>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => {
                            this.redistribuiPosicao(i);
                        }}
                    />
                </div>
                <div className="game-sub">
                    <div className="game-info">
                        <div>{status}</div>
                    </div>
                    <div className="game-button">
                        <button className="game-button" role="button" onClick={reset}>Reset</button>
                    </div>
                </div>
            </div>
        );
    }
}

function reset(){
    document.location.reload(true);
}

export default Game;

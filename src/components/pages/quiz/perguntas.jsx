import React, { Component } from 'react';
import {connect} from 'react-redux';
import { sendRespostasCubo } from '../../../actions/cubo';
import {Link, Redirect} from 'react-router-dom';

class PerguntasItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            perguntas: this.props.perguntas,
            respostas: {
                'resposta_ec': '',
                'resposta_pf': '',
                'resposta_pe': ''
            },
            itemAtivo: this.props.ativo,
            requesting: false
        }
    }

    mudaPergunta = (elemento, numeroPergunta, valor) => {
        let atualAtivo = this.state.itemAtivo + 1,
            respostaKeys = Object.keys(this.state.respostas), // pega as chaves das respostas
            respostasObj = this.state.respostas;

        respostasObj[respostaKeys[numeroPergunta]] = valor.toLowerCase(); // pega a chave de acordo com a pergunta e grava a resposta nela

        // atualiza o estado das respostas
        this.setState({
            respostas: respostasObj
        });

        if ( atualAtivo === this.state.perguntas.length ) {
            this.setState({ requesting: true });

            this.props.sendRespostasCubo( respostasObj );
        } else {
            this.setState({
                itemAtivo: atualAtivo
            });
        }
    }

    renderPerguntas = (itemAtivo) => {
        return this.state.perguntas.map((item, key) => {
            return <div id={`question-${key}`} className={( key !== itemAtivo ) ? `hidden` : ``} key={`pergunta-${key}`}>
                        <p className="question-text">
                            {item.texto_pergunta}
                        </p>
                    </div>
        })
    }

    renderRespostas = (itemAtivo) => {
        if ( this.state.perguntas.length > 0 ) {
            return this.state.perguntas.map((item, key) => {
                return <div id={`answer-${key}`} className={( key !== itemAtivo ) ? `question-box-container hidden` : `question-box-container`} key={`resposta-${key}`}>
                            <div className="question-box">
                                <div className="quiz-answer-btn" onClick={ () => this.mudaPergunta(this, key, item.texto_resposta_1) }>
                                    <div className="red-bg question-header">
                                        <h3>{item.texto_resposta_1} <span>exposição</span></h3>
                                    </div>
                                    <div className="info-box">
                                        <p className="red-text">{item.descritivo_resposta_1}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="question-box">
                                <div className="quiz-answer-btn" onClick={ () => this.mudaPergunta(this, key, item.texto_resposta_2) }>
                                    <div className="blue-bg question-header">
                                        <h3>{item.texto_resposta_2} <span>exposição</span></h3>
                                    </div>
                                    <div className="info-box">
                                        <p className="blue-text">{item.descritivo_resposta_2}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
            })
        } else {
            return <div className="loading-wrapper">
                <svg width="135px"  height="135px"  xmlns="https://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-double-ring"><circle cx="50" cy="50" fill="none" strokeLinecap="round" r="40" strokeWidth="4" stroke="#4c59a4" strokeDasharray="62.83185307179586 62.83185307179586" transform="rotate(335.943 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" fill="none" strokeLinecap="round" r="35" strokeWidth="4" stroke="#cb151a" strokeDasharray="54.97787143782138 54.97787143782138" strokeDashoffset="54.97787143782138" transform="rotate(-335.943 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
            </div>
        }
    }

    render() {
        const { error, success } = this.props;

        if ( success === true ) {
            return <Redirect push to="/posicionamento-estrategico/quiz/resultado" />
        }

        if ( this.state.requesting === true ) {
            return <div className="loading-wrapper">
                <svg width="135px"  height="135px"  xmlns="https://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-double-ring"><circle cx="50" cy="50" fill="none" strokeLinecap="round" r="40" strokeWidth="4" stroke="#4c59a4" strokeDasharray="62.83185307179586 62.83185307179586" transform="rotate(335.943 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" fill="none" strokeLinecap="round" r="35" strokeWidth="4" stroke="#cb151a" strokeDasharray="54.97787143782138 54.97787143782138" strokeDashoffset="54.97787143782138" transform="rotate(-335.943 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
            </div>
        } else {
            return (
                <div className="question-wrapper">
                    { this.renderPerguntas(this.state.itemAtivo) }

                    { this.renderRespostas(this.state.itemAtivo) }
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        requesting: state.cubo.requesting,
        error: state.cubo.error,
        success: state.cubo.success,
        cuboRetorno: state.cubo.cuboRetorno
    }
}

export default connect(mapStateToProps, {sendRespostasCubo})(PerguntasItem);

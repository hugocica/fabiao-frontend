import React, { Component } from 'react';
import {connect} from 'react-redux';
import NomeAppImg from '../../../assets/img/nome_app.png';
import Header from '../header';
import {Link} from 'react-router-dom';

class AnalisePage extends Component {

    render() {


        return (
            <div className="content-wrapper begin-page">
                <Header></Header>

                <div className="green-bg radial-bg">
                    <p>
                        <strong>Descubra</strong> <br/>
                        através de uma rápida <br/>
                        análise, qual o <br/>
                        <img src={NomeAppImg} alt="posicionamento estratégico"/>
                        da sua Empresa e o <br/>
                        momento que ela <br/>
                        se encontra.
                    </p>
                </div>

                <div className="lighgray-bg radial-bg">
                    <p>
                        Após este estudo você <br/>
                        poderá conhecer as <strong>ações <br/>
                        e iniciativas específicas</strong> <br/>
                        recomendadas pra cada <br/>
                        ponto estratégico.
                    </p>

                    <input type="email" placeholder="Email" />
                </div>

                <div className="darkgray-bg radial-bg">
                    <Link to="/quiz" className="begin-btn main-btn">Começar</Link>
                </div>
            </div>
        );
    }
}

export default (AnalisePage);

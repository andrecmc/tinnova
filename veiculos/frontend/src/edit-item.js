import React, { Component } from 'react';
import './App.css';
import Validator from './shared/validator';

class EditItem extends Component {

  constructor(props) {
    super(props);
    this.validator = new Validator();
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    const itemToEdit = props.item;
    this.state = {
      veiculo: itemToEdit.veiculo,
      marca: itemToEdit.marca,
      ano: itemToEdit.ano,
      descricao: itemToEdit.descricao,
      vendido: itemToEdit.vendido,
      link: itemToEdit.link
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onCancel() {
    this.props.onCancel();
  }

  onSubmit() {
    if (this.validator.validateInputs(this.state)) {
      this.props.onSubmit(this.state);
    }
  }

  render() {
    return (
      <div className="input-panel">
      <span className="form-caption">Editar veiculo:</span>&nbsp;<span>{this.state.veiculo}</span>
      <div>
        <label className="field-name">Veiculo:<br/>
          <input value={this.state.veiculo} name="name" maxLength="40" required onChange={this.handleInputChange} placeholder="Nome do veiculo" />
        </label>
      </div>
      <div>
        <label className="field-name">Marca:<br/>
          <select value={this.state.marca} name="marca" onChange={this.handleInputChange}>
            <option value="Outras">Outras</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Ford">Ford</option>
            <option value="Honda">Honda</option>
            <option value="Chevrolet">Chevrolet</option>
          </select>
        </label>
      </div>
      <div>
        <label className="field-name">Ano:<br/>
          <input value={this.state.ano} name="ano" minLength="4" maxLength="4" pattern="[0-9]{1,4}" onChange={this.handleInputChange} placeholder="Ano do veiculo" />
        </label>
      </div>
      <div>
        <label className="field-name">Descricao:<br/>
          <textarea value={this.state.descricao} name="descricao" onChange={this.handleInputChange} placeholder="descricao" />
        </label>
      </div>
      <div>
      <label className="field-name">Vendido:<br/>
        <select value={this.state.vendido} name="vendido" onChange={this.handleInputChange}>
          <option value="false">Não</option>
          <option value="true">Sim</option>
        </select>
      </label>
      </div>
      <br/>
      <button onClick={() => this.onCancel()}>Cancelar</button>&nbsp;
      <button onClick={() => this.onSubmit()}>Atualizar</button>
      </div>
    );
  }
}

export default EditItem;

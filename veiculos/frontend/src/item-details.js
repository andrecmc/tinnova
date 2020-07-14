import React, { Component } from 'react';
import './App.css';

class ItemDetails extends Component {

  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  render() {
    const item = this.props.item;
    return (
      <div className="input-panel">
      <span className="form-caption">{ item.veiculo}</span>
      <div><span className="field-name">Veiculo:</span><br/> {item.veiculo}</div>
      <div><span className="field-name">Marca:</span><br/> {item.marca}</div>
      <div><span className="field-name">Ano:</span><br/> {item.ano}</div>
      <div><span className="field-name">Descricao:</span><br/> {item.descricao}</div>
      <div><span className="field-name">Vendido:</span><br/> {!item.vendido ? "Nao" : "Sim"}</div>
      <br/>
      <button onClick={() => this.onDelete()}>Remover</button>&nbsp;
      <button onClick={() => this.onEdit()}>Editar</button>
      </div>
    );
  }

  onEdit() {
    this.props.onEdit();
  }

  onDelete() {
    const item = this.props.item;
    if(window.confirm("Tem certeza que deseja remover o veiculo: " + item.veiculo + " ?")) {
      this.props.onDelete(item.link);
    }
  }

}

export default ItemDetails;

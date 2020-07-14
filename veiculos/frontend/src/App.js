import React, { Component } from 'react';

import './App.css';
import ItemDetails from './item-details';
import NewItem from './new-item';
import EditItem from './edit-item';
//import ItemService from './shared/mock-item-service';
import ItemService from './shared/item-service';

function isUnsold(value) {
  return !value.vendido;
}

function daysBetween(date1, date2) {
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
  
    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
      
    // Convert back to days and return
    return Math.round(difference_ms/one_day); 
}

function isRecent(value) {
  var result=false;
  if (value.created) {
    if (daysBetween(new Date(value.created),new Date())<=7)
    result=true;
  }
  return result;
}

function isYearInRange(start, end) {
  return function(element) {
    var result=false;
    if (element.ano) {
      if (element.ano>=start && element.ano<=end) result=true;
    }
    return result;
  }
}

function isFromManufacturer(name) {
  return function(element) {
    var result=false;
    if (element.marca) {
      if (element.marca.valueOf() == name.valueOf()) result=true;
    }
    return result;
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.itemService = new ItemService();
    this.onSelect = this.onSelect.bind(this);
    this.onNewItem = this.onNewItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onCreateItem = this.onCreateItem.bind(this);
    this.onUpdateItem = this.onUpdateItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.state = {
      showDetails: false,
      editItem: false,
      selectedItem: null,
      newItem: null,
    }
  }

  componentDidMount() {
      this.getItems();
  }



  render() {
    const items = this.state.items;
    if(!items) return null;

    const showDetails = this.state.showDetails;
    const selectedItem = this.state.selectedItem;
    const newItem = this.state.newItem;
    const editItem = this.state.editItem;
    const listItems = items.map((item) =>
      <tr key={item.link} onClick={() => this.onSelect(item.link)}>
         <td className="item-name">{item.veiculo}</td><td>{item.marca}</td><td>{item.descricao}</td><td>{item.ano}</td><td>{!item.vendido ? "Nao" : "Sim"}</td><td>{item.created}</td>
      </tr>
    );

    return (
      <div className="App">
      <ul className="items">
      <table className="customers">
        <thead>
          <tr><th>Veiculo</th><th>Marca</th><th>Descricao</th><th>Ano</th><th>Vendido</th><th>Data Cadastro</th></tr>
        </thead>
        <tbody>
          {listItems}
          <tr><td colSpan="6">Numero de veiculos nao vendidos: {items.filter(isUnsold).length}</td></tr>
          <tr><td colSpan="6">Veiculos registrados na ultima semana: {items.filter(isRecent).length}</td></tr>
          <tr><td colSpan="3">Veiculos da decada de 1960: {items.filter(isYearInRange(1960,1969)).length}</td><td colSpan="3">Veiculos da decada de 1970: {items.filter(isYearInRange(1970,1979)).length}</td></tr>
          <tr><td colSpan="3">Veiculos da decada de 1980: {items.filter(isYearInRange(1980,1989)).length}</td><td colSpan="3">Veiculos da decada de 1990: {items.filter(isYearInRange(1990,1999)).length}</td></tr>
          <tr><td colSpan="6">Veiculos da Volkswagen: {items.filter(isFromManufacturer("Volkswagen")).length}</td></tr>
          <tr><td colSpan="6">Veiculos da Honda: {items.filter(isFromManufacturer("Honda")).length}</td></tr>
          <tr><td colSpan="6">Veiculos da Ford: {items.filter(isFromManufacturer("Ford")).length}</td></tr>
          <tr><td colSpan="6">Veiculos da Chevrolet: {items.filter(isFromManufacturer("Chevrolet")).length}</td></tr>
          <tr><td colSpan="6"><button type="button" name="button" onClick={() => this.onNewItem()}>Novo veiculo</button></td></tr>
        </tbody>
      </table>
      </ul>
      <br/>
        {newItem && <NewItem onSubmit={this.onCreateItem} onCancel={this.onCancel}/>}
        {showDetails && selectedItem && <ItemDetails item={selectedItem} onEdit={this.onEditItem}  onDelete={this.onDeleteItem} />}
        {editItem && selectedItem && <EditItem onSubmit={this.onUpdateItem} onCancel={this.onCancelEdit} item={selectedItem} />}
  </div>
    );
  }

  getItems() {
    this.itemService.retrieveItems().then(items => {
          this.setState({items: items});
        }
    );
  }

  onSelect(itemLink) {
    this.clearState();
    this.itemService.getItem(itemLink).then(item => {
      this.setState({
          showDetails: true,
          selectedItem: item
        });
      }
    );
  }

  onCancel() {
    this.clearState();
  }

  onNewItem() {
    this.clearState();
    this.setState({
      newItem: true
    });
  }

  onEditItem() {
    this.setState({
      showDetails: false,
      editItem: true,
      newItem: null
    });
  }

  onCancelEdit() {
    this.setState({
      showDetails: true,
      editItem: false,
      newItem: null
    });
  }

  onUpdateItem(item) {
    this.clearState();
    this.itemService.updateItem(item).then(item => {
        this.getItems();
      }
    );
  }

  onCreateItem(newItem) {
    this.clearState();
    this.itemService.createItem(newItem).then(item => {
        this.getItems();
      }
    );
  }

  onDeleteItem(itemLink) {
    this.clearState();
    this.itemService.deleteItem(itemLink).then(res => {
        this.getItems();
      }
    );
  }

  clearState() {
    this.setState({
      showDetails: false,
      selectedItem: null,
      editItem: false,
      newItem: null,
      totalNaoVendidos: 0
    });
  }
}

export default App;

import React, { Component } from 'react';

import './App.css';
import ItemDetails from './item-details';
import NewItem from './new-item';
import EditItem from './edit-item';
//import ItemService from './shared/mock-item-service';
import ItemService from './shared/item-service';

function isBigEnough(value) {
  return !value.vendido;
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
          <tr><td colSpan="6">Numero de veiculos nao vendidos: {items.filter(isBigEnough).length}</td></tr>
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

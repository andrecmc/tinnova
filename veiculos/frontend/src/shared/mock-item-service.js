class ItemService {

  constructor() {
    this.items = [
      {link:1, veiculo:"Gol", marca:"Volkswagen", ano:"1996", descricao:"Unico dono"},
      {link:2, veiculo:"Parati", marca:"Volkswagen", ano:"1985", descricao:"Impecavel"},
      {link:3, veiculo:"Civic", marca:"Honda", ano:"2003", descricao:"Somente a vista"},
    ];
  }

  async retrieveItems() {
      return Promise.resolve(this.items);
  }

  async getItem(itemLink) {
    for(var i = 0; i < this.items.length; i++) {
      if ( this.items[i].link === itemLink) {
        return Promise.resolve(this.items[i]);
      }
    }
    return null;
  }

  async createItem(item) {
    console.log("ItemService.createItem():");
    console.log(item);
    return Promise.resolve(item);
  }

  async deleteItem(itemId) {
    console.log("ItemService.deleteItem():");
    console.log("item ID:" + itemId);
  }

  async updateItem(item) {
    console.log("ItemService.updateItem():");
    console.log(item);
  }

}

export default ItemService;
